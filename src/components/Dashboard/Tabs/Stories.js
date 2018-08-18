import React from "react";
import {

    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { styles } from "./../../../styles/DashboardStyle";
import { colorLiteral } from "../../../constants/Color";
import config from "../../../config";

class Stories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: props.storiesData
        };
    }
    render() {
        return (
            <View   
                style={styles.storiesContainer}>
               { this.state.stories.length ?
               <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                >
                    {
                        this.state.stories.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={styles.storyStyle}
                                    onPress={() => Actions.musicPlayer()}
                                >
                                    <View style={styles.userImageView}>
                                        <Image
                                            source={{ uri:  config.serverSideUrl + ":" + config.port + item.picture }}
                                            style={styles.userImage}
                                        />
                                        {index === 0 ? <View
                                            style={styles.addImage}
                                        >
                                            <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>+</Text>
                                        </View> : null}
                                    </View>
                                    <View style={styles.nameView}>
                                        <Text style={styles.name}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView> : 
                <View>
                   
                    <Text style={styles.name}>No stories.</Text>
                </View>
            }
            </View>
        );
    }
}

function mapUser(state) {
    return {
    };
}

export default connect(mapUser, {})(Stories);


const STORIES = [
    {
        id: 0,
        name: "thecrazyfish",
        image: "https://www.ienglishstatus.com/wp-content/uploads/2018/04/cute-profile-pics-for-whatsapp-images.png"
    },
    {
        id: 1,
        name: "nightrider",
        image: "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg"
    },
    {
        id: 2,
        name: "ghost",
        image: "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg"
    },
    {
        id: 3,
        name: "thehumbleboy",
        image: "https://cdn.business2community.com/wp-content/uploads/2014/04/profile-picture.jpg"
    },
    {
        id: 4,
        name: "badcreature",
        image: "https://statusandphoto.weebly.com/uploads/6/0/1/5/60158603/8347592_orig.png"
    },
    {
        id: 5,
        name: "_veer123",
        image: "https://img.kpopmap.com/2017/11/Kim-DongYoon.jpg"
    },
    {
        id: 6,
        name: "rider_mania1",
        image: "https://www.cheme.cornell.edu/engineering/customcf/iws_ai_faculty_display/ai_images/mjp31-profile.jpg"
    },
    {
        id: 7,
        name: "helper_stop",
        image: "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg"
    }
]