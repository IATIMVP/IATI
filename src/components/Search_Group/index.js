import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  Platform
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorLiteral } from "../../constants/Color";
import ActionSheet from 'react-native-actionsheet'
import { Actions } from "react-native-router-flux";
const WINDOW = Dimensions.get("window");

class SearchPage extends Component {
  constructor(props) {
    super(props);
  }
  showActionSheet = () => {
    this.ActionSheet.show()
  }
  render() {
    return (
        <KeyboardAwareScrollView scrollEnabled={false}
        keyboardShouldPersistTaps={Platform.OS === 'ios' ? 'never' : 'always'}
        contentContainerStyle={{
           // height: (Platform.OS === 'ios') ? WINDOW.height * 0.95 : WINDOW.height * 0.94,
            backgroundColor: colorLiteral.WHITE
          }}
           showsVerticalScrollIndicator={false}>
            <View style={{flex:1,height:WINDOW.height/20, }}/>
            <View style={{flex:1,height:WINDOW.height/10,backgroundColor:"red" }}>
            <View>
        <Text onPress={this.showActionSheet}>Open ActionSheet</Text>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Which one do you like ?'}
          options={['Apple', 'Banana', 'cancel']}
         // cancelButtonIndex={2}
          //destructiveButtonIndex={1}
          onPress={(index) => { 
              if(index ==0){
              alert("apple")
              }
              else if(index ==1){

                alert("Banana")
          } }}
        />
      </View>
            </View>
            
            
   </KeyboardAwareScrollView>
    );
  }
}
export default SearchPage;
