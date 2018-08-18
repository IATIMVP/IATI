import React from "react";
// import { connect } from "react-redux";
// import { login } from "../actions/LoginAction";
import Login from "../components/Login";

class LoginContainer extends React.Component {
  // componentDidMount() {}

  render() {
    return <Login />;
  }
}

// function mapUser(state) {
//   return { loginReducer: state.loginReducer };
// }

// export default connect(mapUser, {})(LoginContainer);
export default LoginContainer;