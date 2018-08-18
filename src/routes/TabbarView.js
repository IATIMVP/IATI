import React, { Element } from "react";
import { Scene } from "react-native-router-flux";
import { Image, View, Text, AsyncStorage, Dimensions } from "react-native";
import CreatePost from "./CreatePost";
import Home from "./../components/Dashboard/Tabs/Home";
import AddSubscription from "./../components/Dashboard/Tabs/AddSubscription";
import Account from "./../components/Dashboard/Tabs/Account";
import Notifications from "./../components/Dashboard/Tabs/Notifications";
import Search from "./../components/Dashboard/Tabs/Search";
import ArtistLogin from "./ArtistLogin";
import SearchComponent from "../components/SearchComponent/SearchComponent";
import ArtistEditSubscription from "./ArtistEditSubscription";
const WINDOW = Dimensions.get("window");
import DiscoverArtist from "./../components/Dashboard/Tabs/DiscoverArtist"

import { ifIphoneX } from 'react-native-iphone-x-helper';
import { colorLiteral } from "../constants/Color";

class TabIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userImage: '',
            name: '',
            value: true
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('asyncLoginData').then((asyncLoginData) => {
            let logindata = JSON.parse(asyncLoginData)
            if (logindata) {
                this.setState({
                    logindata: logindata,
                    name: logindata.data.name,
                    userImage: "http://52.34.207.5" + ":4173" + logindata.data.picture,
                    username: logindata.data.username
                })
            }
        }
        )
    }

    render(): Element<*> {
        return (
            this.props.iconName === "account" ?
                <View style={{ width: WINDOW.width * 0.12, ...ifIphoneX({ height: WINDOW.width * 0.12 }, { height: WINDOW.width * 0.12 }), ...ifIphoneX({ bottom: 9 }, { bottom: 0 }), borderColor: "#4a4b4c", borderWidth: this.props.selected ? 1 : 0, borderRadius: WINDOW.width * 0.06, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={{ uri: this.state.userImage }}
                        style={{
                            height: WINDOW.width * 0.1,
                            width: WINDOW.width * 0.1,
                            borderRadius: WINDOW.width * 0.05,
                            borderColor: "#4a4b4c",
                            backgroundColor:colorLiteral.VERYLIGHT_GREY
                        }}
                    />

                </View>
                :
                <View style={{ height: WINDOW.width * 0.12, backgroundColor: 'white', width: WINDOW.width * 0.16, ...ifIphoneX({ height: WINDOW.width * 0.14 }, { height: WINDOW.width * 0.12 }), ...ifIphoneX({ bottom: 9 }, { bottom: 0 }), justifyContent: "center", alignItems: 'center', borderTopWidth: this.props.selected ? 4 : 0, borderColor: "#4a4b4c" }}>
                    <Image
                        style={
                            this.props.iconName === "addsubsc" ?
                                { height: 20, width: 35, tintColor: this.props.selected ? "#4a4b4c" : "#a2a2a2" } :
                                { height: 23, width: 23, tintColor: this.props.selected ? "#4a4b4c" : "#a2a2a2" }}
                        source={this.props.iconName === "hooome" ? require('../constants/Images/tabImages/home.png') :
                            this.props.iconName === "search" ? require('../constants/Images/tabImages/search.png') :
                                this.props.iconName === "addsubsc" ? require('../constants/Images/tabImages/subscription.png') :
                                    this.props.iconName === "notifications" ? require('../constants/Images/tabImages/notification.png') :
                                        null
                        }
                    />
                </View>
        );
    }
}


export default TabbarView = (
    <Scene key='dashboard'
    
        tabs
        type="reset"
        tabBarStyle={{ backgroundColor: 'white' }}
        showLabel={false}
        lazy={true}
        tabBarSelectedItemStyle={{}}
    >
        <Scene key="home" component={Home}
              
            hideNavBar={true}
            lazy={true}
            title=""
            icon={TabIcon}
            iconName="hooome"
            navigationBarStyle={{ backgroundColor: '#ffffff' }}
        >
      
        </Scene>
        
        <Scene key="search" component={Search}
        
            hideNavBar={true}
            title=""
            lazy={true}
            icon={TabIcon}
            iconName="search"
            navigationBarStyle={{ backgroundColor: '#FFFFFF' }}>
        </Scene>
        <Scene key="SearchComponent"
            component={SearchComponent}
            hideNavBar={true} />
        <Scene key="addsubsc" component={AddSubscription}
            hideNavBar={true}
            title=""
            lazy={true}
            icon={TabIcon}
            iconName="addsubsc"
            navigationBarStyle={{ backgroundColor: '#FFFFFF' }}>
        </Scene>
        <Scene key="notifications" component={Notifications}
            hideNavBar={true}
            title=""
            lazy={true}
            icon={TabIcon}
            iconName="notifications"
            navigationBarStyle={{ backgroundColor: '#FFFFFF' }}
        />
        <Scene key="account" component={Account}
            hideNavBar={true}
            title=""
            lazy={true}
            icon={TabIcon}
            iconName="account"
            hideNavBar
        >
        </Scene>
      
        {ArtistEditSubscription}
        {ArtistLogin}
        {CreatePost}
      
    </Scene>

);
