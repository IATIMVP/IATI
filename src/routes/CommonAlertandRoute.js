import React, { Component } from "react";

import Routes from "./Routes";
import {
    View,
    ActivityIndicator,
    Image,
    Keyboard,
    Text,
    StatusBar
} from "react-native";
import { connect } from "react-redux";
import AlertMessage from "./../components/common/AlertMessage"



class CommonAlertandRoute extends Component {
    constructor() {
        super();
        this.state = {
            errorMsg: '',
            errorStatus:true,
        };
    }

    componentWillReceiveProps(nextProp) {
        if (nextProp.CommonAlertReducer.data) {
            this.setState({ errorMsg: nextProp.CommonAlertReducer.data,errorStatus: nextProp.CommonAlertReducer.errorStatus })
            setTimeout(() => {
                this.setState({ errorMsg: null })
            }, 4000);

        }
    }

    render() {

        return (

            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="#395eed"
                    barStyle="light-content"
                />
                <Routes />
                {(this.state.errorMsg) ?
                    <AlertMessage
                        value={this.state.errorMsg} 
                        error={this.state.errorStatus}/> :
                    null
                }
            </View>
        );
    }
}
function mapUser(state) {
    return {
        CommonAlertReducer: state.CommonAlertReducer
    };
}

export default connect(mapUser, {

})(CommonAlertandRoute);