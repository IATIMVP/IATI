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
import { Actions, ActionConst } from "react-native-router-flux";
import NavigationBar from '../../common/NavBar';
import { getSuggestions } from "./../../../actions/SearchGroup/getSuggestions"
import { connect } from "react-redux";
import { getDetails } from "./../../../actions/SearchGroup/getDataList"
// import SearchBar from 'react-native-searchbar';
import Icon from 'react-native-vector-icons/Ionicons';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchBar: true,
      searchData: '',
      showSuggestionList: false,
      renderList: true,
      data: [
        { id: 1, name: "Fickle Friends" },
        { id: 2, name: "fickle games" },
        { id: 3, name: "the fickle finger of fate" },
        { id: 4, name: "fickele sun I'm set free" },
        { id: 5, name: "fickle sun the hour is thin" },
        { id: 6, name: "fickle games" },
        { id: 7, name: "fickle games" },
      ],
      listdata: [
        { _id: 1, name: "Fickle Friends", username: "" },
        { _id: 2, name: "Say No more", username: "Fickle Friends" },
        { _id: 3, name: "You are someone else", username: "Fickle Friends" },
      ]
    }
  }
  componentDidMount() {
    let { _id } = this.props.loginReducer.loginData.data
    //this.props.getDetails("fav", _id)
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
      <TouchableOpacity onPress={() => this.selectSuggested({ item, index })} style={{ flexDirection: 'row', height: WINDOW.height * 0.07, alignItems: 'center', borderBottomColor: colorLiteral.MEDIUM_GREY, borderBottomWidth: 1 }}>
        <View style={{ flex: 0.11, alignItems: 'center', marginLeft: '2%' }}><Icon name={'md-search'} size={20} /></View>
        <Text style={{ flex: 0.79 }}>{item.keyword}</Text>
      </TouchableOpacity>
    );
  }
  _keyExtractor = (item, index) => item._id;
  renderHeader = (item) => {
    console.log("itemitem",item)
    return(

    <View style={{ height: WINDOW.height / 20, borderBottomColor: '#e1e1e1', borderBottomWidth: 1, marginTop: '3%' }}>

      <View style={{ flex: 1, flexDirection: "row", borderBottomColor: "#dadada", borderBottomWidth: 1 }}>
        <View style={{ flex: 0.5, flexDirection: "column", justifyContent: "center", }}>
          <Text style={{ fontSize: WINDOW.width * 0.045, fontWeight: '500', marginLeft: '3%', fontWeight: "bold" }}>{item}</Text>

        </View>
        <View style={{ flex: 0.5, flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>

          <Text
            onPress={() => {
              if (item == "Playlists") {
                Actions.CreatePlaylist()
              }
            }}
            style={{ fontSize: 16, color: colorLiteral.BUTTON, marginRight: '3%', }}>See More</Text>
        </View>
      </View>

    </View>

  )
}
  renderData = (item, index) => {
    console.log("tem,indextem,indextem,index HITEEEESSSSSHHH", item, index)
    if (item.top_results && item.top_results.length > 0) {
      return (
        <FlatList
          data={item.top_results}
          keyExtractor={this._keyExtractor.bind(this)}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this.renderHeader("Top Results")}
          renderItem={({ item, index }) => this.renderListItems({ item, index },"Top Results")}
        />
      )
    }
    else if (item.artists && item.artists.length > 0) {
      return (
        <FlatList
          data={item.artists}
          keyExtractor={this._keyExtractor.bind(this)}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this.renderHeader("Artists")}
          renderItem={({ item, index }) => this.renderListItems({ item, index },"Artists")}
        />
      )
    }
    else if (item.tracks && item.tracks.length > 0) {
      return (
        <FlatList
          data={item.tracks}
          keyExtractor={this._keyExtractor.bind(this)}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this.renderHeader("Tracks")}
          renderItem={({ item, index }) => this.renderListItems({ item, index },"Tracks")}
        />
      )
    }
    else if (item.users && item.users.length > 0) {
      return (
        <FlatList
          data={item.users}
          keyExtractor={this._keyExtractor.bind(this)}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this.renderHeader("Users")}
          renderItem={({ item, index }) => this.renderListItems({ item, index },"users")}
        />
      )
    }
    else if (item.playlists && item.playlists.length > 0) {
      return (
        <FlatList
          data={item.playlists}
          keyExtractor={this._keyExtractor.bind(this)}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this.renderHeader("Playlists")}
          renderItem={({ item, index }) => this.renderListItems({ item, index, }, "Playlists")}
        />
      )
    }

  }
  renderListItems = ({ item, index }, type) => {
    console.log("Section details", item, index,type)
    if (type == "Playlists") {
      console.log("Section details,Playlists", item, index)
      return (
        <TouchableOpacity
          onPress={() => Actions.PlaylistDetails({ data: item })}
          style={{ flexDirection: 'row', height: WINDOW.height * 0.12, borderBottomColor: '#e1e1e1', borderBottomWidth: 1 }}>
          <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center' }}>
            {item.music.length <= 1 ?
              <View style={{ width: WINDOW.width * 0.15, height: WINDOW.width * 0.15, borderWidth: 2, borderColor: '#dadada' }}>
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
          <View style={{ flex: 0.60, justifyContent: 'center' }}>
            <Text style={{ fontSize: WINDOW.width * 0.037, fontWeight: '500', color: '#535454' }}>{item.name?item.name:item.title}</Text>
            <Text style={{ fontSize: WINDOW.width * 0.03, color: '#555656', marginTop: '2%' }}>{item.description}</Text>
          </View>
          <TouchableOpacity style={{ flex: 0.15, justifyContent: 'center', alignItems: 'flex-end',marginRight:"2%" }}>
            <Icon name="ios-arrow-forward-outline" size={30} color="#555656" />
          </TouchableOpacity>
        </TouchableOpacity>
      );

    } else
      return (
        <TouchableOpacity style={{ flexDirection: 'row', height: WINDOW.height * 0.12, borderBottomColor: '#e1e1e1', borderBottomWidth: 1 }}>
          <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: WINDOW.width * 0.15, height: WINDOW.width * 0.15,borderWidth: 2, borderColor: '#dadada',  }}>
              <Image
                source={item && item.icon ? { uri: item.icon } : require("./../../../constants/Images/noImage.png")}
                style={{ width: "100%", height: "100%", borderRadius: WINDOW.width * 0.075 }}
              />
            </View>

          </View>
          <View style={{ flex: 0.60, justifyContent: 'center' }}>
            <Text style={{ fontSize: WINDOW.width * 0.037, fontWeight: '500', color: '#535454' }}>{item.name?item.name:item.title}</Text>
            {item.description?<Text style={{ fontSize: WINDOW.width * 0.03, color: '#555656', marginTop: '2%' }}>{item.description}</Text>:null}
          </View>
          <TouchableOpacity style={{ flex: 0.15, justifyContent: 'center', alignItems: 'flex-end',marginRight:"2%" }}>
            <Icon name="ios-arrow-forward-outline" size={30} color="#555656" />
          </TouchableOpacity>
        </TouchableOpacity>
      );
  }
  render() {
    let { isLoading, data, success } = this.props.getSuggestionsList
    let key = this.props.getDataList

    let { renderList, showSuggestionList } = this.state
    console.log("renderList,showSuggestionList", renderList, showSuggestionList)

    return (
      <View style={styles.main}>
        <StatusBar
          hidden={false}
          backgroundColor={colorLiteral.STATUSBAR}
          barStyle="dark-content"
        />
        {this.state.showSearchBar === false ?
          <View style={{ flex: 0.11, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'grey' }}>
            <TouchableOpacity onPress={() => Actions.home()} style={{ flex: 0.08, justifyContent: 'center', marginLeft: '3%', marginTop: '5%' }}>
              <Icon
                name={'ios-arrow-back'}
                size={35}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.searchPress()} style={{ flex: 0.9, justifyContent: 'center', marginTop: '5%' }}><Text style={{ fontSize: 19, color: 'grey', fontWeight: '500' }}>Search</Text></TouchableOpacity>

          </View>
          :
          <View
            style={{ height: WINDOW.height / 8, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'grey', alignItems: 'center' }}>

            <View style={{ flex: 0.8, backgroundColor: '#efeff2', flexDirection: 'row', borderRadius: 17, height: 40, width: 100, marginTop: '5%', marginLeft: '3%' }}>
              <View
                style={{ flex: 0.13, alignItems: 'center', justifyContent: 'center' }}><Icon name={'md-search'} size={20} /></View>
              <TextInput
                autoCorrect={false}
                returnKeyType={"search"}
                autoFocus={true}
                underlineColorAndroid={"transparent"}
                autoCapitalize={"none"}
                style={{ flex: 0.77 }}
                value={this.state.searchData}
                onChangeText={searchData => { this.onChange(searchData) }}
                placeholder={"Search"}
                placeholderTextColor={"#a1a1a1"}
              />
              {this.state.searchData == "" ? null :
              isLoading && showSuggestionList ?
              <View style={{ flex: 0.1, alignItems: 'flex-start', justifyContent: 'center' }}>
                <ActivityIndicator />
               
              </View> :
              <TouchableOpacity onPress={() => this.onCross()} style={{ flex: 0.1, alignItems: 'flex-start', justifyContent: 'center' }}><Icon name={'md-close-circle'} size={19} /></TouchableOpacity>}

            </View>
            <TouchableOpacity onPress={() => this.onCancel()} style={{ flex: 0.222, justifyContent: 'center', marginTop: '5%' }}><Text style={{ fontSize: 18, color: colorLiteral.BUTTON, textAlign: 'center' }}>Cancel</Text></TouchableOpacity>
          </View>
        }

        <View style={{ flex: 0.89, backgroundColor: 'white' }}>
          { showSuggestionList && success && data.length == 0 ?

              <View style={{ height: WINDOW.height / 2, justifyContent: "center", alignItems: "center" }}>

                <Text style={{ color: "red", textAlign: "center" }}>No Suggestions for this keyword, please try using another keyword</Text>
              </View> :
              showSuggestionList && data.length > 0 ?
                <FlatList
                  data={data.length > 0 ? data : null}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor.bind(this)}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => this.renderList({ item, index })
                  }
                />
                :
                key.isLoading && renderList ?
                  <View style={{ height: WINDOW.height / 2, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator />
                    <Text>Loading, please wait ...</Text>
                  </View> :
                  renderList && key.success && key.data.length == 0 ?
                    <View style={{ height: WINDOW.height / 2, justifyContent: "center", alignItems: "center" }}>

                      <Text style={{ color: "red", textAlign: "center" }}>No Data found!</Text>
                    </View> :
                    renderList && key.data.length > 0 ?
                      <ScrollView style={{ flex: 1 }}>
                        {key.data.map((item, index) =>
                        
                         
                            this.renderData(item, index)
                          
                         )}

                      </ScrollView>
                      : null}
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

export default connect(mapUser, { getSuggestions, getDetails })(Search);
