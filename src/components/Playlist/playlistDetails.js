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
    Modal,
    Platform,
    Alert,
    StatusBar,
    FlatList,
    ImageBackground
} from "react-native";
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
const WINDOW = Dimensions.get("window");
import { colorLiteral } from "../../constants/Color";
import { socialLogin } from "../../actions/LoginAction";
import Icon from 'react-native-vector-icons/dist/Entypo';
import { styles } from "../../styles/LoginStyle";
import MORE_ICON from 'react-native-vector-icons/Feather';
import ActionSheet from 'react-native-actionsheet'

import { selectuserName, setUserName } from "../../actions/SelectUserNameAction";
import OfflineNotice from "./../common/OfflineNotice";
import Icons from 'react-native-vector-icons/EvilIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import CoseIcon from 'react-native-vector-icons/EvilIcons';
import { playlistaction } from "./../../actions/PlaylistGroup/playlistaction"
import Swipeout from 'react-native-swipeout';

import { ifIphoneX } from 'react-native-iphone-x-helper'
const dummyText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
const options = [
    <Text style={{ color: 'blue' }}>Hide From Profile</Text>,
    <Text style={{ color: 'black' }}>Report</Text>
]

class PlaylistDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            flag:true
        };
    }

    componentWillReceiveProps(nextProps) {


    }
    referesh() {

    }
    componentWillMount() {
        let { data } = this.props
        Actions.refresh({ renderRightButton: this.renderRightButton ,title: data && data.name ? data.name : null })


    }
    renderRightButton = () =>
        <TouchableOpacity
            onPress={() =>
                this.ActionSheet.show()
            }
            style={{ flex: 1, width: WINDOW.width * 0.1, alignItems: 'center', justifyContent: 'center' }}>
            <MORE_ICON name="more-horizontal" size={30} color="grey" />
        </TouchableOpacity>

    keyExtractor = (item) => { item.id };
    _renderItem = ({ item }) => (


        <Swipeout
        scroll={false}
        sensitivity={10}
        onOpen={()=>this.setState({flag:false})}
        onClose={()=>this.setState({flag:true})}
        backgroundColor={"white"}
        underlayColor={"white"}
        style={{backgroundColor:"white"}}
            right={[{
                component: <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Icon name="circle-with-minus" size={30} color="red" />
                </View>
            }]}>
            <TouchableOpacity
onPress={()=>Alert.alert("under progress")}
                style={{ padding: 5, borderBottomColor: "#dadada", borderBottomWidth: 1, flexDirection: "row",backgroundColor:"white" }}>
                <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center", }}>
                    <View style={{ height: WINDOW.height / 10, width: WINDOW.height / 10, borderRadius: 6, borderColor: "#dadada", borderWidth: 2 }}>
                        <Image
                            source={item.image ? { uri: item.image } : require("./../../constants/Images/noImage.png")}
                            style={{ height: WINDOW.height / 10, width: WINDOW.height / 10, borderRadius: 6 }}
                        />
                    </View>
                </View>
                <View style={{ flex: 0.8, justifyContent: "center", alignItems: "flex-start", paddingLeft: 18 }}>
                    <Text style={{ fontSize: 20 }}>{item.link}</Text>
                    <Text style={{ fontSize: 20, color: "#dadada" }}>{item.artist ? item.artist : "xyz"}</Text>
                </View>

            </TouchableOpacity>
        </Swipeout>



    )
    render() {
        let { _id, username } = this.props.loginReducer.loginData.data
        let { isLoading } = this.props.createPlaylistReducer
        let { more, music } = this.state
        console.log("_id", this.props.loginReducer.loginData)

        let { data } = this.props
        console.log("data.data.data.data====>", data)
        return (


            <View style={{
                flex: 1,

            }}>
                <StatusBar
                    hidden={false}
                    backgroundColor={colorLiteral.STATUSBAR}
                    barStyle="dark-content"
                />
                <View style={{ flex: 0.08 }} />
                <View style={{ height: WINDOW.height * 0.21, paddingHorizontal: "2%", paddingTop: '5%' }}>

                    <View style={{ flexDirection: "row", flex: 1, borderBottomColor: "#dadada", borderBottomWidth: 2, padding: "3%" }}>
                        <View style={{ flex: 0.3 }}>

                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <View
                                    style={{ height: WINDOW.height / 7, width: WINDOW.height / 7, borderColor: colorLiteral.LIGHTGREY, borderWidth: 2 }}
                                >
                                    <Image
                                        source={data && data.music && data.music.length > 0 ? data.music[0].image : require("./../../constants/Images/noImage.png")}
                                        style={{ height:"100%", width: "100%", borderRadius: 6 }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 0.7 }}>
                            {data && data.music && data.music.length > 0 ?

                                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", paddingLeft: "10%" }}>
                                    <Text>{data && data.name ? data.name : null}</Text>
                                    <Text>By: {username}</Text>
                                    <Text>{data && data.music && data.music.length > 0 ? data.music.length : null} Songs,1:00:21</Text>
                                    <View style={{ flexDirection: "row", height: 25, width: 60, backgroundColor: colorLiteral.BUTTON, borderRadius: 4, marginTop: "5%" }}>
                                        <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ color: "white", fontSize: WINDOW.height / 40 }} >+</Text>
                                        </View>
                                        <View style={{ flex: 0.7, justifyContent: "center", alignItems: "center" }}>
                                            <Text>Add</Text>
                                        </View>
                                    </View>
                                </View> :
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start", paddingLeft: "10%" }}>
                                    <Text>{data && data.name ? data.name : null}</Text>
                                </View>
                            }
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: "2%", }}>

                    <View style={{ flexDirection: "row", borderBottomColor: "#dadada", borderBottomWidth: 2, padding: "3%" }}>
                        {more ?
                            <Text>{data.description ? data.description : ""}
                                <Text
                                    onPress={() => this.setState({ more: false })}
                                    style={{ color: "red" }}>less</Text>
                            </Text>
                            :
                            data.description && data.description.length > 200 ? <Text
                                onPress={() =>
                                    this.setState({ more: true })
                                }
                            >{data.description.slice(0, 200) + '...'}
                                <Text
                                    style={{ color: "red" }}>more</Text></Text> : <Text>{data.description}</Text>}
                    </View>
                </View>
                <View style={{ flex: 0.5, }}>
                    {data && data.music && data.music.length > 0 ?

                        <FlatList
                            keyboardShouldPersistTaps={'handled'}
                            showsVerticalScrollIndicator={false}
                            data={data.music}
                            renderItem={this._renderItem}
                            keyExtractor={this.keyExtractor}
                            scrollEnabled={this.state.flag}
                        /> :
                        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                            <Text>You dont have any song in this playlist</Text>
                            <View style={{ flexDirection: "row", height: WINDOW.height / 19, width: WINDOW.width / 2, borderRadius: 19, marginTop: "5%", backgroundColor: colorLiteral.BUTTON }}>

                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text>Add Music</Text>

                                </View>

                            </View>
                        </View>
                    }
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.openModal}
                    onRequestClose={() => null}
                >
                    <View style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: colorLiteral.BGCOLOR
                    }}>
                        <View style={{ flex: 0.1, backgroundColor: "red" }}>
                        </View>
                    </View>


                </Modal>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={['Hide from profile', 'Report', 'cancel']}
                    cancelButtonIndex={2}
                    
                    onPress={(index) => { /* do something */ }}
                />
            </View>

        );
    }
}
function mapUser(state) {
    return {
        SelectUserNameReducer: state.SelectUserNameReducer,
        loginReducer: state.loginReducer,
        createPlaylistReducer: state.createPlaylistReducer
    };
}

export default connect(mapUser, { playlistaction })(PlaylistDetails);
