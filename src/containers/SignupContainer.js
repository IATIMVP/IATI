import React from 'react'

// import { connect } from 'react-redux'
import Signup from '../components/Signup'

class SignupContainer extends React.Component {

  render() {
    return <Signup />
  }
}

// function mapUser (state) {
//   return { signupReducer: state.signupReducer }
// }

// export default connect(mapUser, {  })(SignupContainer)
export default SignupContainer