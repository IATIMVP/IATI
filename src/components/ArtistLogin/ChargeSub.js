import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
  Alert,
  Platform,
  Modal,
  StatusBar
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Entypo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorLiteral } from "../../constants/Color";
import { styles } from "../../styles/ArtistLoginStyles";
import NavigationBar from '../common/NavBar';
import ImagePicker from "react-native-image-picker";
import OfflineNotice from "../common/OfflineNotice";
const WINDOW = Dimensions.get("window");
class ChargeSub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Per Post",
    };
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProp) {
    if (nextProp.setSubLevel && nextProp.setSubLevel.data) {
      this.setState({ value: nextProp.setSubLevel.data.name })
    }
  }

  handleSubmit() {
    let data = {
      "image": this.props.data.image,
      "a_name": this.props.data.a_name,
      "username": this.props.data.username,
      "value": this.state.value
    }
    Actions.AddNewSub({ data: data })
  }
  skipAction() {
    let data = {
      "image": this.props.data.image,
      "a_name": this.props.data.a_name,
      "username": this.props.data.username,
      "value": this.state.value
    }
    Actions.AddNewSub({ data: data })
  }
  render() {
    return (
      <KeyboardAwareScrollView scrollEnabled={false}
        keyboardShouldPersistTaps={Platform.OS === 'ios' ? 'never' : 'always'}
        contentContainerStyle={[styles.container, { backgroundColor: !this.state.openModal ? colorLiteral.WHITE : "rgba(130, 130, 130, 0.5)" }]} showsVerticalScrollIndicator={false}>
        <View style={[styles.container, { backgroundColor: !this.state.openModal ? colorLiteral.WHITE : "rgba(130, 130, 130, 0.5)" }]}>
          <StatusBar
            hidden={false}
            backgroundColor={colorLiteral.STATUSBAR}
            barStyle="dark-content"
          />
          <OfflineNotice />
          <NavigationBar
            backgroundColor={!this.state.openModal ? colorLiteral.WHITE : "rgba(130, 130, 130, 0.5)"}
            title="Getting Started: IATI for Artists"
            back
            onLeftButtonPress={() => Actions.pop()}
          />
          <View style={styles.chargeHeaderText}>
            <Text style={styles.chargeText}>Here's what your subcribers </Text>
            <Text style={styles.chargeText}>need to know </Text>
          </View>
          <View style={styles.quesView}>
            <View style={styles.midView}>
              <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginTop: '4%' }} onPress={() => Actions.SubLevel()}>
                <View style={styles.quesView}>
                  <View style={styles.questText}>
                    <Text style={styles.questionText}>How will your subcribers</Text>
                    <Text style={styles.questionText}>be charged?</Text>
                  </View>
                </View>
                <Text style={styles.setPostValue}>{this.state.value}</Text>
                <Icon name="ios-arrow-forward-outline" size={27} color="grey" style={styles.iconSet} />
              </TouchableOpacity>
            </View>
            <View style={styles.chargeButtonView}>
              <TouchableOpacity style={styles.onAddNew} onPress={() => this.skipAction()}><Text style={styles.skipthisText}>Skip</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.loginButton, { backgroundColor: colorLiteral.BUTTON }]} onPress={() => this.handleSubmit()}>
                <Text style={[styles.loginText, { color: colorLiteral.WHITE }]}> Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}


function mapUser(state) {
  return {
    setSubLevel: state.setSubLevel
  };
}

export default connect(mapUser)(ChargeSub);