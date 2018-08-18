import React, { Component } from 'react';
import { Platform, TouchableOpacity, Button, Text, View } from 'react-native';
import { styles } from '../../styles/NavBarStyle';
import Icon from 'react-native-vector-icons/Ionicons';

class NavigationBar extends Component {
    renderLeftButton() {
        const {
            onLeftButtonPress,
            back = false,
            leftButtonIconName,
            leftButtonText,
            backgroundColor,
        } = this.props;

        if (onLeftButtonPress) {
            if (back || leftButtonIconName) {
                return (
                    <TouchableOpacity style={styles.pressButton} onPress={onLeftButtonPress}>
                        <Icon
                            name={back ? 'ios-arrow-back' : leftButtonIconName}
                            size={30}
                        />
                    </TouchableOpacity>
                );
            }
            if (leftButtonText) {
                return (
                    <TouchableOpacity onPress={onLeftButtonPress} style={{padding:0}}>
                        <Text style={styles.buttonText}>{leftButtonText}</Text>
                    </TouchableOpacity>
                );
            }
        }
        return null;
    }

    renderTitle() {
        return (
            <Text style={styles.buttonText}>
                {this.props.title}
            </Text>
        );
    }
    renderRightButton() {
      
        const {
            onRightButtonPress,
            rightButtonIconName,
            rightButtonText,
            rightButtonRenderer,
         
        } = this.props;

        
            if (rightButtonIconName) {
               
                return (
                    <TouchableOpacity onPress={onRightButtonPress}>
                        <Icon name={rightButtonIconName}
                            size={30}
                        />
                    </TouchableOpacity>
                );
            }
            if (rightButtonText) {
                return (
                    <TouchableOpacity onPress={onRightButtonPress}>
                        <Text style={styles.buttonText}>{rightButtonText}</Text>
                    </TouchableOpacity>
                );
            }
           
        
        return null;
    }

    render() {
        return (
            <View style={[styles.mainView, { backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : "white" }]}>
                <TouchableOpacity style={styles.leftButton}>{this.renderLeftButton()}</TouchableOpacity>
                <View style={styles.title}>{this.renderTitle()}</View>
                <TouchableOpacity style={styles.rightButton}>
                    {this.renderRightButton()}
                </TouchableOpacity>
            </View>
        );
    }
}

export default NavigationBar;
