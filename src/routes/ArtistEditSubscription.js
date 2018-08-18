import React, { Element } from "react";
import { Scene, } from "react-native-router-flux";
import AddSubscription from "./../components/ArtistEditSubscription/AddSubscription";

export default  ArtistEditSubscription=(
    <Scene key='ArtistEditSubscription' hideNavBar>
        <Scene key="AddSubscription" initial component={AddSubscription}
        />
    </Scene>

);