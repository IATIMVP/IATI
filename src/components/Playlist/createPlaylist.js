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
    ImageBackground,

} from "react-native";
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
const WINDOW = Dimensions.get("window");
import { colorLiteral } from "../../constants/Color";
import { socialLogin } from "../../actions/LoginAction";
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { styles } from "../../styles/LoginStyle";

import { selectuserName, setUserName } from "../../actions/SelectUserNameAction";
import OfflineNotice from "./../common/OfflineNotice";
import Icons from 'react-native-vector-icons/EvilIcons';
import Cross from 'react-native-vector-icons/Entypo';
import IIcon from 'react-native-vector-icons/Ionicons';
import CoseIcon from 'react-native-vector-icons/EvilIcons';
import { playlistaction, fetchPlaylist } from "./../../actions/PlaylistGroup/playlistaction"

import { ifIphoneX } from 'react-native-iphone-x-helper'
let card = [
    {
        id: 1,
        songs: [{ id: 1, song: "sadasdasd", artist: "nickky minaz", img: require("./../../constants/Images/signup/image_02.png") }, { id: 2, song: "let her go", artist: "passengers", img: require("./../../constants/Images/signup/image_03.png") }],
        name: "sunday morning vives", img: require("./../../constants/Images/signup/image_01.png")
    },
    {
        id: 2,
        songs: [],
        name: "Fitness hardcore", img: require("./../../constants/Images/signup/image_02.png")
    },
    {
        id: 3,
        songs: [{ id: 1, song: "faded", artist: "alan waker", img: require("./../../constants/Images/signup/image_04.png") }, { id: 2, song: "let her go", artist: "passengers", img: require("./../../constants/Images/signup/image_03.png") }],
        name: "goodmornings", img: require("./../../constants/Images/signup/image_03.png")
    },
    {
        id: 4,
        songs: [{ id: 1, song: "sadasdasd", artist: "nickky minaz", img: require("./../../constants/Images/signup/image_02.png") },
        { id: 2, song: "let her go", artist: "passengers", img: require("./../../constants/Images/signup/image_03.png") },
        { id: 3, song: "Space Bound", artist: "EMINEM", img: require("./../../constants/Images/signup/image_03.png") }
        ],
        name: "90's hip pop", img: require("./../../constants/Images/signup/image_04.png")
    },
    { id: 5, name: "p4k agent", img: require("./../../constants/Images/signup/image_01.png") },
    { id: 6, name: "sunday morning vives", img: require("./../../constants/Images/signup/image_02.png") },
    { id: 12, name: "Fitness hardcore", img: require("./../../constants/Images/signup/image_03.png") },
    { id: 23, name: "goodmornings", img: require("./../../constants/Images/signup/image_04.png") },
    { id: 31, name: "sunday morning vives", img: require("./../../constants/Images/signup/image_03.png") },
    { id: 44, name: "90's hip pop", img: require("./../../constants/Images/signup/image_04.png") },
    { id: 55, name: "p4k agent", img: require("./../../constants/Images/signup/image_01.png") },
    { id: 65, name: "p4k agent", img: require("./../../constants/Images/signup/image_01.png") },
    { id: 761, name: "sunday morning vives", img: require("./../../constants/Images/signup/image_02.png") },
    { id: 562, name: "Fitness hardcore", img: require("./../../constants/Images/signup/image_03.png") },
    { id: 2133, name: "goodmornings", img: require("./../../constants/Images/signup/image_04.png") },
    { id: 3241, name: "sunday morning vives", img: require("./../../constants/Images/signup/image_03.png") },
    { id: 344, name: "90's hip pop", img: require("./../../constants/Images/signup/image_04.png") },
    { id: 2345, name: "p4k agent", img: require("./../../constants/Images/signup/image_01.png") },

]
class CreatePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false, validate: true,
            playlistname: "",
            aboutPlaylist: "",
            loading: true,
        };
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.createPlaylistReducer.success == "success") {
            this.setState({
                openModal: false, playlistname: "",
                aboutPlaylist: ""
            })
        }

    }
    referesh() {

    }
    componentWillMount() {
        let { _id } = this.props.loginReducer.loginData.data

        this.props.fetchPlaylist(_id)

    }
    renderHeader = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                this.setState({ openModal: true })
            }}
            style={{ height: WINDOW.height / 8, padding: 5, borderBottomColor: "#dadada", borderBottomWidth: 1, flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}>

                <View
                    style={{ justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: colorLiteral.LIGHTGREY, height: WINDOW.width / 6, width: WINDOW.width / 6, borderRadius: 6 }}>
                    <Text style={{ fontSize: 45, color: colorLiteral.LIGHTGREY }}>+</Text>
                </View>
            </View>
            <View style={{ flex: 0.6, justifyContent: "center", paddingLeft: 18 }}>
                <Text style={{ fontSize: 20 }}>New Playlist</Text>

            </View>
            <View style={{ flex: 0.2, justifyContent: "center", alignItems: "flex-end", marginRight: "2%" }}>
                <Icon name="ios-arrow-forward-outline" size={30} color={colorLiteral.LIGHTGREY} />
            </View>
        </TouchableOpacity>

    )
    keyExtractor = (item) => { item._id };
    handleLoadMore = () => {


    };
    renderFooter = () => {
        let isLoadingFetch = this.props.fetchPlaylistData.isLoading
        if (!isLoadingFetch) return <View style={{ marginBottom: 80 }} />;
        else
            return (
                <View
                    style={{
                        paddingVertical: 5
                    }}
                >
                    <ActivityIndicator animating size="large" />
                </View>
            );
    };
    _renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                Actions.PlaylistDetails({ data: item })
            }}
            style={{ height: WINDOW.height / 8, padding: 5, borderBottomColor: "#dadada", borderBottomWidth: 1, flexDirection: "row" }}>
            {

                <View style={{ flex: 0.2, justifyContent: "center", alignItems: "center" }}>

                    <View
                        style={{ borderWidth: 2, borderColor: colorLiteral.LIGHTGREY, height: WINDOW.width / 6, width: WINDOW.width / 6, borderRadius: 6 }}>
                        <Image
                            source={item.music && item.music.length > 0 ? { uri: item.music[0].img } : require("./../../constants/Images/noImage.png")}
                            style={{ height: "100%", width: "100%", borderRadius: 6 }}
                        />
                    </View>

                </View>}
            <View style={{ flex: 0.6, justifyContent: "center", paddingLeft: 18 }}>
                <Text style={{ fontSize: 20 }}>{item.name}</Text>

            </View>
            <View style={{ flex: 0.2, justifyContent: "center", alignItems: "flex-end", marginRight: "2%" }}>
                <Icon name="ios-arrow-forward-outline" size={30} color={colorLiteral.LIGHTGREY} />
            </View>
        </TouchableOpacity>
    )
    render() {
        let { _id } = this.props.loginReducer.loginData.data
        let { isLoading } = this.props.createPlaylistReducer

        let isLoadingFetch = this.props.fetchPlaylistData.isLoading
        let Playlistdata = this.props.fetchPlaylistData.data

        console.log("Playlistdata", Playlistdata, "isLoadingFetch", isLoadingFetch)
        if (isLoadingFetch) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (


            <View style={{
                flex: 1,

            }}>
                <StatusBar
                    hidden={false}
                    backgroundColor={colorLiteral.STATUSBAR}
                    barStyle="dark-content"
                />
                {/* <View style={{ flex: 0.08 ,backgroundColor:'red'}} /> */}
                <View style={{ flex: 1, marginTop: '9%' }}>
                    <FlatList
                        onEndReached={(val) => console.log("onEndReached", val)}
                        ListFooterComponent={this.renderFooter}
                        onEndReachedThreshold={1}
                        keyboardShouldPersistTaps={'handled'}
                        showsVerticalScrollIndicator={false}
                        style={{ height: WINDOW.height / 1.2, marginTop: 20 }}
                        data={Playlistdata}
                        renderItem={this._renderItem}
                        keyExtractor={this.keyExtractor}
                        ListHeaderComponent={this.renderHeader}
                        scrollEnabled={true}
                    />
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
                        <View style={{
                            backgroundColor: colorLiteral.WHITE,
                            height: WINDOW.height / 2.5,
                            width: WINDOW.width / 1.2,
                            borderRadius: 30,
                            paddingHorizontal: '4%'
                        }}>
                            <View style={{
                                flex: 0.15,
                                flexDirection: 'row',
                                alignItems: "center",
                              
                            }}>
                                <Text style={styles.text}>Create Playlist</Text>
                                <TouchableOpacity onPress={() => this.setState({ openModal: false, resetDone: false, registeredEmail: '' })} style={{ flex: 0.1, backgroundColor: 'transparent', alignItems: 'flex-end', paddingTop: "2%" }}>

                                    <Cross name="cross" size={30} color="grey" />

                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 0.57 ,}}>
                                <View style={{ flex: 0.2, justifyContent: "center", alignItems: "flex-start", marginHorizontal: '3%', }}>
                                    <Text>Playlist name</Text>
                                </View>
                                <View style={{ flex: 0.2, marginHorizontal: '3%', borderWidth: 1, borderColor: this.state.playlistname == "" && this.state.validate == false ? "red" : "grey", borderRadius: 7, marginTop: "0%" }}>
                                    <TextInput
                                        autoCorrect={false}
                                        returnKeyType={"next"}
                                        maxLength={20}
                                        selectionColor={colorLiteral.GREY}
                                        underlineColorAndroid={"transparent"}
                                        autoCapitalize={"none"}
                                        style={styles.email1}
                                        value={this.state.playlistname}
                                        onChangeText={playlistname => this.setState({ playlistname })}
                                        placeholder={"Playlist name"}
                                        placeholderTextColor={"grey"}

                                    />
                                </View>


                                <View style={{ flex: 0.23, justifyContent: "center", alignItems: "flex-start", marginHorizontal: '3%', }}>
                                    <Text>About Playlist</Text>
                                </View>
                                <View style={{ flex: 0.4, marginHorizontal: '3%', borderWidth: 1, borderColor: this.state.aboutPlaylist == "" && this.state.validate == false ? "red" : "grey", borderRadius: 8, }}>
                                    <TextInput
                                        autoCorrect={false}
                                        returnKeyType={"done"}
                                        multiline={true}
                                        maxLength={60}
                                        selectionColor={colorLiteral.GREY}
                                        underlineColorAndroid={"transparent"}
                                        autoCapitalize={"none"}
                                        style={styles.email1}
                                        value={this.state.aboutPlaylist}
                                        onChangeText={aboutPlaylist => this.setState({ aboutPlaylist })}
                                        placeholder={"Playlist name"}
                                        placeholderTextColor={"grey"}

                                    />
                                </View>

                            </View>

                            <View style={{ flex: 0.25, alignItems: 'center', justifyContent: "center" }}>
                                <TouchableOpacity
                                    disabled={isLoading}
                                    style={styles.loginButton}
                                    onPress={() => {
                                        if (this.state.aboutPlaylist == "" && this.state.playlistname == "") {
                                            this.setState({ validate: false })
                                        } else {
                                            this.props.playlistaction(
                                                {
                                                    name: this.state.playlistname,
                                                    user_id: _id,
                                                    description: this.state.aboutPlaylist
                                                }
                                            )
                                        }

                                    }}>
                                    {isLoading ? <ActivityIndicator /> : <Text style={styles.loginText}>Create</Text>}
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                </Modal>
            </View>

        );
    }
}
function mapUser(state) {
    return {
        SelectUserNameReducer: state.SelectUserNameReducer,
        loginReducer: state.loginReducer,
        createPlaylistReducer: state.createPlaylistReducer,
        fetchPlaylistData: state.fetchPlaylistData
    };
}

export default connect(mapUser, { playlistaction, fetchPlaylist })(CreatePlaylist);
