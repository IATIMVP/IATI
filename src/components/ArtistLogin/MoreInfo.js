import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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
import IIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons from 'react-native-vector-icons/Entypo';
import MIcon from 'react-native-vector-icons/EvilIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorLiteral } from "../../constants/Color";
import { styles } from "../../styles/ArtistLoginStyles";
import NavigationBar from '../common/NavBar';
import { selectuserName } from "../../actions/SelectUserNameAction";
import ImagePicker from "react-native-image-picker";
import OfflineNotice from "../common/OfflineNotice";
import { selectuserNameInfo } from "../../actions/SelectUserNameAction";

const WINDOW = Dimensions.get("window");
class MoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a_name: '',
      username: '',
      buttonAbled: false,
      genre: '',
      openModal: false,
      loader: false,
      dataa: false,
      send: false,
      artistNameErr: false,
      disable: true,
      anameErr:false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.setGenres && nextProps.setGenres.data) {
      this.setState({ genre: nextProps.setGenres.data })
    }

    if (nextProps.SelectUserNameReducer.selectdata) {
      this.setState({ dataa: false })

    }
    if (nextProps.SelectUserNameReducer.error && this.state.username !== "") {
      this.setState({ dataa: true })
    }
    // if (nextProps.SelectUserNameReducer.isloading) {
    //   this.setState({ loader: nextProps.SelectUserNameReducer.isloading })
    // } else {
    //   this.setState({ loader: nextProps.SelectUserNameReducer.isloading })
    // }

  }
  handleSubmit() {
    if (this.state.a_name === "") {
      this.setState({
        artistNameErr: true
      })
    }
    else {
      if (this.state.username && this.state.a_name) {
        let data = {
          "image": this.props.image,
          'a_name': this.state.a_name,
          "username": this.state.username
        }
        this.props.selectuserNameInfo(data)
      }
      else {
        let data = {
          "image": this.props.image,
          'a_name': this.state.a_name,
          "username": this.state.username
        }
        Actions.ChargeSub({ data: data })
      }
    }

  }
  onUNameChange(username) {
    this.props.selectuserName(username, "username")
    if (username === "") {
      this.setState({ username: username, dataa: false, disable: true })
    }
    else {
      this.setState({ username: username.trim(), dataa: false, disable: false  })
    }
  }
  onNameChange(a_name) {
    if(a_name.length >0 && a_name.length<=3)
    {
      this.setState({ a_name: a_name,anameErr:true, buttonAbled: false, artistNameErr: false })}
    else{
    this.setState({ a_name: a_name,anameErr:false, buttonAbled: true, artistNameErr: false })}
  }
  OpenModal() {
    Actions.GenreModal()
  }
  onTouchicon() {
    this.setState({ openModal: false })
  }
  referesh() {
    this.setState({ username: null })
  }
  render() {
    let { selectdata,
      error,
      isloading,
      type, } = this.props.SelectUserNameReducer
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
          <View style={styles.infoHeader}>
            <Text style={styles.infoText}>Tell Us More Information</Text>
          </View>
          <View style={styles.fillnameView}>
            <View style={styles.nameInput}>
              <TextInput
                maxLength={30}
                onChangeText={(a_name) => this.onNameChange(a_name)}
                selectionColor={colorLiteral.GREY}
                underlineColorAndroid={"transparent"}
                autoCapitalize={"none"}
                style={styles.email}
                value={this.state.a_name}
                placeholder="Artist Name"
                placeholderTextColor="grey"
              />
            </View>
            {this.state.artistNameErr ? <View style={{ flex: 0.02, alignItems: 'flex-end' }}><Text style={{ color: colorLiteral.BUTTON, marginRight: '7%', marginTop: '1%' }}>Please enter artist's name</Text></View> : this.state.anameErr?<View style={{ flex: 0.02, alignItems: 'flex-end' }}><Text style={{ color: colorLiteral.BUTTON, marginRight: '7%', marginTop: '1%' }}>Artist name must be at least 4 characters long.</Text></View>:null}
            <View style={styles.nameInput}>
              <TextInput
                maxLength={30}
                onChangeText={(username) => this.onUNameChange(username)}
                selectionColor={colorLiteral.GREY}
                underlineColorAndroid={"transparent"}
                autoCapitalize={"none"}
                style={styles.email}
                value={this.state.username}
                placeholder="Username"
                placeholderTextColor="grey"
              />
              {this.state.disable ? null :
                <View style={{ position: "absolute", top: "40%", right: "25%" }}>
                  {isloading && type === "username" ?
                   <ActivityIndicator /> 
             : selectdata && selectdata.status === 201 && type === "username" ? <MIcon name="check" size={25} color={"#0b60e8"} /> : this.state.username.length <= 1 ? null : null} 
                </View>
       }  
              <TouchableOpacity onPress={() => this.referesh()} style={{ position: "absolute", top: "40%", right: "13%" }}>
                <IIcon name="refresh" size={25} color={colorLiteral.LIGHTGREY} />
              </TouchableOpacity>
            </View>

            {this.state.dataa ? <View style={{ flex: 0.01, alignItems: 'flex-end' }}><Text style={{ color: colorLiteral.BUTTON, marginRight: '9%', marginTop: '1%' }}>Username already exists</Text></View> : null}
            <View style={styles.selectGenreBar}>
              <TouchableOpacity style={styles.genreSetView}
                onPress={() => this.OpenModal()}
              >
                <Text style={styles.genreSet}>{this.state.genre !== " " ? this.state.genre : "Primary Genre"}</Text>
                <Text style={styles.selectGenreText}>Select Genre</Text>
                <Icon name="ios-arrow-forward-outline" size={27} color="grey" style={styles.iconSet} />
              </TouchableOpacity>
            </View>
            <View style={styles.continueView}>
              <TouchableOpacity disabled={error && error.status === 200 ? true : false  } style={[styles.loginButton, { backgroundColor: this.state.buttonAbled ? colorLiteral.BUTTON : "#af1a4e", }]} onPress={() => this.handleSubmit()}>
                {/* {this.state.loader ? <ActivityIndicator /> : */}
                 <Text style={[styles.loginText, { color: this.state.buttonAbled ? colorLiteral.WHITE : "#d2d2d2" }]}> Continue</Text>
                 {/* } */}
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </KeyboardAwareScrollView >
    );
  }
}
function mapUser(state) {
  return {
    setGenres: state.setGenres,
    SelectUserNameReducer: state.SelectUserNameReducer
  };
}

export default connect(mapUser, { selectuserNameInfo, selectuserName })(MoreInfo);