import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";
import BurgerView from "../../components/Burger/BurgerView/BurgerView";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import BurgerOrderSummary from "../../components/Burger/BurgerOrderSummary/BurgerOrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import INGREDIENT_PRICES from "../../globals/globals";
import axiosInstance from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    canOrderNow: false,
    isOrderNowButtonClicked: false,
    dataLoading: false,
    hasCatchError: false,
  };

  componentDidMount() {
    setTimeout(() => {
      axiosInstance
        .get("/ingredients.json")
        .then((res) => {
          console.log("get ingredients ::", res);
          this.setState({
            ingredients: res.data,
          });
        })
        .catch((error) => {
          this.setState({
            hasCatchError: true,
          });
        });
    }, 1000);
  }

  orderNowHandler = () => {
    this.setState({
      isOrderNowButtonClicked: true,
    });
  };

  orderCancelHandler = () => {
    this.setState({
      isOrderNowButtonClicked: false,
    });
  };

  orderContinueCheckout = () => {
    // alert("clicked orderContinueCheckout");
    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: "Venice Garcia",
        email: "vgg@test.com",
        address: {
          street: "test address",
          zip: "33111",
          state: "test state",
        },
      },
      deliveryMethod: "carry on",
    };
    this.setState({
      dataLoading: true,
    });
    // timeout to simulate a slow network
    // to display the spinner
    setTimeout(() => {
      axiosInstance
        .post("/orders", order)
        .then((res) => {
          console.log(res);
          this.setState({
            dataLoading: false,
            isOrderNowButtonClicked: false,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            dataLoading: false,
            isOrderNowButtonClicked: false,
          });
        });
    }, 1000);
  };

  buttonOrderNowHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingredientKey) => {
        return ingredients[ingredientKey];
      })
      .reduce((sum, ingredientValue) => {
        return sum + ingredientValue;
      }, 0);
    this.setState({
      canOrderNow: sum > 0,
    });
  };

  addIngredientHandler = (type) => {
    const currentIngredientCount = this.state.ingredients[type];
    const updatedIngredientCount = currentIngredientCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedIngredientCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const currentPrice = this.state.totalPrice;
    const newPrice = currentPrice + priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.buttonOrderNowHandler(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const currentIngredientCount = this.state.ingredients[type];
    if (currentIngredientCount <= 0) return;
    const updatedIngredientCount = currentIngredientCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedIngredientCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const currentPrice = this.state.totalPrice;
    const newPrice = currentPrice - priceDeduction;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.buttonOrderNowHandler(updatedIngredients);
  };

  render() {
    const disabledIngredientsInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledIngredientsInfo) {
      disabledIngredientsInfo[key] = disabledIngredientsInfo[key] <= 0;
    }

    let burgerOrderSummary = null;
    let burgerBuilder = this.state.hasCatchError ? (
      <Aux>
        <p
          style={{
            whiteSpace: "pre",
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}
        >
          There was an error loading ingredients ... {"\n"}Please, try again !!
        </p>
      </Aux>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burgerBuilder = (
        <Aux>
          <BurgerView ingredients={this.state.ingredients} />
          <BurgerControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledLessButton={disabledIngredientsInfo}
            totalPrice={this.state.totalPrice}
            canOrderNow={this.state.canOrderNow}
            buttonClicked={this.orderNowHandler}
          />
        </Aux>
      );

      burgerOrderSummary = (
        <BurgerOrderSummary
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
          clickedCancel={this.orderCancelHandler}
          clickedContinue={this.orderContinueCheckout}
        />
      );
    }

    if (this.state.dataLoading) {
      burgerOrderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          displayModal={this.state.isOrderNowButtonClicked}
          closeModal={this.orderCancelHandler}
          hasSpinner={this.state.dataLoading}
        >
          {burgerOrderSummary}
        </Modal>
        {burgerBuilder}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axiosInstance);
