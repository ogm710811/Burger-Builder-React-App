import React from "react";

import navigationItemsStyles from "./NavigationItems.css";
import NavigationItem from "../NavigationItem/NavigationItem";

const navigationItems = (props) => {
  return (
    <ul className={navigationItemsStyles.NavigationItems}>
      <NavigationItem active link="/">
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
  );
};

export default navigationItems;
