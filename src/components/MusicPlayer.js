
import React, { Component } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,  
    Slider,
    StatusBar
} from "react-native";
import { Actions } from "react-native-router-flux";
import TrackPlayer from 'react-native-track-player';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { styles } from "../styles/MusicPlayerStyle";
import { colorLiteral } from "../constants/Color";
import RepeatIcon from "react-native-vector-icons/Feather";
import BackIcon from "react-native-vector-icons/Entypo";
import ForwardIcon from "react-native-vector-icons/Entypo";
import PlayIcon from "react-native-vector-icons/Entypo";
import PauseIcon from "react-native-vector-icons/FontAwesome";
import ShuffleIcon from "react-native-vector-icons/Entypo";
import NavigationBar from "./common/NavBar";
const WINDOW = Dimensions.get("window");

class MusicPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SliderValue: 0,
            playing: false,
            currentPosition: 0,
            repeat: false,
            startTime: 0,
            totalDuration: 50,
            tracksList: [
                {
                    id: "1",
                    url: "https://www.sample-videos.com/audio/mp3/wave.mp3",
                    title: 'Track Title',
                    artist: 'Track Artist',
                    artwork: "https://png.pngtree.com/element_origin_min_pic/16/10/29/db6bd71231ee96e855f67af0d5817319.jpg"

                },
                {
                    id: "2",
                    url: "https://www.bensound.com/bensound-music/bensound-ukulele.mp3",
                    title: 'Track Title',
                    artist: 'Track Artist',
                    artwork: "https://png.pngtree.com/element_origin_min_pic/16/10/29/db6bd71231ee96e855f67af0d5817319.jpg"

                },
                {
                    id: "3",
                    url: "https://www.sample-videos.com/audio/mp3/wave.mp3",
                    title: 'Track Title',
                    artist: 'Track Artist',
                    artwork: "https://png.pngtree.com/element_origin_min_pic/16/10/29/db6bd71231ee96e855f67af0d5817319.jpg"
                },
                {
                    id: "4",
                    url: "https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3",
                    title: 'Track Title',
                    artist: 'Track Artist',
                    artwork: "https://png.pngtree.com/element_origin_min_pic/16/10/29/db6bd71231ee96e855f67af0d5817319.jpg"
                }
            ],
            index: 0

        };
    }
    componentWillMount() {

        TrackPlayer.setupPlayer().then(async () => {
            // Adds a track to the queue
            await TrackPlayer.add(this.state.tracksList)
        })
        this.play();
    }

    play = () => {
        TrackPlayer.play();
        this.setState({
            playing: true
        })
        TrackPlayer.getDuration().then(async (sec) => {
            if (await sec) {
                console.log("total duration : ", sec);
            }
        })

        let self = this;
        setTimeout(
            function () {
                self.setState({
                    currentPosition: ++self.state.currentPosition
                })
            }, 1000
        )
    }

    pause = () => {
        this.setState({
            playing: false
        })
        TrackPlayer.pause();
    }

    repeat = () => {
        this.setState({
            repeat: !this.state.repeat
        })
    }

    previous = () => {
        this.setState({
            playing: false
        })
        TrackPlayer.skipToPrevious();
        this.setState({
            playing: true
        })
    }

    next = () => {
        this.setState({
            playing: false
        })
        TrackPlayer.skipToNext();
        this.setState({
            playing: true
        })
    }

    seekTo = (position) => {
        TrackPlayer.seekTo(position)
    }
    render() {

        return (
            <View style={styles.main}>
          
            <StatusBar
          hidden={false}
          backgroundColor={colorLiteral.STATUSBAR}
          barStyle="dark-content"
        />
        <NavigationBar
          backgroundColor={colorLiteral.WHITE}
          title="Playing"
          back
          onLeftButtonPress={() => Actions.pop()}
        />
                <View style={styles.albumartView}>
                    <Image
                        resizeMode="contain"
                        style={styles.albumart}
                        source={{ uri: "https://png.pngtree.com/element_origin_min_pic/16/10/29/db6bd71231ee96e855f67af0d5817319.jpg" }}
                    />
                </View>
                <View style={styles.playerView}>
                    <View style={styles.trackInfoView}>
                        <Text style={styles.trackName}>Rolling Left</Text>
                        <Text style={styles.artistName}>Shinobi Ninja</Text>
                    </View>
                    <View style={styles.seekBarView}>
                        <View style={styles.timeView}>
                            <Text style={styles.time}>00:00</Text>
                            <Text style={styles.time}>05:12</Text>
                        </View>
                        <Slider
                            value={this.state.currentPosition}
                            step={1}
                            minimumValue={this.state.startTime}
                            maximumValue={this.state.totalDuration}
                            minimumTrackTintColor={colorLiteral.BUTTON}
                            maximumTrackTintColor={colorLiteral.GREY}
                            onValueChange={(ChangedValue) => this.seekTo(ChangedValue)}
                            style={{ flex: 0.6, width: '90%' }}
                        />
                    </View>
                    <View style={styles.controlsView}>
                        <TouchableOpacity
                            onPress={() => this.repeat()}
                        >
                            <RepeatIcon
                                name="repeat"
                                size={WINDOW.height / 30}
                                color={this.state.repeat ? "black" : colorLiteral.GREY}
                                style={[styles.repeatIconStyle, { backgroundColor: this.state.repeat ? "#bababa" : colorLiteral.WHITE }]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.previous()}
                        >
                            <BackIcon
                                name="controller-fast-backward"
                                size={WINDOW.height / 20}
                                color={colorLiteral.GREY}
                                style={styles.repeatIconStyle}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.state.playing ? this.pause() : this.play()}
                        >
                            {!this.state.playing ? <PlayIcon
                                name="controller-play"
                                size={WINDOW.height / 10}
                                color={colorLiteral.GREY}
                                style={styles.repeatIconStyle}
                            /> :
                                <PauseIcon
                                    name="pause"
                                    size={WINDOW.height / 14}
                                    color={colorLiteral.GREY}
                                    style={styles.repeatIconStyle}
                                />}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.next()}
                        >
                            <ForwardIcon
                                name="controller-fast-forward"
                                size={WINDOW.height / 20}
                                color={colorLiteral.GREY}
                                style={styles.repeatIconStyle}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <ShuffleIcon
                                name="shuffle"
                                size={WINDOW.height / 30}
                                color={colorLiteral.GREY}
                                style={styles.repeatIconStyle}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lastView}>
                        <TouchableOpacity>
                            <ShuffleIcon
                                name="dots-three-horizontal"
                                size={WINDOW.height / 20}
                                color={colorLiteral.BUTTON}
                                style={styles.repeatIconStyle}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({


    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer)