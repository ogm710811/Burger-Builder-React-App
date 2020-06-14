import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

class App extends Component {
  // this comment block is to test that the axios interceptor
  // are cancelled if the BurgerBuilder component is removed from the DOM.
  /* state = {
    showBurgerBuilderComponent: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showBurgerBuilderComponent: false,
      });
    }, 2000);
  }*/

  render() {
    return (
      <div>
        <Layout>
          {/*{this.state.showBurgerBuilderComponent ? <BurgerBuilder /> : null}*/}
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
