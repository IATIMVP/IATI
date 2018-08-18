import React, { Element } from "react";
import { Scene, Router, Modal, Reducer, Stack } from "react-native-router-flux";
import NewPost from "./../components/Create_Post/New_Post";
import Select_Genre from "./../components/Create_Post/Select_Genre";
import Select_Type from "./../components/Create_Post/Select_Type";
import Publish from "./../components/Create_Post/Publish";
import Post_Privacy from "../components/Create_Post/Post_Privacy";
import Post_View from "../components/Create_Post/Post_View"
export default CreatePost = (
    <Scene key='CreatePost' hideNavBar>
        <Scene key="NewPost" initial component={NewPost}
        />
        <Scene key="Publish" component={Publish}
        />
        <Scene key="Select_Genre" component={Select_Genre}
        />
        <Scene key="Select_Type" component={Select_Type}
        />
        <Scene key="Post_Privacy" component={Post_Privacy}
        />
        <Scene key="Post_View" component={Post_View}
        />
    </Scene>

);

