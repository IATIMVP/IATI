import React from "react";
import { Scene } from "react-native-router-flux";
import ProfileName from "./../components/ArtistLogin/ProfileName";
import MoreInfo from "./../components/ArtistLogin/MoreInfo";
import ChargeSub from "./../components/ArtistLogin/ChargeSub";
import SubLevel from "./../components/ArtistLogin/SubLevel";
import AddNewSub from "../components/ArtistLogin/AddNewSub";
import GenreModal from "../components/ArtistLogin/GenreModal";
export default ArtistLogin = (
    <Scene key='ArtistLogin' hideNavBar>
        <Scene key="ProfielName" initial component={ProfileName}
        />
        <Scene key="MoreInfo" component={MoreInfo}
        />
        <Scene key="AddNewSub" component={AddNewSub}
        />
        <Scene key="ChargeSub" component={ChargeSub}
        />
        <Scene key="SubLevel" component={SubLevel}
        />
        <Scene key="GenreModal" component={GenreModal}
        />

    </Scene>

);