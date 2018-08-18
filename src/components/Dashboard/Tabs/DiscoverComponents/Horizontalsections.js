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

class Horizontalsections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: []

        };
    }
    componentWillMount() {
        console.log("this.props.data", this.props.data)
        this.setState({ Data: this.props.data })
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
console.log("this.state.Data hiiiteeesssh",this.state.Data)
        if (this.state.Data.length === 0) {
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
                        data={this.state.Data}
                        keyExtractor={this._keyExtractor}
                        horizontal={true}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity
                                style={{
                                     flex: 1,
                                    width: WINDOW_WIDTH / 2.3,
                                    marginRight: 10,
                                    marginVertical: 10,
                                 }}>
                                <View style={{ flex: 0.7,borderWidth: 3, borderColor: '#dadada' }} >
                                    <Image
                                        source={item && item.icon ? {uri:item.icon} : require("./../../../../constants/Images/noImage.png")}
                                        style={{ width: "100%",height:"100%", borderRadius: 6 }}
                                    />
                                </View>
                                <View style={{ flex: 0.3}} >
                                    <View style={{ flex: 0.65, flexDirection: "column" }}>
                                        <Text style={{ color: "black", fontSize: WINDOW_WIDTH / 25 ,marginTop:"4%"}}>{item.title}</Text>
                                        <Text style={{ color: "grey", fontSize: WINDOW_WIDTH / 30 }}>{item.description ?item.description.slice(0, 20) + '...':null}</Text>
                                    </View>

                                    <View style={{ flex: 0.35, flexDirection: "row"}}>
                                        <View style={{ flex: 0.333, flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>

                                            <Text style={{ color: "grey", fontSize: WINDOW_WIDTH / 33 }}><HeartIcon name="heart" size={WINDOW_WIDTH / 25} color={colorLiteral.BUTTON} /> { item.likes_count? item.likes_count: 0}</Text>
                                        </View>
                                        <View style={{ flex: 0.333, flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>

                                            <Text style={{ color: "grey", fontSize: WINDOW_WIDTH / 33 }}><ChatIcon name="bubble" size={WINDOW_WIDTH / 25} color={colorLiteral.BUTTON} /> { item && item.comments?item.comments.length: 0}</Text>
                                        </View>
                                        <View style={{ flex: 0.333, flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>

                                            <Text style={{ color: "grey", fontSize: WINDOW_WIDTH / 33 }}><FriendIcon name="users" size={WINDOW_WIDTH / 25} color={colorLiteral.BUTTON} /> 0</Text>
                                        </View>
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
export default Horizontalsections;
