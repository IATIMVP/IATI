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
    FlatList,
    StatusBar
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Entypo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorLiteral } from "../../constants/Color";
import { styles } from "../../styles/ArtistLoginStyles";
import NavigationBar from '../common/NavBar';
import ImagePicker from "react-native-image-picker";
import RoundCheckbox from 'rn-round-checkbox';
import { setLevel } from "../../actions/ArtistLoginAction/SetLevelAction"
import OfflineNotice from "../common/OfflineNotice";

const WINDOW = Dimensions.get("window");
class SubLevel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id: 1,
                    isSelected: false,
                    name: "Per Month",
                    description: 'Your subscribers will be charged for every month regardless of how many posts you create'
                },
                {
                    id: 2,
                    isSelected: false,
                    name: "Per Album",
                    description: 'Your subscribers will be charged each time you post an album'
                },
                {
                    id: 3,
                    isSelected: false,
                    name: "Per Single",
                    description: 'Your subscribers will be charged each time you post an single'
                },
                {
                    id: 4,
                    isSelected: false,
                    name: "Per EP",
                    description: 'Your subscribers will be charged each time you post an EP'
                },
                {
                    id: 5,
                    isSelected: false,
                    name: "Per Video",
                    description: 'Your subscribers will be charged each time you post an video'
                },
                {
                    id: 6,
                    isSelected: false,
                    name: "Per Post",
                    description: 'Your subscribers will be charged each time you create any kind of post,(i.e episode, single, album, etc)'
                }
            ],
            selected: 0
        };
    }
    componentDidMount() {
    }
    componentWillReceiveProps() { }
    handleSubmit() { }

    _keyExtractor = (item, index) => item.id;
    renderList({ item, index }) {
        return (
            <View style={[styles.listStyle]}>
                <View style={styles.subListStyle}>
                    <Text style={styles.type}>{item.name}</Text>
                    <Text style={styles.type1}>{item.description}</Text>
                </View>
                <View style={styles.selectSubStyle}>
                    <RoundCheckbox
                        size={35}
                        iconColor={colorLiteral.BUTTON}
                        borderColor={this.props.checked ? colorLiteral.BUTTON : colorLiteral.BUTTON}
                        backgroundColor='white'
                        checked={this.state.selected === item.id ? true : false}
                        onValueChange={() => {
                            this.setState({
                                selected: item.id,
                            }), this.props.setLevel(item), Actions.pop()
                        }
                        }
                    />
                </View>
            </View>
        );
    }
    render() {
        return (
            <KeyboardAwareScrollView scrollEnabled={false}
                keyboardShouldPersistTaps={Platform.OS === 'ios' ? 'never' : 'always'}
                contentContainerStyle={[styles.container, { backgroundColor: !this.state.openModal ? colorLiteral.WHITE : "rgba(130, 130, 130, 0.5)" }]} showsVerticalScrollIndicator={false}>
                <View style={[styles.container, { backgroundColor: !this.state.openModal ? colorLiteral.WHITE : "rgba(130, 130, 130, 0.5)" }]}>
                    <StatusBar
                        hidden={false}
                        backgroundColor={colorLiteral.STATUSBAR}
                        barStyle="dark-content"
                    />
                    <OfflineNotice />
                    <NavigationBar
                        backgroundColor={!this.state.openModal ? colorLiteral.WHITE : "rgba(130, 130, 130, 0.5)"}
                        title="How will subscribers be charged ?"
                        back
                        onLeftButtonPress={() => Actions.pop()}
                    />
                    <FlatList
                        data={this.state.data}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor.bind(this)}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => this.renderList({ item, index })
                        }
                    />
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

function mapUser(state) {
    return {

    };
}

export default connect(mapUser, { setLevel })(SubLevel);