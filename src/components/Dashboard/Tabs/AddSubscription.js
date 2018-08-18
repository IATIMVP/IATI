import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  StatusBar
} from "react-native";
import { colorLiteral } from "../../../constants/Color";
const WINDOW = Dimensions.get("window");
import { styles } from "../../../styles/DashboardStyle";
import OfflineNotice from "./../../common/OfflineNotice";
import { Actions, ActionConst } from "react-native-router-flux";
import NavigationBar from '../../common/NavBar';
import SubscriptionIcon from "react-native-vector-icons/MaterialIcons";

class AddSubscription extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.main}>
        <StatusBar
          hidden={false}
          backgroundColor={colorLiteral.STATUSBAR}
          barStyle="dark-content"
        />
        <NavigationBar
          backgroundColor={colorLiteral.WHITE}
          title="Add subscription"
         
          onLeftButtonPress={() => Actions.home()}
        />
        <View style={{ flex: 0.9, justifyContent: 'center', alignItems:"center" }}>
        <SubscriptionIcon name="subscriptions" size={WINDOW.height/5} color={colorLiteral.LIGHTGREY}/>
          <Text style={{fontSize:18, color:colorLiteral.LIGHTGREY}}>Coming soon..</Text>
        </View>
      </View>
    );
  }
}
export default AddSubscription;
