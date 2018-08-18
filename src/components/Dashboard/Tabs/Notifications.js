import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  StatusBar
} from "react-native";
const WINDOW = Dimensions.get("window");
import { colorLiteral } from "../../../constants/Color";
import { Actions, ActionConst } from "react-native-router-flux";
import { styles } from "../../../styles/DashboardStyle";
import OfflineNotice from "./../../common/OfflineNotice";
import NotificationIcon from "react-native-vector-icons/Ionicons";
import NavigationBar from '../../common/NavBar';
class Notifications extends Component {
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
          title="Notifications"
         
          onLeftButtonPress={() => Actions.home()}
        />
        <View style={{ flex: 0.9, justifyContent:'center', alignItems:"center"}}>
          <NotificationIcon name="ios-notifications" size={WINDOW.height/5} color={colorLiteral.LIGHTGREY}/>
          <Text style={{fontSize:18, color:colorLiteral.LIGHTGREY}}>Coming Soon..</Text>
        </View>
      </View>
    );
  }
}
export default Notifications;
