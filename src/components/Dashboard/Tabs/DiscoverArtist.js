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

} from "react-native";
import { Actions, ActionConst } from "react-native-router-flux";
import { colorLiteral } from "../../../constants/Color";
const WINDOW = Dimensions.get("window");
import dismissKeyboard from 'react-native-dismiss-keyboard';
import { styles } from "../../../styles/DashboardStyle";
import OfflineNotice from "./../../common/OfflineNotice";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import ArrowRight from 'react-native-vector-icons/MaterialIcons';


import NavigationBar from '../../common/NavBar';
import { DiscoverList } from "./../../../actions/DiscoverGroup/DiscoverList"
import Horizontalsections from "./DiscoverComponents/Horizontalsections"
import HorizontalsectionsPlaylist from "./DiscoverComponents/HorizontalsectionsPlaylist"


const Staticdata = [{ id: 5, name: "p4k agent", img: require("./../../../constants/Images/signup/image_01.png") },
{ id: 6, name: "sunday morning vives", img: require("./../../../constants/Images/signup/image_02.png") },
{ id: 12, name: "Fitness hardcore", img: require("./../../../constants/Images/signup/image_03.png") },
{ id: 23, name: "goodmornings", img: require("./../../../constants/Images/signup/image_04.png") },
{ id: 31, name: "sunday morning vives", img: require("./../../../constants/Images/signup/image_03.png") },
{ id: 44, name: "90's hip pop", img: require("./../../../constants/Images/signup/image_04.png") },
{ id: 55, name: "p4k agent", img: require("./../../../constants/Images/signup/image_01.png") },
{ id: 65, name: "p4k agent", img: require("./../../../constants/Images/signup/image_01.png") },
{ id: 761, name: "sunday morning vives", img: require("./../../../constants/Images/signup/image_02.png") },
{ id: 562, name: "Fitness hardcore", img: require("./../../../constants/Images/signup/image_03.png") },
{ id: 2133, name: "goodmornings", img: require("./../../../constants/Images/signup/image_04.png") },
{ id: 3241, name: "sunday morning vives", img: require("./../../../constants/Images/signup/image_03.png") },
{ id: 344, name: "90's hip pop", img: require("./../../../constants/Images/signup/image_04.png") },
{ id: 2345, name: "p4k agent", img: require("./../../../constants/Images/signup/image_01.png") },

]
class DiscoverArtist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchData: ""
    }
  }

  componentWillMount() {
    dismissKeyboard();
    let { _id } = this.props.loginReducer.loginData.data
    console.log("this.props.loginReducer.loginData.data", this.props.loginReducer.loginData.data)
    this.props.DiscoverList(_id, "")
  }
  onChange(searchData) {
    this.setState({ searchData })
    this.setState({ showSuggestionList: true })
  }
  renderSections = (item, index) => {
    console.log("item,index", item, index)
    if (item && item.featured && item.featured.length > 0) {
      return (
        <View style={{}}>
          <View style={{ marginHorizontal: "4%" }}>
            <View style={{ paddingTop: "5%", flexDirection: "row", borderBottomColor: "#dadada", borderBottomWidth: 1 }}>
              <View style={{ flex: 0.5, flexDirection: "column", justifyContent: "flex-end", }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Featured</Text>
              </View>
              <TouchableOpacity
                onPress={() => Actions.multiDetailView({ data: { data: item.postData, type: "Featured" } })}
                style={{ flex: 0.5, flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end" }}>

                <Text style={{ fontSize: 16, color: colorLiteral.BUTTON }}>See More</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: WINDOW.height / 2.5 }}>
            <Horizontalsections
              data={item.featured}
            />
          </View>
        </View>)
    }
    else if (item && item.posts && item.posts.length > 0) {
      return (
        <View>
          <View style={{ marginHorizontal: "4%", marginTop: "7%" }}>
            <View style={{ flex: 1, flexDirection: "row", borderBottomColor: "#dadada", borderBottomWidth: 1 }}>
              <View style={{ flex: 0.5, flexDirection: "column", justifyContent: "center", }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Posts</Text>
              </View>
              <View style={{ flex: 0.5, flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>

                <Text style={{ fontSize: 16, fontWeight: "bold", color: colorLiteral.BUTTON }}>All  Generes</Text>
              </View>
            </View>
          </View>
          {item.posts.map((item, index) =>
            <View style={{

            }}>
              <View style={{ marginHorizontal: "4%" }}>
                <View style={{ paddingTop: "5%", flexDirection: "row", borderBottomColor: "#dadada", borderBottomWidth: 1 }}>
                  <View style={{ flex: 0.5, flexDirection: "column", justifyContent: "flex-end", }}>
                    <Text style={{ fontSize: 18, color: "black" }}>{item._id}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => Actions.multiDetailView({ data: { data: item.postData, type: "Posts" } })}
                    style={{ flex: 0.5, flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end" }}>

                    <Text style={{ fontSize: 16, color: colorLiteral.BUTTON }}>See More</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ height: WINDOW.height / 2.5 }}>
                <Horizontalsections
                  data={item.postData}
                />
              </View>
            </View>
          )}

        </View>
      )
    }
    else if (item && item.tracks && item.tracks.length > 0) {
      return (
        <View>
          <View style={{ marginHorizontal: "4%", marginTop: "7%" }}>
            <View style={{ flex: 1, flexDirection: "row", borderBottomColor: "#dadada", borderBottomWidth: 1 }}>
              <View style={{ flex: 0.5, flexDirection: "column", justifyContent: "center", }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Top Tracks</Text>
              </View>
              <View style={{ flex: 0.5, flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: colorLiteral.BUTTON }}>All  Generes</Text>
              </View>
            </View>
          </View>
          {item.tracks.map((item, index) =>
            <View style={{
            }}>
              <View style={{ marginHorizontal: "4%" }}>
                <View style={{ paddingTop: "5%", flexDirection: "row", borderBottomColor: "#dadada", borderBottomWidth: 1 }}>
                  <View style={{ flex: 0.5, flexDirection: "column", justifyContent: "flex-end", }}>
                    <Text style={{ fontSize: 18, color: "black" }}>{item._id}</Text>
                  </View>
                  <TouchableOpacity
                   onPress={() => Actions.multiDetailView({ data: { data: item.postData, type: "Top-Tracks" } })}
                    style={{ flex: 0.5, flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end" }}>
                    <Text style={{ fontSize: 16, color: colorLiteral.BUTTON }}>See More</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ height: WINDOW.height / 2.5, }}>
                <Horizontalsections
                  data={item.postData}
                />
              </View>
            </View>
          )}

        </View>
      )
    }
    else if (item && item.playlist) {
      return (
        <View style={{

        }}>
          <View style={{ marginHorizontal: "4%", marginTop: "7%" }}>
            <View style={{ flex: 1, flexDirection: "row", borderBottomColor: "#dadada", borderBottomWidth: 1 }}>
              <View style={{ flex: 0.5, flexDirection: "column", justifyContent: "center", }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Playlists</Text>
              </View>
              <TouchableOpacity
              onPress={()=>Actions.CreatePlaylist()}
               style={{ flex: 0.5, flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: colorLiteral.BUTTON }}>See More</Text>
              </TouchableOpacity>
            </View>
          </View>


          <View style={{ height: WINDOW.height / 2.5, }}>
            <HorizontalsectionsPlaylist
              data={item.playlist}
            />
          </View>
        </View>
      )
    }

  }
  render() {
    let { isLoading, data, success } = this.props.fetchDiscoverlist
    console.log(isLoading, data, success, "hiteshhhhhhhh")
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      )
    }
    else if (data && data.length <= 0) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>No data fOUND!</Text>
        </View>
      )
    } else
      return (
        <ScrollView>
          <StatusBar
            hidden={false}
            backgroundColor={colorLiteral.STATUSBAR}
            barStyle="dark-content"
          />

          <TouchableOpacity
            onPress={() => Actions.search()}
            style={{ height: WINDOW.height / 8, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'grey', alignItems: 'center' }}>

            <View

              style={{ flex: 1, backgroundColor: '#efeff2', flexDirection: 'row', borderRadius: 17, height: 40, width: "100%", marginTop: '5%', marginHorizontal: '3%' }}>
              <View onPress={() => Actions.search()}
                style={{ flex: 0.13, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={'md-search'} size={20} />
              </View>
              <View
                style={{ flex: 0.87, alignItems: 'flex-start', justifyContent: 'center' }}>

                <Text style={{ color: "#a1a1a1" }}>Search</Text>
              </View>
              {/* <TextInput
                editable={false}
                autoCorrect={false}
                returnKeyType={"search"}
                underlineColorAndroid={"transparent"}
                autoCapitalize={"none"}
                style={{ flex: 1 }}
                value={this.state.searchData}
                onChangeText={searchData => { this.onChange(searchData) }}
                placeholder={"Search"}
                placeholderTextColor={"#a1a1a1"}
              /> */}

            </View>
          </TouchableOpacity>

          {data.map((item, index) =>
            this.renderSections(item, index)
          )}

          <View style={{
            height: WINDOW.height / 4,
            //flex: 0.25
          }}>
            <View style={{ flex: 0.2, borderBottomColor: "#dadada", borderBottomWidth: 1 }}>
              <View style={{ flex: 1, flexDirection: "row", }}>
                <View style={{ flex: 0.5, flexDirection: "column", justifyContent: "center", marginHorizontal: "4%", }}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>Quick Links</Text>
                </View>
                <View style={{ flex: 0.5, flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>


                </View>
              </View>
            </View>
            <View style={{ flex: 0.2, marginHorizontal: "4%", borderBottomColor: "#dadada", borderBottomWidth: 1 }}>
              <View style={{ flex: 1, flexDirection: "row", }}>
                <View style={{ flex: 0.8, flexDirection: "column", justifyContent: "center", }}>
                  <Text style={{ fontSize: 18, color: "grey" }}>Follow us on Social Media</Text>
                </View>
                <View style={{ flex: 0.2, flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
                  <ArrowRight name={'keyboard-arrow-right'} size={22} color={"grey"} />

                </View>
              </View>
            </View>
            <View style={{ flex: 0.2, marginHorizontal: "4%", borderBottomColor: "#dadada", borderBottomWidth: 1 }}>
              <View style={{ flex: 1, flexDirection: "row", }}>
                <View style={{ flex: 0.8, flexDirection: "column", justifyContent: "center", }}>
                  <Text style={{ fontSize: 18, color: "grey" }}>Upload your music or post</Text>
                </View>
                <View style={{ flex: 0.2, flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
                  <ArrowRight name={'keyboard-arrow-right'} size={22} color={"grey"} />

                </View>
              </View>
            </View>
            <View style={{ flex: 0.2, marginHorizontal: "4%", borderBottomColor: "#dadada", borderBottomWidth: 1 }}>
              <View style={{ flex: 1, flexDirection: "row", }}>
                <View style={{ flex: 0.8, flexDirection: "column", justifyContent: "center", }}>
                  <Text style={{ fontSize: 18, color: "grey" }}>DMCA</Text>
                </View>
                <View style={{ flex: 0.2, flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
                  <ArrowRight name={'keyboard-arrow-right'} size={22} color={"grey"} />

                </View>
              </View>
            </View>
          </View>

          <View style={{
            height: WINDOW.height / 15,
          }} />

        </ScrollView >
      );
  }
}


function mapUser(state) {
  return {
    fetchDiscoverlist: state.fetchDiscoverlist,
    loginReducer: state.loginReducer,
  };
}

export default connect(mapUser, { DiscoverList })(DiscoverArtist);

