import {
    StyleSheet,
    Dimensions,
    Platform
} from "react-native";
import { colorLiteral } from "../constants/Color";
import { ifIphoneX } from 'react-native-iphone-x-helper'
const WINDOW = Dimensions.get("window");

export const styles = StyleSheet.create({

main:{ 
    flex: 1,
    backgroundColor: colorLiteral.WHITE
},
container:{ 
     flex: 0.14, 
   
    flexDirection: 'row',
    alignItems:"center",
},
imageView:{ 
    flex: 0.2, 
    justifyContent: 'center', 
    alignItems: 'center' 
},
imageStyle:{
    height: WINDOW.width * 0.1,
    width: WINDOW.width * 0.1,
    borderRadius: WINDOW.width * 0.05,
    borderWidth: 1,
    borderColor: colorLiteral.GREY
},
headView:{ 
       ...ifIphoneX({
        flex:0.8
    }, {    flex:1
    }),
    justifyContent: 'center' 
},
headText:{ 
    fontSize:WINDOW.width * 0.045,
    fontWeight:'600'
},
textView:{ 
    flex: 0.1, 

    // ...ifIphoneX({
    //     height:WINDOW.height*0.07,
    // }, { height:WINDOW.height*0.12,
    // }),
   
    justifyContent: 'center', 
    alignItems: 'center' ,
    elevation:2,
    shadowOffset:{width:2,height:2},
    shadowColor:'grey'
},
text:{ 
    color: colorLiteral.GREY, 
    fontSize: WINDOW.width * 0.05, 
    fontWeight: 'bold' ,
},
text1:{ 
    color: colorLiteral.GREY, 
    fontSize: WINDOW.width * 0.05, 
    fontWeight: 'bold' ,
    marginBottom:'4%'
},
flatListView:{ 
    flex: 0.65, 
    // height:WINDOW.height*0.7,
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: '3%' ,

},
genreView:{ 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center" 
},
onSelectView:{ 
    alignItems: "center", 
    justifyContent: "center", 
    borderRadius: WINDOW.width * 0.12, 
    width: WINDOW.width * 0.24, 
    height: WINDOW.width * 0.24, 
    position: "absolute" 
},
onSelectImageView:{ 
    width: WINDOW.width * 0.08, 
    height:WINDOW.width * 0.08
},
footerView:{ 
    // // flex: 0.14, 
    // // height:WINDOW.height*0.1,
    // marginTop:"4%",
    // backgroundColor: 'transparent', 
    // flexDirection: 'row', 
    // justifyContent: 'center' ,marginBottom:'8%'
    flex: 0.1, 
    flexDirection: 'row', 
    justifyContent: 'center' ,
    alignItems:'center'
},
footerHead:{ 
    flex: 0.25, 
    paddingTop: '1%' 
},
footerText:{ 
    fontSize: WINDOW.width * 0.045, 
    color: colorLiteral.LIGHTGREY, 
    fontWeight: '600', 
    textAlign: 'center' 

},
nextView:{ 
    flex: 0.4, 
    flexDirection: 'row', 
    backgroundColor: colorLiteral.LIGHTGREY, 
    justifyContent: 'center', 
    height: WINDOW.width * 0.09, 
    borderRadius: 11 
},
nextText:{ 
    flex: 0.8, 
    color: 'white', 
    fontSize: WINDOW.width * 0.04, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    paddingTop: '4%' 
},
tapButton:{ 
    flex: 0.2, 
  
    justifyContent: 'center', 
    alignItems: 'center',
     borderRadius: 11 
    },
signText:{ 
    color: colorLiteral.WHITE, 
    fontSize:  WINDOW.width * 0.06,
    fontWeight: 'bold' 
},
buttonView:{ 
    flex: 0.25, 
    paddingLeft: '2%', 
    paddingTop: '1%' ,
},


})