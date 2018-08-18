import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Image
} from "react-native";
const WINDOW = Dimensions.get("window");
import { colorLiteral } from "../../../constants/Color";
import { styles } from "../../../styles/SearchStyles";
import OfflineNotice from "./../../common/OfflineNotice";
import { Actions, ActionConst } from "react-native-router-flux";
import NavigationBar from '../../common/NavBar';
import { getSuggestions } from "./../../../actions/SearchGroup/getSuggestions"
import { connect } from "react-redux";
import { getDetails } from "./../../../actions/SearchGroup/getDataList"
// import SearchBar from 'react-native-searchbar';
import Icon from 'react-native-vector-icons/Ionicons';
// import { SearchBar } from 'react-native-elements';

class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchBar: true,
      searchData: '',
      showSuggestionList: false,
      renderList: true,

    }
  }
  componentDidMount() {
    let { _id } = this.props.loginReducer.loginData.data

  }
  searchPress() {
    this.setState({ showSearchBar: true })
  }
  onChange(searchData) {
    let { _id } = this.props.loginReducer.loginData.data

    this.props.getSuggestions({
      keyword: searchData,
      user_id: _id
    })
    this.setState({ searchData, showSuggestionList: true })

  }
  onCross() {
    this.setState({ searchData: '', showSuggestionList: false })
  }
  onCancel() {
    this.setState({ showSearchBar: false, showSuggestionList: false })
  }
  selectSuggested({ item, index }) {
    let { _id } = this.props.loginReducer.loginData.data

    this.props.getDetails(item.keyword, _id)
    this.setState({ searchData: item.keyword, renderList: true, showSuggestionList: false, })
  }
  _keyExtractor = (item, index) => item.id;


  renderList({ item, index }) {
    return (
      <TouchableOpacity onPress={() => this.selectSuggested({ item, index })} style={{ flexDirection: 'row', height: WINDOW.height * 0.07, alignItems: 'center', borderBottomColor: '#e1e1e1', borderBottomWidth: 1 }}>
        <View style={{ flex: 0.11, alignItems: 'center', marginLeft: '2%' }}><Icon name={'md-search'} size={20} /></View>
        <Text style={{ flex: 0.79 }}>{item.keyword}</Text>
      </TouchableOpacity>
    );
  }
  _keyExtractor = (item, index) => item._id;
  renderHeader = (item) => (

    <View style={{ height: WINDOW.height / 20, borderBottomColor: '#e1e1e1', borderBottomWidth: 1, marginTop: '3%' }}>

      <View style={{ flex: 1, flexDirection: "row", borderBottomColor: "#dadada", borderBottomWidth: 1 }}>
        <View style={{ flex: 0.5, flexDirection: "column", justifyContent: "center", }}>
          <Text style={{ fontSize: WINDOW.width * 0.045, fontWeight: '500', marginLeft: '3%', fontWeight: "bold" }}>{item}</Text>

        </View>
        <View style={{ flex: 0.5, flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>

          <Text
            onPress={() => {
              if (item = "Playlists") {
                Actions.CreatePlaylist()
              }
            }}
            style={{ fontSize: 20, fontWeight: "bold", color: colorLiteral.BUTTON, marginRight: '3%', }}>See More</Text>
        </View>
      </View>

    </View>

  )
  renderListItems = ({ item, index }, type) => {
    console.log("Section details", item, index)
    if (type == "Playlists") {
      console.log("Section details,Playlists", item, index)
      return (
        <TouchableOpacity
          onPress={() => Actions.PlaylistDetails({ data: item })}
          style={{ flexDirection: 'row', height: WINDOW.height * 0.12, borderBottomColor: '#e1e1e1', borderBottomWidth: 1 }}>
          <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center' }}>
            {item.music.length <= 1 ?
              <View style={{ width: WINDOW.width * 0.15, height: WINDOW.width * 0.15, borderWidth: 1, borderColor: '#f5f5f5' }}>
                <Image
                  source={item && item.music && (item.music.length > 0 && item.music[0].image) ? item.music[0].image : require("./../../../constants/Images/noImage.png")}
                  style={{ width: "100%", height: "100%" }}
                />
              </View> :



              <View style={{ flex: 1, flexDirection: "row", margin: "10%" }} >
                <View style={{ flex: 0.5, flexDirection: "column" }} >
                  <View style={{ flex: 0.5, flexDirection: "column" }} >

                    <Image
                      source={item && item.music && (item.music.length > 0 && item.music[0].image) ? { uri: item.music[0].imag } : require("./../../../constants/Images/noImage.png")}
                      style={{ width: "100%", height: "100%" }}
                    />

                  </View>
                  <View style={{ flex: 0.5, flexDirection: "column" }} >
                    <Image
                      source={item && item.music && (item.music.length > 1 && item.music[1].image) ? { uri: item.music[1].imag } : require("./../../../constants/Images/noImage.png")}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>

                </View>
                <View style={{ flex: 0.5, flexDirection: "column" }} >
                  <View style={{ flex: 0.5, flexDirection: "column" }} >
                    <Image
                      source={item && item.music && (item.music.length > 2 && item.music[2].image) ? { uri: item.music[2].imag } : require("./../../../constants/Images/noImage.png")}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                  <View style={{ flex: 0.5, flexDirection: "column" }} >
                    <Image
                      source={item && item.music && (item.music.length > 3 && item.music[3].image) ? { uri: item.music[3].imag } : require("./../../../constants/Images/noImage.png")}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                </View>
              </View>
            }

          </View>
          <View style={{ flex: 0.65, justifyContent: 'center' }}>
            <Text style={{ fontSize: WINDOW.width * 0.037, fontWeight: '500', color: '#535454' }}>{item.title}</Text>
            <Text style={{ fontSize: WINDOW.width * 0.03, color: '#555656', marginTop: '2%' }}>{item.description}</Text>
          </View>
          <TouchableOpacity style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="ios-arrow-forward-outline" size={30} color="#555656" />
          </TouchableOpacity>
        </TouchableOpacity>
      );

    } else
      return (
        <TouchableOpacity style={{ flexDirection: 'row', height: WINDOW.height * 0.12, borderBottomColor: '#e1e1e1', borderBottomWidth: 1 }}>
          <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: WINDOW.width * 0.15, height: WINDOW.width * 0.15, borderWidth: 1, borderColor: '#f5f5f5', borderRadius: WINDOW.width * 0.075 }}>
              <Image
                source={item && item.icon ? { uri: item.icon } : require("./../../../constants/Images/noImage.png")}
                style={{ width: "100%", height: "100%", borderRadius: WINDOW.width * 0.075 }}
              />
            </View>

          </View>
          <View style={{ flex: 0.65, justifyContent: 'center' }}>
            <Text style={{ fontSize: WINDOW.width * 0.037, fontWeight: '500', color: '#535454' }}>{item.title}</Text>
            <Text style={{ fontSize: WINDOW.width * 0.03, color: '#555656', marginTop: '2%' }}>{item.description}</Text>
          </View>
          <TouchableOpacity style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="ios-arrow-forward-outline" size={30} color="#555656" />
          </TouchableOpacity>
        </TouchableOpacity>
      );
  }

  render() {
    console.log("this.props.data",this.props.data)
    return (
      <View style={styles.main}>
        <StatusBar
          hidden={false}
          backgroundColor={colorLiteral.STATUSBAR}
          barStyle="dark-content"
        />

        <View style={{ flex: 0.11, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'grey' }}>
          <TouchableOpacity onPress={() => Actions.pop()} style={{ flex: 0.08, justifyContent: 'center', marginLeft: '3%', marginTop: '5%' }}>
            <Icon
              name={'ios-arrow-back'}
              size={35}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.searchPress()} style={{ flex: 0.9, justifyContent: 'center', marginTop: '5%' }}><Text style={{ fontSize: 19, color: 'grey', fontWeight: '500' }}>Search</Text></TouchableOpacity>

        </View>


        <View style={{marginTop:"20%", flex: 0.89, backgroundColor: 'white',backgroundColor:"Red" }}>

          {this.props.data ?
            <ScrollView>
              {this.props.data.map((item, index) =>
                this.renderListItems({item, index},)

              )}

            </ScrollView> : null}

        </View>
      </View>
    );
  }
}

function mapUser(state) {
  return {
    loginReducer: state.loginReducer,
    getSuggestionsList: state.getSuggestionsList,
    getDataList: state.getDataList
  };
}

export default connect(mapUser, { getSuggestions, getDetails })(DetailView);
