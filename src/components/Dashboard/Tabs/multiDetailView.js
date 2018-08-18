import React, { Component } from "react";
import {
    Text,
    View,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView,
    ActivityIndicator,
    Image,
    Alert
} from "react-native";
const WINDOW = Dimensions.get("window");
import { colorLiteral } from "../../../constants/Color";
import { styles } from "../../../styles/SearchStyles";
import OfflineNotice from "./../../common/OfflineNotice";
import { Actions, ActionConst } from "react-native-router-flux";
import NavigationBar from '../../common/NavBar';
import { getSuggestions } from "./../../../actions/SearchGroup/getSuggestions"
import { connect } from "react-redux";
import { getDetails } from "./../../../actions/SearchGroup/getDataList"
// import SearchBar from 'react-native-searchbar';
import Icon from 'react-native-vector-icons/Ionicons';
// import { SearchBar } from 'react-native-elements';
import DataList from "./DiscoverComponents/DataList"
class multiDetailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchBar: true,
            searchData: '',
            showSuggestionList: false,
            renderList: true,

        }
    }
    componentWillMount(){
      
        Actions.refresh({title: this.props.data.type})
    }
    componentDidMount() {
        
        let { _id } = this.props.loginReducer.loginData.data

    }
   
    _keyExtractor = (item, index) => item.id;



    render() {
        console.log("this.props.data", this.props.data)
        return (
            <View style={styles.main}>
                <StatusBar
                    hidden={false}
                    backgroundColor={colorLiteral.STATUSBAR}
                    barStyle="dark-content"
                />
                <ScrollView
                    keyboardShouldPersistTaps={"handled"}
                    ref='_scrollView'

                    style={{ flex: 1, backgroundColor: 'white', height: 100 }}>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: "18%" }}>
                        {this.state.loadingMode ?
                            <View style={{ flex: 1, height: WINDOW_HEIGHT / 3, alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator color='black' size='large' />
                            </View>
                            :
                            <DataList
                                data={this.props.data.data}
                              
                            />}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

function mapUser(state) {
    return {
        loginReducer: state.loginReducer,
        getSuggestionsList: state.getSuggestionsList,
        getDataList: state.getDataList
    };
}

export default connect(mapUser, { getSuggestions, getDetails })(multiDetailView);