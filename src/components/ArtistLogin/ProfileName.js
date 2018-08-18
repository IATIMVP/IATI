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
    StatusBar
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Icons from 'react-native-vector-icons/Entypo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorLiteral } from "../../constants/Color";
import { styles } from "../../styles/ArtistLoginStyles";
import NavigationBar from '../common/NavBar';
import YouTube from 'react-native-youtube';
import ImagePicker from 'react-native-image-crop-picker';
import OfflineNotice from "../common/OfflineNotice";
import ActionSheet from 'react-native-actionsheet';
import Permissions from 'react-native-permissions'
let checkCamera = null
let checkPhoto = null
const WINDOW = Dimensions.get("window");
class ProfileName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: "https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png",
            buttonAbled: false,
        };
        this.navigate = this.navigate.bind(this)
    }

    componentDidMount() {
        Permissions.checkMultiple(['camera', 'photo']).then(response => {
            this.setState({
                cameraPermission: response.camera,
                photoPermission: response.photo,
            })
        })
    }
    showActionsheet() {
        this.ActionSheet.show()
    }
    handleactionsheet(index) {



        if (index == 0) {
            Permissions.request('camera').then(response => {
                checkCamera = response
            })
            if (checkCamera === "authorized") {
                ImagePicker.openCamera({
                    cropping: true,
                    width: 500,
                    height: 500,
                    includeExif: true,
                    cropperCircleOverlay: true,
                }).then(image => {
                    this.setState({
                        image: { uri: image.path, width: image.width, height: image.height },
                        images: null,
                        avatarSource: image.path ? image.path : "https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png",
                        buttonAbled: true,
                    });
                }).catch(e => console(e));
            }
            else {
                Alert.alert(
                    'Can we access your camera?',
                    'We need access so you can set your profile pic',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Permission denied'),
                            style: 'cancel',
                        },
                        checkCamera == 'undetermined'
                            ? { text: 'OK', onPress: this._requestPermissionCamera }
                            :
                            { text: 'Open Settings', onPress: Permissions.openSettings },
                    ],
                )

            }

        }
        else if (index === 1) {
            Permissions.request('photo').then(response => {
                this.setState({ photoPermission: response })
            })
            if (this.state.photoPermission === "authorized") {
                ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                    cropperCircleOverlay: true,
                }).then(image => {
                    this.setState({
                        image: { uri: image.path, width: image.width, height: image.height },
                        images: null,
                        avatarSource: image.path,
                        buttonAbled: true,
                    });
                });
            }
            else {
                Alert.alert(
                    'Can we access your photos?',
                    'We need access so you can set your profile pic',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Permission denied'),
                            style: 'cancel',
                        },
                        this.state.photoPermission == 'undetermined'
                            ? { text: 'OK', onPress: this._requestPermissionPhoto }
                            :
                            { text: 'Open Settings', onPress: Permissions.openSettings },
                    ],
                )
                Permissions.request('camera').then(response => {
                    this.setState({ photoPermission: response })

                })
            }
        }
    }
    _requestPermissionCamera = () => {

        Permissions.request('camera').then(response => {
            checkCamera = response
            ImagePicker.openCamera({
                cropping: true,
                width: 500,
                height: 500,
                includeExif: true,
                cropperCircleOverlay: true,
            }).then(image => {
                console.log('received image', image);
                this.setState({
                    image: { uri: image.path, width: image.width, height: image.height },
                    images: null,
                    avatarSource: image.path ? image.path : "https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png",
                    buttonAbled: true,
                });
            }).catch(e => console(e));

        })
    }

    _requestPermissionPhoto = () => {

        Permissions.request('photo').then(response => {
            this.setState({ photoPermission: response })
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                cropperCircleOverlay: true,
            }).then(image => {
                this.setState({
                    image: { uri: image.path, width: image.width, height: image.height },
                    images: null,
                    avatarSource: image.path,
                    buttonAbled: true,
                });
            });
        })


    }

    handleSubmit() {
        if (this.state.buttonAbled === true) {
            Actions.MoreInfo({ image: this.state.avatarSource })
        }
    }
    navigate() {
        Actions.account()
    }

    _keyExtractor = (item, index) => item._id;
    render() {
        return (
            <KeyboardAwareScrollView scrollEnabled={false}
                keyboardShouldPersistTaps={Platform.OS === 'ios' ? 'never' : 'always'}
                contentContainerStyle={[styles.container, { backgroundColor: colorLiteral.WHITE }]} showsVerticalScrollIndicator={false}>
                <View style={[styles.container, { backgroundColor: colorLiteral.WHITE }]}>
                    <StatusBar
                        hidden={false}
                        backgroundColor={colorLiteral.STATUSBAR}
                        barStyle="dark-content"
                    />
                    <OfflineNotice />
                    <NavigationBar
                        backgroundColor={colorLiteral.WHITE}
                        title="Getting Started: IATI for Artists"
                        back
                        onLeftButtonPress={() => this.navigate()}
                    />
                    <View style={styles.selectProfileView}>
                        <Text style={styles.selectProfileText}>Select your profile image</Text>
                    </View>
                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        options={['Take Photo', 'Choose from Library', 'Cancel']}
                        cancelButtonIndex={2}
                        onPress={(index) => { this.handleactionsheet(index) }}
                    />
                    <View style={styles.pickImage}>
                        <View style={styles.pickerView}>
                            <TouchableOpacity style={{}}
                                onPress={() => this.showActionsheet()}
                            >
                                <Image
                                    style={[styles.logo, { opacity: null }]}
                                    source={{ uri: this.state.avatarSource }}
                                />
                                <View style={styles.addImage}>
                                    <Text style={styles.addImageText}>+</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomBar}>
                            <TouchableOpacity style={styles.infoStyle} onPress={() => Actions.MoreInfo()}>
                                <Text style={styles.skipText}>Skip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={this.state.buttonAbled ? false : true} style={[styles.loginButton, { backgroundColor: this.state.buttonAbled ? colorLiteral.BUTTON : "#af1a4e" }]}
                                onPress={() => this.handleSubmit()}>
                                <Text style={[styles.loginText, { color: this.state.buttonAbled ? colorLiteral.WHITE : "#d2d2d2" }]}> Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

function mapUser(state) {
    return {
    };
}

export default connect(mapUser)(ProfileName);