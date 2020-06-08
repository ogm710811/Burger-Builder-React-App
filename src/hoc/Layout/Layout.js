import React, { Component } from "react";

import layoutStyles from "./Layout.css";
import Aux from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  showSideDrawerHandler = () => {
    this.setState({
      showSideDrawer: false,
    });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar sideDrawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          showBackdrop={this.state.showSideDrawer}
          clicked={this.showSideDrawerHandler}
        />
        <main className={layoutStyles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
