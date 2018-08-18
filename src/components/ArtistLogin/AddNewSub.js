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
  StatusBar,
  AsyncStorage
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
import { editAccount } from "../../actions/EditAccountActions"
const WINDOW = Dimensions.get("window");
class AddNewSub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldId: '',
      subscription: '',
      genre: "rock"
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('asyncLoginData').then((asyncLoginData) => {

      let logindata = JSON.parse(asyncLoginData)
      if (logindata) {
        this.setState({
          fieldId: logindata.data._id
        })
      }
    }
    )
    if (this.props.signupReducer.signupData !== "") {
      this.setState({
        logindata: this.props.signupReducer.signupData,
        fieldId: this.props.signupReducer.signupData.data._id,
      })
    }
    if (this.props.loginReducer.loginData) {
      this.setState({
        logindata: this.props.loginReducer,
        fieldId: this.props.loginReducer.loginData.data._id
      })
    }
    if (this.props.checkuserReducer.socialLogin) {
      this.setState({
        logindata: this.props.socialLogin,
        fieldId: this.props.checkuserReducer.socialLogin.data._id
      })
    }
  }
  componentWillReceiveProps(nextProp) {
    if (nextProp.setSubscription.data) {
      this.setState({ subscription: nextProp.setSubscription.data.value })
    }
    if (nextProp.editAccountReducer.loading === true) {
      this.setState({ loading: true })
    }

  }

  handleSubmit() {
    if (this.state.subscription === "") {
      Alert.alert("Please add subscription level ")
    }
    else {
      if (this.props.data.a_name && this.state.fieldId) {
        let data = {
          "file": this.props.data.image ? this.props.data.image : "https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png",
          "name": this.props.data.a_name ? this.props.data.a_name : "name",
          "username": this.props.data.username ? this.props.data.username : 'username',
          "subsription": this.props.data.value,
          "genre": this.props.data.genre ? this.props.data.genre : "genre",
          "charge": this.state.subscription ? this.state.subscription : 'none',
          "fieldId": this.state.fieldId,
        }
        this.props.editAccount(data)
      }
    }
  }
  skip() {
    if (this.props.data.a_name && this.state.fieldId) {
      let data = {
        "file": this.props.data.image ? this.props.data.image : "https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png",
        "name": this.props.data.a_name ? this.props.data.a_name : "name",
        "username": this.props.data.username ? this.props.data.username : 'username',
        "subsription": this.props.data.value,
        "genre": this.props.data.genre ? this.props.data.genre : "genre",
        "charge": this.state.subscription ? this.state.subscription : 'none',
        "fieldId": this.state.fieldId,
      }
      this.props.editAccount(data)
    }

  }

  render() {
    return (
      this.state.loading ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><ActivityIndicator size="large" /><Text>Please wait..</Text></View> :
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
              onLeftButtonPress={() => Actions.account()}
            />
            <View style={styles.newSubHeader}>
              <Text style={styles.headingText}>Get ready for your subscribers</Text>
            </View>
            <View style={styles.addSubMainView}>
              <View style={styles.addSubMainText}>
                <Text style={styles.mainTextStyle}>Create your first subscription level.</Text>
                <Text style={styles.mainTextStyle2}>This amount is required for subscribers to access your profile.</Text>
              </View>
              <View style={styles.addNewView}>
                <TouchableOpacity style={styles.addNew2View} onPress={() => Actions.ArtistEditSubscription()}>
                  <View style={styles.setLevel}>
                    <Text style={styles.setLevelView}>{this.state.subscription ? "$" + this.state.subscription + "+" : 'Subscription Levels'}</Text>
                  </View>
                  <Text style={styles.addNewText}>Add New</Text>
                  <Icon name="ios-arrow-forward-outline" size={27} color={colorLiteral.GREY} style={styles.addIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.submitView}>
                <TouchableOpacity style={styles.onAddNew} onPress={() => this.skip()}><Text style={styles.skipthisText}>Skip</Text></TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={() => this.handleSubmit()}>

                  <Text style={styles.loginText}>Done</Text>
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
    loginReducer: state.loginReducer,
    signupReducer: state.signupReducer,
    setSubscription: state.setSubscription,
    editAccountReducer: state.editAccountReducer,
    checkuserReducer: state.checkuserReducer,
  };
}

export default connect(mapUser, { editAccount })(AddNewSub);