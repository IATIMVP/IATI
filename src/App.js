import React, { Component } from "react";
import { Provider } from "react-redux";
import setup from "./store/setup";
import SplashScreen from 'react-native-splash-screen';
import CommonAlertandRoute from "./routes/CommonAlertandRoute";

global.isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
console.disableYellowBox = true;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: null
    };
  }

  componentDidMount() {
    setTimeout(()=>SplashScreen.hide(),3000);
    setup(store => {
      this.setState({
        isLoading: false,
        store
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <Provider store={this.state.store}>
        <CommonAlertandRoute />
      </Provider>
    );
  }
}
