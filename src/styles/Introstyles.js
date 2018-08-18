import {
    StyleSheet,
    Dimensions,
    Platform
} from "react-native";
import { colorLiteral } from "../constants/Color";
const WINDOW = Dimensions.get("window");

export const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    header: {
        flex:1,
        width: WINDOW.width,
        height: WINDOW.height / 3
    },
    maincontainer:{ flex: 0.33,backgroundColor:'white' },
    scrollcontainer:{ flex: 0.67, alignItems: 'center' },
    container: {
        backgroundColor: "rgba(0,0,0,0.1)",
        position: "absolute",
        top: 0,
        width: WINDOW.width,
        height: WINDOW.height / 3,
        alignItems: "center",
        justifyContent: "center"
    },
    headerText: {
        color: "white",
        fontSize: WINDOW.width * 0.07
    },
    loginButton: {
        width: WINDOW.width / 2,
        padding: WINDOW.width / 35,
        marginTop: WINDOW.width / 13,
        alignItems: 'center',
        justifyContent: "flex-end",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 4
    },
    loginButtonText: {
        color: "white",
        fontSize: WINDOW.width * 0.036
    },
    postView: {
        flex: 0.66,
        paddingHorizontal: "2%",
    },
    textView: {
        flex: 0.1,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',marginTop:'2%'
    },
    trendingList: {
        fontSize: WINDOW.width * 0.053,
        fontWeight: 'bold',marginLeft:'2%'
    },
    trendingList1: {
        fontSize: WINDOW.width * 0.053,
        fontWeight: 'bold',marginLeft:'2%'
    },
    flatlistView: {
        flex: 0.9,
        backgroundColor: 'white'
    },
    flatListRender: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: "center"
    },
    onselectGenre: {
        padding: 7,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor:'white'
    },
    postImage: {
        height: WINDOW.width / 2 - 19,
        width: WINDOW.width / 2 - 22,
        borderRadius: 20
    },
    imageView: {
        flex: 0.1,
        backgroundColor: "rgba(130, 130, 130, 0.5)",
        position: "absolute",
        bottom: (Platform.OS === 'ios') ? 2: 2,
        width: (Platform.OS === ' ios') ? WINDOW.width / 2 - 22: WINDOW.width / 2 - 22 ,
        height: (Platform.OS === 'ios') ? WINDOW.width / 2 - 144:WINDOW.width / 2 - 140 ,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    textStyle: {
        fontSize: WINDOW.height * 0.022,
        color: "white",
        fontWeight: 'bold',
        marginLeft: "5%"
    },
    textStyle1:{
        fontSize: WINDOW.width * 0.034,
        color: "white",
        fontWeight: '500',
        marginLeft: "5%"
    },
    nextView: {
        backgroundColor: 'white',
        height: WINDOW.width / 2 - 146,
        width: WINDOW.width / 2 - 20
    },
    genre: {
        fontSize:  WINDOW.width * 0.035,
        justifyContent: 'flex-start',
        marginLeft: "5%",
        fontWeight: "500",
    },
    iconView: {
        marginTop:"1%",
        flexDirection: "row",
        marginLeft: "5%",
        flex:0.6,
    },
    heartContainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageIcon: {
        height: WINDOW.width * 0.035,
        width: WINDOW.width * 0.040
    },
    imageIcon1: {
        height: WINDOW.width * 0.035,
        width: WINDOW.width * 0.0431
    },
    imageIcon3: {
        height: WINDOW.width * 0.04,
        width: WINDOW.width * 0.044
    },
    numberStyling: {
        fontSize: 12,
        fontWeight: '500',
        marginTop:'1%'
    },
    imageIconContainer: {
        flex: 0.274,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    unlikedImage: { 
        height: WINDOW.width * 0.036, 
        width: WINDOW.width * 0.040
    },


})