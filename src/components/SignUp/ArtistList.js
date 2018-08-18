
import React, { Component } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    AsyncStorage,
    Slider,
    FlatList,
    ActivityIndicator,
    StatusBar,
  Alert

} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { styles } from "./../../styles/ArtistListStyle";
import { followArtist, signup } from "./../../actions/SignupAction";
import { colorLiteral } from "./../../constants/Color";
import ActionSheet from 'react-native-actionsheet'
import { getArtistList } from "./../../actions/SignupAction";
import NavigationBar from "../common/NavBar";
import config from "../../config";
const WINDOW = Dimensions.get("window");

class ArtistList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalArtists: 100,
            user_id: "",
            loading: true,
            artistsArray: [],
            followedListArray: [],
            followAll: false,
            currentId:""
        };
    }
    componentWillMount() {
        let input = {};
        AsyncStorage.getItem("asyncLoginData").then((value) => {
            if (value) {
                let obj = JSON.parse(value)
                input.userId = obj.data._id;
                this.setState({ user_id: obj.data._id })
                this.props.getArtistList(input);
            }
        })
    }

    componentWillReceiveProps(nextProp) {
        if (nextProp.signupReducer.artistList.length) {
            this.setState({
                loading: false,
                totalArtists: nextProp.signupReducer.artistList.length,
                artistsArray: nextProp.signupReducer.artistList
            })
        }
        if(nextProp.signupReducer.followed){
            Actions.dashboard()
        }
    }

    addToFollowedList = (id) => {

        let arr = this.state.followedListArray;
        if (arr.length === 0) {
            arr.push(id);
        } else {
            if (arr.includes(id)) {
                arr.splice(arr.indexOf(id), 1);
            } else {
                arr.push(id)
            }
        }
        this.setState({
            followedListArray: arr
        })

        if (this.state.followedListArray.length === this.state.totalArtists) {
            this.setState({
                followAll: true
            })
        } else {
            this.setState({
                followAll: false
            })
        }
    }

    followAll = () => {
        let arr = [];
        if(!this.state.followAll){
            this.state.artistsArray.map((item, index) => {
                arr.push(item._id);
            })
            console.log("arr : ", arr)
            this.setState({
                followedListArray: arr,
                followAll: !this.state.followAll
            })
        }else{
            this.setState({
                followedListArray : [],
                followAll:false
            })
        }
    }

    askToUnfollow = (id) =>{
        this.setState({
            currentId : id
        })
        this.ActionSheet.show();
    }

    takeAction = (i) =>{
        if(i === 0){
            this.addToFollowedList(this.state.currentId)
        }
    }

    done = () =>{
        let input = {};
        input.user_id = this.state.user_id;
        input.artist = JSON.stringify(this.state.followedListArray);
        this.props.followArtist(input);
    }

    confirmToSkip = () =>{
        Alert.alert(
            'Skip ?','',
            [
              { text: 'Yes', onPress: () => Actions.dashboard() },
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'danger' },
            ],
            { cancelable: false }
          )
    }
    _renderitem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.artistImage}
                    source={{ uri: config.serverSideUrl + ":" + config.port + item.picture }}
                />
            </View>
            <View style={styles.artistContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.genre}>{item.preferred_genre[0]}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={this.state.followedListArray.includes(item._id) ? styles.selectedButton: styles.button}
                    onPress={() => this.state.followedListArray.includes(item._id) ? this.askToUnfollow(item._id) : this.addToFollowedList(item._id)}
                >
                    <Text style={this.state.followedListArray.includes(item._id) ? styles.selectedButtonText : styles.buttonText}>{this.state.followedListArray.includes(item._id) ? "Following" : "Follow"}</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
    _keyExtractor = (item) => item.id;
    _renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.totalArtistContainer}>
                <Text style={styles.name}>{this.state.totalArtists} {this.state.totalArtists === 1 ? "artist" : "artists"}</Text></View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={this.state.followAll === true ? styles.selectedButton : styles.button}
                    onPress={() => this.followAll()}
                >
                    <Text style={this.state.followAll ? styles.selectedButtonText : styles.buttonText}>{ this.state.followAll ? "Unfollow all" : "Follow all"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    render() {
        return (
            <View style={styles.container}>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Unfollow ?'}
                    options={['Confirm', 'cancel']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={(index) => {this.takeAction(index) }}
                />
                <StatusBar
                    hidden={false}
                    backgroundColor={colorLiteral.STATUSBAR}
                    barStyle="dark-content"
                />
                <NavigationBar
                    backgroundColor={colorLiteral.WHITE}
                    title="Artists"
                    rightButtonText={this.state.followedListArray.length > 0 ? "Done" : null}
                    rightLoading={this.props.signupReducer.followLoading}
                    leftButtonText="Skip"
                    onRightButtonPress={() =>this.done()}
                    onLeftButtonPress={() =>this.confirmToSkip()}
                />
                <View style={styles.pageIntro}>
                    <Text style={styles.h1}>Personalize your feed</Text>
                    <Text style={styles.h2}>Follow people from the suggestions below tailored just for you.</Text>
                </View>
                {this.state.loading ?
                    <View style={{ flex: 1 }}>
                        <ActivityIndicator color={colorLiteral.BUTTON} />
                        <Text style={styles.h2}>  Loading Artists..</Text>
                    </View> : <FlatList
                        style={styles.artistList}
                        data={this.state.artistsArray}
                        renderItem={this._renderitem}
                        extraData={this.state}
                        ListHeaderComponent={this._renderHeader}
                        keyExtractor={this._keyExtractor}
                    />}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        signupReducer: state.signupReducer,
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        followArtist,
        getArtistList
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList)
