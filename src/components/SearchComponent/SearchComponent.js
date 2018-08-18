import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,

} from "react-native";
const WINDOW = Dimensions.get("window");
import { styles } from "../../styles/DashboardStyle";
class SearchComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.dashboardText}>--- Under Devdfgdfgdf/??elopment ---</Text>
      </View>
    );
  }
}
export default SearchComponent;
