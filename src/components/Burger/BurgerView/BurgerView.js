import React from "react";

import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import burgerStyles from "../BurgerView/BurgerView.css";

const burgerView = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredientsKey) => {
      return [...Array(props.ingredients[ingredientsKey])].map((_, i) => {
        return (
          <BurgerIngredient type={ingredientsKey} key={ingredientsKey + i} />
        );
      });
    })
    .reduce((arr, ingElem) => {
      console.log("transformedIngredients Array :: after flatten", ingElem);
      return arr.concat(ingElem);
    }, []);
  console.log(
    "transformedIngredients Array :: after flatten",
    transformedIngredients
  );
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please, start adding ingredients !!</p>;
  }
  return (
    <div className={burgerStyles.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default burgerView;
