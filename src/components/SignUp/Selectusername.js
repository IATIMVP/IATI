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
    StatusBar
} from "react-native";
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { styles } from "../../styles/SelectusernameStyles";
const WINDOW = Dimensions.get("window");
import { colorLiteral } from "../../constants/Color";
import { socialLogin } from "../../actions/LoginAction";
import { selectuserName, setUserName } from "../../actions/SelectUserNameAction";
import OfflineNotice from "./../common/OfflineNotice";
import Icons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IIcon from 'react-native-vector-icons/Ionicons';;
import { ifIphoneX } from 'react-native-iphone-x-helper'

class SelectUsername extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.userChecked ? null : props.SelectUserNameReducer.userName ? props.SelectUserNameReducer.userName : "",
            namefill: false,
            emailFill: false,
            email: props.userChecked ? props.userChecked.email : '',
            isloading: false,
            disable: true,
            data: false,
            emailNotValid: false,
            emailfill: false,
            err: null,
            userName: '',
            editable: false

        };
    }
    componentDidMount() {
        if (this.props.userChecked && this.props.userChecked.email !== "") {
            this.setState({ editable: true })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.SelectUserNameReducer.selectdata) {

        }

        if (nextProps.SelectUserNameReducer.error) {

            this.setState({ err: nextProps.SelectUserNameReducer.error.data })
        }
        if (nextProps.SelectUserNameReducer.userName) {
            this.setState({ userName: nextProps.SelectUserNameReducer.userName })
        }
        if (nextProps.SelectUserNameReducer.isloading) {
            this.setState({ isloading: nextProps.SelectUserNameReducer.isloading })
        } else {
            this.setState({ isloading: nextProps.SelectUserNameReducer.isloading })
        }

    }
    referesh() {
        this.setState({ username: null })
    }
    componentWillMount() {

        if (this.props.userChecked) {
            this.setState({ emailFill: true, userChecked: this.props.userChecked })
        }
    }
    usernamechange(username) {
        this.props.selectuserName(username, "username")
        if (username === "") {
            this.setState({ username: username, disable: true })
        }
        else {
            this.setState({ username: username, disable: false, namefill: false })
            this.props.setUserName(username)
        }

    }
    submitChange(username) {

    }
    emailchange(email) {

        if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.state.email)) {
            this.setState({ emailNotValid: true, email })
        }
        else {
            this.props.selectuserName(email, "email")
            this.setState({ email: email, emailNotValid: false })

        }
    }
    submit() {

        if (this.state.username === '') {
            this.setState({ namefill: true })
        }

        else if (this.props.data) {
            this.setState({ namefill: false })
            let datachange = {
                "email": this.props.data.email,
                "password": this.props.data.password,
                "name": this.props.data.name,
                "file": this.props.data.file,
                "username": this.state.username,
                "type" : this.props.data.loginType
            }
            Actions.SignupInfo({ data: datachange })


        }
        else {
            if (this.state.email === '') {
                this.setState({ emailfill: true })
            }
            else if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.state.email)) {
                this.setState({ emailNotValid: true })
            }
            else {
                this.setState({ emailfill: false })
                let datachange = {
                    "file": this.state.userChecked.file,
                    "email": this.state.email,
                    "name": this.state.userChecked.name,
                    "token": this.state.userChecked.token,
                    "username": this.state.username,
                    "type": this.state.userChecked.type,
                    "userId": this.state.userChecked.userId,
                }
                Actions.SignupInfo({ data: datachange })
            }

        }

    }
    render() {
        let { selectdata,
            error,
            isloading,
            type, } = this.props.SelectUserNameReducer

        return (
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={Platform.OS === 'ios' ? 'never' : 'always'}
                contentContainerStyle={styles.container}>
                <View style={styles.container}>
                    <StatusBar
                        hidden={false}
                        backgroundColor={colorLiteral.STATUSBAR}
                        barStyle="dark-content"
                    />
                    <OfflineNotice />
                    <TouchableOpacity style={{ flex: 0.1, ...ifIphoneX({ top: 40 }, { top: 20 }), left: 10 }} onPress={() => Actions.pop()}>
                        <IIcon
                            name='ios-arrow-back'
                            size={30}
                        />
                    </TouchableOpacity>
                    <View style={styles.textView}>
                        <Text style={styles.darkText}>Select a Username</Text>
                        <Text style={styles.headertext}>Choose a username for your account.</Text>
                        <Text style={styles.headertext}>You can always change it later.</Text>

                    </View>

                    <View style={styles.body}>

                        {
                            this.state.emailFill ?
                                <View style={{ flex: 0.23 }}>
                                    <View style={styles.viewStyle}>
                                        <TextInput
                                            editable={this.state.editable ? false : true}
                                            autoCapitalize={"none"}
                                            autoCorrect={false}
                                            keyboardType={"email-address"}
                                            underlineColorAndroid={"transparent"}
                                            placeholderTextColor={colorLiteral.GREY}
                                            selectionColor={colorLiteral.GREY}
                                            style={styles.ageStyle}
                                            value={this.state.email}
                                            onChangeText={email => this.emailchange(email)}
                                            placeholder="email"
                                        />
                                    </View>
                                    {
                                        this.state.emailNotValid && this.state.email.length >= 1 ?
                                            <View style={{ flex: 0.02, alignItems: 'flex-end' }}>
                                                <Text st yle={{ color: colorLiteral.BUTTON, marginRight: '3%' }}>Email not valid</Text>
                                            </View>
                                            :
                                            type === "email" && error && error.status === 200 && this.state.email.length >= 1 ?
                                                <View style={{ flex: 0.02, alignItems: 'flex-end' }}>
                                                    <Text style={{ color: colorLiteral.BUTTON, marginRight: '3%' }}>Email already exists</Text>
                                                </View>
                                                :
                                                this.state.emailfill ?
                                                    <View style={{ flex: 0.02, alignItems: 'flex-end' }}>
                                                        <Text style={{ color: colorLiteral.BUTTON, marginRight: '3%' }}>Please enter email</Text>
                                                    </View>
                                                    :
                                                    null
                                    }
                                    <View style={styles.viewStyle1}>
                                        <TextInput
                                            autoCapitalize={"none"}
                                            autoCorrect={false}
                                            returnKeyType={"done"}
                                            underlineColorAndroid={"transparent"}
                                            placeholderTextColor={colorLiteral.GREY}
                                            selectionColor={colorLiteral.GREY}
                                            style={styles.ageStyle}
                                            value={this.state.username}
                                            onChangeText={username => this.usernamechange(username)}
                                            placeholder="username"
                                        // onEndEditing={() => { this.submit() }}
                                        />
                                    </View>

                                    {
                                        this.state.disable ? null :
                                            <View style={{ position: "absolute", top: "70%", right: "20%" }}>
                                                {isloading && type === "username" ? <ActivityIndicator /> : selectdata && selectdata.status === 201 && type === "username" ? <Icons name="check" size={25} color={"#0b60e8"} /> : this.state.username.length <= 1 ? null : null}
                                            </View>}
                                    <TouchableOpacity onPress={() => this.referesh()} style={{ position: "absolute", top: "70%", right: "8%" }}>
                                        <Icon name="refresh" size={25} color={colorLiteral.LIGHTGREY} />
                                    </TouchableOpacity>
                                    {type == "username" && error && error.status === 200 && this.state.username && this.state.username.length > 1 ? <View style={{ flex: 0.02, alignItems: 'flex-end' }}><Text style={{ color: colorLiteral.BUTTON, marginRight: '3%' }}>User already exist</Text></View> : this.state.namefill ? <View style={{ flex: 0.02, alignItems: 'flex-end' }}><Text style={{ color: colorLiteral.BUTTON, marginRight: '3%' }}>Please enter username</Text></View> : null}
                                </View>
                                :
                                <View style={{ flex: 0.15 }}>
                                    <View style={styles.viewStyle3}>
                                        <TextInput
                                            autoCapitalize={"none"}
                                            autoCorrect={false}
                                            returnKeyType={"done"}
                                            underlineColorAndroid={"transparent"}
                                            placeholderTextColor={"grey"}
                                            selectionColor={colorLiteral.GREY}
                                            style={styles.ageStyle}
                                            value={this.state.username}
                                            onChangeText={username => this.usernamechange(username)}
                                            placeholder="username"
                                            onEndEditing={() => this.submitChange()}

                                        />
                                    </View>

                                    {this.state.disable ? null :
                                        <View style={{ position: "absolute", top: "45%", right: "20%" }}>
                                            {isloading ? <ActivityIndicator /> : selectdata && selectdata.status === 201 && type === "username" && !error ? <Icons name="check" size={25} color={"#0b60e8"} /> : this.state.username && this.state.username.length === 0 ? null : null}
                                        </View>}
                                    <TouchableOpacity onPress={() => this.referesh()} style={{ position: "absolute", top: "45%", right: "8%" }}>
                                        <Icon name="refresh" size={25} color={colorLiteral.LIGHTGREY} />
                                    </TouchableOpacity>
                                    {type == "username" && error && error.status === 200 && this.state.username && this.state.username.length > 1 ? <View style={{ flex: 0.02, alignItems: 'flex-end' }}><Text style={{ color: colorLiteral.BUTTON, marginRight: '3%' }}>User already exist</Text></View> : this.state.namefill ? <View style={{ flex: 0.02, alignItems: 'flex-end' }}><Text style={{ color: colorLiteral.BUTTON, marginRight: '3%' }}>Please enter username</Text></View> : null}
                                </View>}
                        <View style={{ flex: 0.06 }}></View>
                        <TouchableOpacity disabled={error && error.status === 200 || this.state.namefill || this.state.emailfill || this.state.emailNotValid} onPress={() => this.submit()} style={styles.btntext}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>

                    </View>
                </View >
            </KeyboardAwareScrollView >
        );
    }
}
function mapUser(state) {
    return {
        SelectUserNameReducer: state.SelectUserNameReducer
    };
}

export default connect(mapUser, { socialLogin, selectuserName, setUserName })(SelectUsername);
