import React from "react";

import buttonStyles from "./Button.css";

const button = (props) => (
  <button
    className={[buttonStyles.Button, buttonStyles[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
