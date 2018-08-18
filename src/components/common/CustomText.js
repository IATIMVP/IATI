// Custom component For rendering Text
// props : 
// serverText  : boolean | true=> "if rendering text from server else false"
// style : Object | style object for text

import React, { Component } from "react";
import {
    Text,
    Dimensions,
    View
} from "react-native";
import { connect } from "react-redux";
import { colorLiteral } from "../../constants/Color";

const WINDOW = Dimensions.get("window");
class CustomText extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Text
                style={[this.props.style,
                {
                    textAlign: "center",
                }
                ]}
            >
                {this.props.value}
            </Text>
        )
    }
}

function mapUser(state) {
    return { settingsReducer: state.settingsReducer };
}

export default connect(mapUser, {})(CustomText);


