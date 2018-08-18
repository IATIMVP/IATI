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
  FlatList,
  StatusBar
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { getTypes } from "../../actions/CreatePostAction/GenreTypeAction"
import { setType } from "../../actions/CreatePostAction/SetGenreAction"
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorLiteral } from "../../constants/Color";
import { styles } from "../../styles/CreatePostStyle";
import NavigationBar from '../common/NavBar';
import OfflineNotice from "./../common/OfflineNotice"
const WINDOW = Dimensions.get("window");
class Select_Type extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      type: "",
      selected: false,
      loading: false,
    };
  }
  componentDidMount() {
    this.props.getTypes();
  }
  componentWillReceiveProps(nextProp) {

    if (nextProp.genreTypeList.genere_type.data) {
      this.setState({
        loading: false,
        data: JSON.parse(JSON.stringify(nextProp.genreTypeList.genere_type.data))
      })
    }
    if (nextProp.genreTypeList && nextProp.genreTypeList.isLoading === true) {
      this.setState({
        loading: true
      })
    }
  }

  onSelectType({ item, index }) {
    let newVal = this.state.data;
    for (let i = 0; i < newVal.length; i++) {
      newVal[i].selected = false
      this.setState({
        data: newVal
      })
    }
    newVal[index].selected = !newVal[index].selected;
    this.setState({
      data: newVal,
    });
    if (this.state.data[index].selected === true) {
      this.setState({ type: this.state.data[index].name })
      this.props.setType(this.state.data[index].name)
    }
  }

  _keyExtractor = (item, index) => item._id;
  render() {
    return (
      this.state.data.length !== 0
        ?
        <KeyboardAwareScrollView scrollEnabled={false}
          keyboardShouldPersistTaps={Platform.OS === 'ios' ? 'never' : 'always'}
          contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <StatusBar
              hidden={false}
              backgroundColor={colorLiteral.STATUSBAR}
              barStyle="dark-content"
            />
            <OfflineNotice />
            <NavigationBar
              title="Select Type"
              back
              onLeftButtonPress={() => Actions.pop()}
            />
            {this.state.loading === false ?

              <FlatList
                data={this.state.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor.bind(this)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) =>
                  <TouchableOpacity onPress={() => this.onSelectType({ item, index })} style={[styles.listStyle, { backgroundColor: item.selected ? "white" : "white" }]}>
                    <View style={{ flex: item.selected ? 0.9 : 1 }}><Text style={styles.type}>{item.name}</Text></View>
                    {item.selected ? <View style={{ flex: 0.1, alignItems: 'center' }}><Icon name="md-checkmark" size={25} color={colorLiteral.DARK_GREY} /></View> : null}
                  </TouchableOpacity>
                }
              />
              :
              <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}><ActivityIndicator /></View>
            }
          </View>
        </KeyboardAwareScrollView>
        :
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}><ActivityIndicator /></View>
    );
  }
}


function mapUser(state) {
  return {
    genreTypeList: state.genreTypeList
  };
}

export default connect(mapUser, { getTypes, setType })(Select_Type);