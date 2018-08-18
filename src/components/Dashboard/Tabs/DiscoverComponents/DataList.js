


import * as React from "react";
import { Actions } from 'react-native-router-flux';

import {
    StyleSheet,Image,
    Text, TextInput,
    View, TouchableOpacity, ScrollView,
    NativeModules, Dimensions, StatusBar,
    FlatList, ActivityIndicator, Alert
} from 'react-native';
// import { SERVER_URL } from './../../../utils/types';
// import Image from 'react-native-image-progress';
import Icon from 'react-native-vector-icons/EvilIcons';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
import HeartIcon from 'react-native-vector-icons/Entypo';
import ChatIcon from 'react-native-vector-icons/SimpleLineIcons';
import FriendIcon from 'react-native-vector-icons/Entypo';
import { colorLiteral } from "./../../../../constants/Color"

class DataList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Spotters: [],
            userData: {},
            startDate: '',
            endDate: '',
        };
    }

    _keyExtractor = (item, index) => item._id;

    _renderItem = ({ item, index }) => {
        console.log("{ item, index }, type", item, index)
        return (

            <View
                style={{ flexDirection: 'column', padding: 8, }}>
                <TouchableOpacity style={{
                    height: WINDOW_HEIGHT / 3.7,
                    //  width:WINDOW_WIDTH/2.3,
                    //backgroundColor: "red",
                    alignItems: 'center',
                    justifyContent: 'center'

                }}>

                    <View style={{ borderWidth: 2, borderColor: '#dadada' }} >
                        <Image
                            source={item && item.icon ? { uri: item.icon } : require("./../../../../constants/Images/noImage.png")}
                            style={{ width: 150, height:150 , borderRadius: 6 }}
                        />
                    </View>


                </TouchableOpacity>
                <View style={{ width: WINDOW_WIDTH / 2.3, }}>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={{ color: "black", fontSize: WINDOW_WIDTH / 25 }}>{item.title}</Text>
                        <Text style={{ color: "grey", fontSize: WINDOW_WIDTH / 30 }}>{item.description}</Text>
                    </View>

                    <View style={{ flex: 0.4, flexDirection: "row" }}>
                        <View style={{ flex: 0.333, flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>

                            <Text style={{ color: "grey", fontSize: WINDOW_WIDTH / 30 }}><HeartIcon name="heart" size={WINDOW_WIDTH / 33} color={colorLiteral.BUTTON} /> {item.likes_count ? item.likes_count : 0}</Text>
                        </View>
                        <View style={{ flex: 0.333, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                            <Text style={{ color: "grey", fontSize: WINDOW_WIDTH / 30 }}><ChatIcon name="bubble" size={WINDOW_WIDTH / 33} color={colorLiteral.BUTTON} /> {item && item.comments ? item.comments.length : 0}</Text>
                        </View>
                        <View style={{ flex: 0.333, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                            <Text style={{ color: "grey", fontSize: WINDOW_WIDTH / 30 }}><FriendIcon name="users" size={WINDOW_WIDTH / 33} color={colorLiteral.BUTTON} /> 0</Text>
                        </View>
                    </View>
                </View>
            </View>
        )

    }

    render() {
        if (this.props.data.length === 0) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{color:"red"}}>No Records!</Text>
                </View>
            )
        }
        else {
            return (

                <View style={styles.container}>
                    <FlatList style={{
                        flex: 1
                    }}
                        data={this.props.data}
                        keyExtractor={this._keyExtractor}
                        scrollEnabled={false}
                        renderItem={this._renderItem}
                        numColumns={2}
                        showsVerticalScrollIndicator={false} />
                </View>
            );
        }
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});
export default DataList;
