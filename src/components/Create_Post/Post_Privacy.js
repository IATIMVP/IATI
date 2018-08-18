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
import Icon from 'react-native-vector-icons/Ionicons';
import { setPrivacy } from "../../actions/CreatePostAction/SetGenreAction"
import { getPostSub } from "../../actions/CreatePostAction/GetSubscriptionLevel"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorLiteral } from "../../constants/Color";
import { styles } from "../../styles/CreatePostStyle";
import NavigationBar from '../common/NavBar';
import OfflineNotice from "./../common/OfflineNotice"
const WINDOW = Dimensions.get("window");
class PostPrivacy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      data: "",
      loading: false
    };
  }
  componentDidMount() {
    this.props.getPostSub()
  }
  componentWillReceiveProps(nextProp) {
    if (nextProp.getSubList && nextProp.getSubList.isLoading === true) {
      this.setState({
        loading: true
      })
    }
    if (nextProp.getSubList.getSub) {
      loading: false
      this.setState({ data: JSON.parse(JSON.stringify(nextProp.getSubList.getSub.data)) })
    }
  }

  onSelect({ item, index }) {
    let newVal = this.state.data;
    newVal[index].selected = !newVal[index].selected;
    this.setState({
      data: newVal,
    });
    if (this.state.data[index].selected === true) {
      this.setState({ privacy: this.state.data[index].title })
      this.props.setPrivacy(this.state.data[index].title)
    }
  }
  _keyExtractor = (item, index) => item._id;
  renderList({ item, index }) {
    return (
      <TouchableOpacity onPress={() => this.onSelect({ item, index })} style={[styles.listStyle, { backgroundColor: item.selected ? "white" : "white" }]}>
        <View style={{ flex: item.selected ? 0.9 : 1 }}><Text style={styles.type}>{item.title}</Text></View>
        {item.selected ? <View style={{ flex: 0.1, alignItems: 'center' }}><Icon name="md-checkmark" size={25} color="#202021" /></View> : null}
      </TouchableOpacity>

    );
  }
  render() {
    return (
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
            title="Who can access this post?"
            back
            onLeftButtonPress={() => Actions.pop()}
          />
          <View style={styles.flatListRender}>
            {this.state.loading === true ?
              <FlatList
                data={this.state.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor.bind(this)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => this.renderList({ item, index })
                }
              />
              : <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}><ActivityIndicator /></View>
            }
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
function mapUser(state) {
  return {
    getSubList: state.getSubList
  };
}

export default connect(mapUser, { setPrivacy, getPostSub })(PostPrivacy);