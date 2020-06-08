import React from "react";

import navigationItemStyles from "./NavigationItem.css";

const navigationItem = (props) => {
  console.log("props::::", props);
  return (
    <li className={navigationItemStyles.NavigationItem}>
      <a
        href={props.link}
        className={props.active ? navigationItemStyles.active : null}
      >
        {props.children}
      </a>
    </li>
  );
};

export default navigationItem;
