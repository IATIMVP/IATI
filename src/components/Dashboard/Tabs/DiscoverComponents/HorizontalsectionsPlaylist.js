import * as React from "react";


import { Actions } from 'react-native-router-flux';

import {
    StyleSheet,
    Text, TextInput,
    View, TouchableOpacity, ScrollView,
    NativeModules, Dimensions, StatusBar,
    FlatList, ActivityIndicator, Alert,
    Image
} from 'react-native';
import { colorLiteral } from "./../../../../constants/Color"
import Icon from 'react-native-vector-icons/EvilIcons';
import HeartIcon from 'react-native-vector-icons/Entypo';
import ChatIcon from 'react-native-vector-icons/SimpleLineIcons';
import FriendIcon from 'react-native-vector-icons/Entypo';




const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

class HorizontalsectionsPlaylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recentSpotters: []

        };
    }
    componentWillMount() {
        console.log("this.props.data", this.props.data)
        this.setState({ recentSpotters: this.props.data })
    }
    componentWillReceiveProps(nextProps) {


    }




    _keyExtractor = (item, index) => item.id;

    //     renderitem = (item, index) => {
    // console.log("itemitem",item)
    // console.log("index",index)

    //        return 
    //        ( )
    //     }
    render() {

        if (this.state.recentSpotters.length === 0) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>No Data Found!</Text>
                </View>
            )
        } else {
            return (

                <View style={styles.container}>
                    <FlatList
                     contentContainerStyle={{paddingLeft: '4%'}}
                        data={this.state.recentSpotters}
                        keyExtractor={this._keyExtractor}
                        horizontal={true}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity
                                onPress={() => Actions.PlaylistDetails({ data: item })}
                                style={{
                                    flex: 1,
                                  
                                    width: WINDOW_WIDTH / 1.7,
                                    marginRight: 10,
                                    marginVertical: 10
                                }}>
                                {item && item.music && item.music.length <= 1 ?
                                    <View style={{ flex: 0.8, flexDirection: "row", borderWidth: 3, borderColor: '#dadada' }} >

                                        <Image
                                            source={item && item.music && (item.music.length > 0 && item.music[0].image) ? { uri: item.music[0].imag } : require("./../../../../constants/Images/noImage.png")}
                                            style={{ width: "100%", height: "100%"}}
                                        />
                                    </View> :
                                    <View style={{ flex: 0.8, flexDirection: "row", borderWidth: 3, borderColor: '#dadada' }} >
                                        <View style={{ flex: 0.5, flexDirection: "column" }} >
                                            <View style={{ flex: 0.5, flexDirection: "column" }} >

                                                <Image
                                                    source={item && item.music && (item.music.length > 0 && item.music[0].image) ? { uri: item.music[0].imag } : require("./../../../../constants/Images/noImage.png")}
                                                    style={{ width: "100%", height: "100%"}}
                                                />

                                            </View>
                                            <View style={{ flex: 0.5, flexDirection: "column" }} >
                                                <Image
                                                    source={item && item.music && (item.music.length > 1 && item.music[1].image) ? { uri: item.music[1].imag } : require("./../../../../constants/Images/noImage.png")}
                                                    style={{ width: "100%", height: "100%"}}
                                                />
                                            </View>

                                        </View>
                                        <View style={{ flex: 0.5, flexDirection: "column" }} >
                                            <View style={{ flex: 0.5, flexDirection: "column" }} >
                                                <Image
                                                    source={item && item.music && (item.music.length > 2 && item.music[2].image) ? { uri: item.music[2].imag } : require("./../../../../constants/Images/noImage.png")}
                                                    style={{ width: "100%", height: "100%" }}
                                                />
                                            </View>
                                            <View style={{ flex: 0.5, flexDirection: "column" }} >
                                                <Image
                                                    source={item && item.music && (item.music.length > 3 && item.music[3].image) ? { uri: item.music[3].imag } : require("./../../../../constants/Images/noImage.png")}
                                                    style={{ width: "100%", height: "100%"}}
                                                />
                                            </View>
                                        </View>
                                    </View>}


                                <View style={{ flex: 0.2 }} >
                                    <View style={{ flex: 0.6, flexDirection: "column" }}>
                                        <Text style={{ color: "black", fontSize: WINDOW_WIDTH / 25 }}>{item.name}</Text>
                                        <Text style={{ color: "grey", fontSize: WINDOW_WIDTH / 30 }}>{item.description ? item.description : item.name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                        showsHorizontalScrollIndicator={false}
                    />

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
export default HorizontalsectionsPlaylist;
