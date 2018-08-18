import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { colorLiteral } from '../../constants/Color';
function MiniOfflineSign() {
    return (
        <View></View>

    );
}
class OfflineNotice extends PureComponent {
    state = {
        isConnected: true
    };
    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.setState({ isConnected });
        } else {
            this.setState({ isConnected });
        }
    };
    render() {
        if (!this.state.isConnected) {
            return <MiniOfflineSign />;
        }
        return null;
    }
}
const styles = StyleSheet.create({
    offlineContainer: {
        ...ifIphoneX({
            top: 6
        }, {
                top: 0
            }),
        backgroundColor: colorLiteral.DARK_RED,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',

    },
    offlineText: {
        color: '#fff'
    }
});
export default OfflineNotice;