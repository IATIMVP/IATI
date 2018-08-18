import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  Alert
} from "react-native";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { bindActionCreators } from 'redux';

import { Actions, ActionConst } from "react-native-router-flux";
import { colorLiteral } from "../../../constants/Color";
const WINDOW = Dimensions.get("window");
import Stories from "./Stories";
import Feed from "./Feed";
import { styles } from "../../../styles/DashboardStyle";
import { getUserFeeds, getUserStories } from "./../../../actions/DashboardActions/dashboardAction";
import { connect } from "react-redux";
import NavigationBar from '../../common/NavBar';




class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchData: "",
      user_id: ""
    }
  }

  componentWillMount() {
    let input = {};
    AsyncStorage.getItem("asyncLoginData").then((value) => {
      if (value) {
        let obj = JSON.parse(value)
        input.userId = obj.data._id;
        this.setState({ user_id: obj.data._id })
        this.props.getUserFeeds(input);
        this.props.getUserStories(input);
      }
    })
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
          title="I    A M   T H E   I N D U S T R Y"
          leftButtonIconName="logo-dropbox"
          rightButtonIconName="ios-person-add"
          onLeftButtonPress={() => Alert.alert("Inbox")}
          onRightButtonPress={() => Actions.DiscoverArtist()}
        />
        <View style={styles.container}>
          {
            this.props.dashboardReducer.storiesLoading ?
            <View style={styles.storiesContainer}>
              <ActivityIndicator />
            </View>
              :
              <Stories
                storiesData={this.props.dashboardReducer.stories}
              />
          }
          {
            this.props.dashboardReducer.feedsLoading ? 
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
            <ActivityIndicator color={colorLiteral.BUTTON} size="large"/>
            <Text style={styles.nofeedtext}>Loading feeds..</Text>
            </View>
              :
              <ScrollableTabView
                tabBarBackgroundColor="white"
                tabBarActiveTextColor={colorLiteral.BUTTON}
                tabBarInactiveTextColor={colorLiteral.GREY}
                tabBarUnderlineStyle={{ backgroundColor: colorLiteral.BUTTON }}
              >

                <Feed
                  tabLabel="Following"
                  feedsData={this.props.dashboardReducer.following}
                />

                <Feed
                  tabLabel="Suggested"
                  feedsData={this.props.dashboardReducer.suggested}
                />
              </ScrollableTabView>
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dashboardReducer: state.dashboardReducer
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getUserFeeds,
    getUserStories
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

