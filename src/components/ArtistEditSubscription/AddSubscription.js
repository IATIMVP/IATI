import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  StatusBar,
  TextInput,
  FlatList
} from "react-native";
import Iconss from 'react-native-vector-icons/MaterialIcons';
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorLiteral } from "../../constants/Color";
import { styles } from "../../styles/ArtistLoginStyles";
import NavigationBar from '../common/NavBar';
import { setSub } from "../../actions/SetSubscriptionAction/setSubscriptionActions";
const WINDOW = Dimensions.get("window");
class AddSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      data: [
        {
          id: 1,
          isSelected: false,
          name: "Limit Availaible",
          description: 'Number of Subscribers who can reach this access.(If you leave this blank there will be no limit)',

        },
        {
          id: 2,
          isSelected: false,
          name: "Require Shipping Address At Checkout",
          description: '',

        },
        {
          id: 3,
          isSelected: false,
          name: "Require Phone Number At Checkout",
          description: '',
        },
      ],
      checkbox: false,
      isSelected: false

    };
  }
  componentDidMount() {

  }
  componentWillReceiveProps() {

  }

  handleSaveButton() {
    if (this.state.value === 0) {
      Alert.alert("Please Fill the Value")
    }
    else {
      let data = {
        "value": this.state.value,
        "description": this.state.description,
        "additional": this.state.selectedName
      }
      this.props.setSub(data)
    }
  }
  handleDeleteButton() {
    this.setState({
      selected: 0, value: 0,
      description: '',
      limitvalue: ''
    })
  }
  handleKeyDown(e) {
    if (e.nativeEvent.key == "Done") {
      dismissKeyboard();
    }
  }
  _keyExtractor = (item, index) => item.id;
  renderList({ item, index }) {
    return (

      <View style={{ flex: 0.1, paddingBottom: item.description === '' ? "2%" : '3%', flexDirection: 'row' }}>
        <TouchableOpacity style={{}} onPress={() => {
          let x = this.state.data
          if (item.flag) {
            x[index].flag = !item.flag
          } else
            x[index].flag = true
          this.setState({ data: x })

        }
        }
          style={{ flex: 0.1, justifyContent: 'flex-start' }}>
          {item && item.flag ? <Iconss name="radio-button-checked" size={38} color={colorLiteral.BUTTON} /> : <Iconss name="radio-button-unchecked" size={38} color={colorLiteral.BUTTON} />}

        </TouchableOpacity>

        <View style={{ flex: 0.9 }}>
          <View style={{ flex: 0.2, backgroundColor: 'transparent' }}>
            <Text style={{ fontSize: WINDOW.width * 0.035, color: colorLiteral.GREY, paddingHorizontal: '2%', paddingTop: item.description === '' ? '2%' : '3%' }}>{item.name}</Text>
            <Text style={{ fontSize: WINDOW.width * 0.03, color: 'grey', paddingHorizontal: '2%' }}>{item.description}</Text>
          </View>
          {
            item.id == 1 && item.flag ?
              <View style={{ flex: 1, flexDirection: 'row', width: WINDOW.width * 0.33, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 0.2, alignItems: 'center' }}></View>
                <View style={{ flex: 0.5, backgroundColor: colorLiteral.LIGHTGREY, marginTop: '1%' }}>
                  <TextInput
                    returnKeyType={"next"}
                    maxLength={10}
                    keyboardType={"numeric"}
                    underlineColorAndroid={"transparent"}
                    autoCapitalize={"none"}
                    style={styles.valueSub}
                    value={this.state.limitvalue}
                    onChangeText={limitvalue => this.setState({ limitvalue: limitvalue })}
                  />

                </View>
                <View style={{ flex: 0.3 }}></View>

              </View>
              :
              null
          }
        </View>
      </View>
    );
  }
  closeKeyboard() {
    dismissKeyboard()
  }
  render() {
    return (
      <KeyboardAwareScrollView scrollEnabled={true}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={[styles.container, { backgroundColor: !this.state.openModal ? colorLiteral.WHITE : "rgba(130, 130, 130, 0.5)" }]} showsVerticalScrollIndicator={false}>
        <View style={[styles.container, { backgroundColor: !this.state.openModal ? colorLiteral.WHITE : "rgba(130, 130, 130, 0.5)" }]}>
          <StatusBar
            hidden={false}
            backgroundColor={colorLiteral.STATUSBAR}
            barStyle="dark-content"
          />
          <NavigationBar
            backgroundColor={!this.state.openModal ? colorLiteral.WHITE : "rgba(130, 130, 130, 0.5)"}
            title="New Subscription Level"
            back
            onLeftButtonPress={() => Actions.ArtistLogin()}
          />
          <View style={{ flex: 0.9, marginHorizontal: '3%' }}>
            <View style={{ flex: 0.18, paddingTop: '2%' }}>
              <Text style={{ fontSize: WINDOW.width * 0.045, paddingTop: '1%', paddingBottom: '0%' }}>Amount</Text>
              <Text style={{ fontSize: WINDOW.width * 0.031, color: 'grey' }}>Set an amount you want to collect from subscribers who select</Text>
              <Text style={{ fontSize: WINDOW.width * 0.031, color: 'grey' }}>this subscription level.</Text>

              <View style={{ flex: 0.9, flexDirection: 'row', width: WINDOW.width * 0.33, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 0.2, alignItems: 'center' }}><Text style={{ fontSize: 17 }}>$</Text></View>
                <View style={{ flex: 0.5, backgroundColor: colorLiteral.LIGHTGREY, justifyContent: 'center' }}>
                  <TextInput
                    returnKeyType={"next"}
                    maxLength={10}
                    keyboardType={"numeric"}
                    underlineColorAndroid={"transparent"}
                    autoCapitalize={"none"}
                    style={styles.valueSub}
                    value={this.state.value}
                    onChangeText={value => this.setState({ value: value })}
                  />
                </View>
                <View style={{ flex: 0.3 }}><Text style={{ fontSize: 16, textAlign: 'center' }}>USD</Text></View>
              </View>
            </View>
            <View style={{ flex: 0.32, backgroundColor: "white", marginTop: '2%' }}>
              <Text style={{ fontSize: WINDOW.width * 0.045, paddingTop: '1%', paddingBottom: '1%' }}>Description</Text>
              <Text style={{ fontSize: WINDOW.width * 0.032, color: 'grey' }}>What item are you offering to subscribers who select this</Text>
              <Text style={{ fontSize: WINDOW.width * 0.032, color: 'grey' }}>subscription level?</Text>
              <View style={{ flex: 0.9, backgroundColor: colorLiteral.LIGHTGREY, borderRadius: 6, marginTop: '3%' }}>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  returnKeyType={"done"}
                  underlineColorAndroid={"transparent"}
                  autoCapitalize={"none"}
                  style={styles.email}
                  value={this.state.description}
                  onChangeText={description => this.setState({ description: description })}
                  blurOnSubmit={true}
                />
              </View>

            </View>
            <View style={{ flex: 0.34 }}>
              <Text style={{ fontSize: WINDOW.width * 0.045, paddingTop: '2%', paddingBottom: '1%' }}>Additional Options</Text>
              <FlatList
                scrollEnabled={true}
                data={this.state.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor.bind(this)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => this.renderList({ item, index })
                }
              />
            </View>
            <View style={{ flex: 0.15, flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={styles.saveButton} onPress={() => { this.handleSaveButton() }}>
                <Text style={styles.loginText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.delButton} onPress={() => { this.handleDeleteButton() }}>
                <Text style={styles.delText}>Delete</Text>
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

  };
}

export default connect(mapUser, { setSub })(AddSubscription);