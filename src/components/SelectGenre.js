
import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    Dimensions, Image,
    TouchableHighlight,
    Alert,
    Platform,
    BackHandler,
    StatusBar
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { signup } from "../actions/SignupAction";
import { socialLogin } from "../actions/LoginAction";
import { genreData } from './../actions/GenreListActions';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import { styles } from "../styles/SelectGenreStyle";
import { colorLiteral } from "../constants/Color";
import OfflineNotice from "./common/OfflineNotice"
const WINDOW = Dimensions.get("window");
import { ifIphoneX } from 'react-native-iphone-x-helper'
class SelectGenre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            selectedGenres: 0,
            data: [],
            data1: [],
            tapped: false,
            tapButton: false,
            page: 1,
            datalength: 0,
            loadingList: false,
            loading: false,
            error: ''
        };
    }
    onSelect(index) {
        let arr = this.state.data1;
        arr[index].selected = !arr[index].selected;
        this.setState({
            data: arr
        });
        let selectedArr = []
        this.state.data.map((item, index) => {
            if (item.selected) {
                selectedArr.push(item);
            };
        });
        this.setState({
            selectedGenres: selectedArr.length,
            arraySel: selectedArr
        })
    }

    reset() {
        let arr = this.state.data1;
        let resetArray = [];
        arr.map((item, index) => {
            resetArray.push(item);
        })

        for (let i = 0; i < arr.length; i++) {
            arr[i].selected = false
            this.setState({
                data: arr
            })
        }
        this.setState({
            selectedGenres: 0,
            arraySel: []
        })

    }

    componentWillMount() {
        this.reset()
        dismissKeyboard()
        this.props.genreData(this.state.page)
        this.setState({ signinData: this.props.dataNext })
    }
    componentWillReceiveProps(nextProp) {
        if (nextProp.GenreListReducers.isLoading === true) {
            this.setState({
                loadingList: true
            });
        }
        if (nextProp.GenreListReducers.isLoading === false) {
            this.setState({
                loadingList: false
            });
        }
        if (nextProp.GenreListReducers.list_data) {
            this.setState({
                data1: JSON.parse(JSON.stringify(nextProp.GenreListReducers.list_data)),
                datalength: nextProp.GenreListReducers.list_data.length
            });
        }
        if (nextProp.signupReducer.loading === true) {
            this.setState({ loading: true })
        }
        if (nextProp.signupReducer.loading === true) {
            this.setState({ loading: true })
        }

    }

    _keyExtractor = (item, index) => item._id;


    showMore() {
        if (this.state.datalength === 36) {
            this.setState({ tapButton: true })
        }
        else {
            this.setState({ page: ++this.state.page })
            this.props.genreData(this.state.page, this.state.data1 ? this.state.data1 : '')
        }
    }
    onContinue() {
        if (this.state.selectedGenres < 3) {
            Alert.alert("Please select at least three or more genres. ")
        }
        else {
            let preferred_genre = this.state.arraySel
            if (this.props.dataNext.token !== '') {
                let inputData = {
                    age: this.props.dataNext.age,
                    gender: this.props.dataNext.gender,
                    email: this.props.dataNext.email,
                    password: this.props.dataNext.password,
                    name: this.props.dataNext.name,
                    file: this.props.dataNext.file,
                    username: this.props.dataNext.username,
                    preferred_genre: preferred_genre,
                    type: this.props.dataNext.type ? this.props.dataNext.type : '',
                    token: this.props.dataNext.token ? this.props.dataNext.token : '',
                    userId: this.props.dataNext.userId ? this.props.dataNext.userId : "",
                }
                this.props.socialLogin(inputData)
            }
            else {
                let inputData = {
                    age: this.props.dataNext.age,
                    gender: this.props.dataNext.gender,
                    email: this.props.dataNext.email,
                    password: this.props.dataNext.password,
                    name: this.props.dataNext.name,
                    file: this.props.dataNext.file,
                    username: this.props.dataNext.username,
                    preferred_genre: preferred_genre,
                    type: this.props.dataNext.type ? this.props.dataNext.type : '',
                }
                this.props.signup(inputData)
            }
        }
    }
    render() {
        return (
            <View style={styles.main}>
                <View style={styles.container}>
                    <StatusBar
                        hidden={false}
                        backgroundColor={colorLiteral.STATUSBAR}
                        barStyle="dark-content"
                    />
                    <OfflineNotice />
                    <TouchableOpacity style={{ flex: 0.1, ...ifIphoneX({ top: 0 }, { top: 0 }), left: 10 }} onPress={() => Actions.pop()}>
                        <Icon
                            name='ios-arrow-back'
                            size={30}
                        />
                    </TouchableOpacity>
                    <View style={styles.imageView}>
                        <Image
                            style={styles.imageStyle}
                            source={{ uri: this.state.signinData.file }}
                        />
                    </View>
                    <View style={styles.headView}>
                        <Text style={styles.headText}> I   A M   T H E   I N D U S T R Y</Text>
                    </View>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>Select three or more </Text>
                    <Text style={styles.text}>of your favorite genres.</Text>
                </View>
                <View style={styles.flatListView}>
                    {/* {this.state.loadingList === true ? <ActivityIndicator /> : */}
                    {this.state.loading === true ? <ActivityIndicator /> :
                        <FlatList
                            data={this.state.data1}
                            keyExtractor={this._keyExtractor.bind(this)}
                            numColumns={3}
                            extraData={this.state}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) =>
                                <View style={{ padding: '3%' }}>
                                    <TouchableHighlight
                                        underlayColor={"#ff4c8c"}
                                        onPress={() => this.onSelect(index)}
                                        style={{ backgroundColor: !item.selected ? colorLiteral.LIGHT_PINK : colorLiteral.DARK_PINK, elevation: 3, shadowOffset: { width: 1, height: 1 }, shadowOpacity: 0.6, borderRadius: WINDOW.width * 0.125, width: WINDOW.width * 0.25, height: WINDOW.width * 0.25, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={styles.genreView}>
                                            <Text style={{ color: item.selected ? colorLiteral.DULL_PINK : colorLiteral.WHITE, fontWeight: 'bold', fontSize: (Platform.OS === 'ios') ? WINDOW.width * 0.03 : WINDOW.width * 0.037, flexWrap: 'wrap', textAlign: 'center' }}>{item.name}</Text>
                                            {item.selected ?
                                                <View style={styles.onSelectView}>
                                                    <Image
                                                        source={require('../constants/Images/done-tick.png')}
                                                        style={styles.onSelectImageView}
                                                    />
                                                </View> : null}
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            }
                        />

                    }
                </View>

                {this.state.loadingList ?
                    <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator style={{ height: 40, width: 40 }} color={colorLiteral.BUTTON} />
                    </View>
                    :
                    <View style={styles.footerView}>

                        <TouchableOpacity onPress={() => this.reset()} style={styles.footerHead}>
                            <Text style={styles.footerText}>Reset</Text>
                        </TouchableOpacity>


                        {
                            !this.state.tapButton ?
                                <TouchableOpacity disabled={this.state.tapButton ? true : false} onPress={() => this.showMore()} style={styles.nextView}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Text style={styles.nextText}>Tap for More </Text>
                                        <View style={[styles.tapButton, { backgroundColor: colorLiteral.GREY }]}><Text style={styles.signText}>+</Text></View>
                                    </View>

                                </TouchableOpacity>
                                : null}
                        <TouchableOpacity onPress={() => this.onContinue()} style={styles.buttonView}>
                            {this.state.loading ? <ActivityIndicator /> :
                                <Text style={styles.footerText}>Continue ></Text>}
                        </TouchableOpacity>
                    </View>}
            </View >
        );
    }

}
const mapStateToProps = state => {
    return {
        signupReducer: state.signupReducer,
        GenreListReducers: state.GenreListReducers,
        checkuserReducer: state.checkuserReducer,

    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        signup,
        genreData,
        socialLogin,

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectGenre)