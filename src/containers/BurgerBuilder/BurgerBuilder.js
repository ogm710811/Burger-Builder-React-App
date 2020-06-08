import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";
import BurgerView from "../../components/Burger/BurgerView/BurgerView";
import BurgerControls from "../../components/Burger/BurgerControls/BurgerControls";
import BurgerOrderSummary from "../../components/Burger/BurgerOrderSummary/BurgerOrderSummary";

import INGREDIENT_PRICES from "../../globals/globals";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      meat: 0,
      cheese: 0,
      salad: 0,
      bacon: 0,
    },
    totalPrice: 4,
    canOrderNow: false,
    isOrderNowButtonClicked: false,
  };

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
    alert("clicked orderContinueCheckout");
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

    return (
      <Aux>
        <Modal
          displayModal={this.state.isOrderNowButtonClicked}
          closeModal={this.orderCancelHandler}
        >
          <BurgerOrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            clickedCancel={this.orderCancelHandler}
            clickedContinue={this.orderContinueCheckout}
          />
        </Modal>
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
  }
}

export default BurgerBuilder;
