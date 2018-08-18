import React from 'react'
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { styles } from "./../../../styles/FeedsStyle";
import { Actions, ActionConst } from "react-native-router-flux";
import config from '../../../config';
import ReadMore from 'react-native-read-more-text';

import moment from 'moment'

class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feeds: props.feedsData
    }
  }
  renderFeed(item) {
    console.log("item-======-========>>>>", item)

    let { user_id } = item
    if (user_id) {


      return (
        <View style={styles.feedMainView}>
          <View style={styles.header}>
            <View style={styles.profilepicture}>
              <Image
                source={user_id && user_id.picture ? { uri: `${config.serverSideUrl}:${config.port}` + user_id.picture } : null}
                style={styles.userImage}
              />
            </View>
            <View style={styles.profileName}>
              <Text style={styles.username}>{user_id.name}</Text>
              <Text style={styles.date}>{user_id.created_date ? moment(user_id.created_date).format('MMMM Do YYYY, h:mm:ss a') : moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')}</Text>
            </View>
            <View style={styles.fav}>

            </View>
          </View>
          <View style={styles.albumart}>
            <Image
              source={user_id.feedPicture ? { uri: `${config.serverSideUrl}:${config.port}` + user_id.feedPicture } : null}
              style={styles.albumImage}
            />
          </View>
          <View style={styles.detail}>
            <View style={styles.titleView}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.descriptionView}>
              <ReadMore
                numberOfLines={2}
                onReady={this._handleTextReady}>
                <Text style={[styles.date, { fontWeight: '600' }]}>{item.description}</Text>
              </ReadMore>

            </View>
            <View style={styles.alternativeView}>

              <FlatList
                horizontal={true}
                data={user_id.preferred_genre}
                renderItem={({ item, index }) => <Text style={[styles.date]}>{item}{index == user_id.preferred_genre.length - 1 ? "." : ","}</Text>}
              />

            </View>
          </View>
          <View style={styles.stats}>
            <View style={styles.stats1}>
              <Text style={styles.date}>{user_id.subscription} subscribers</Text>
              <Text style={styles.date}>${user_id.charge} per single</Text>
              <Text style={styles.date}>{item.plays} plays</Text>
            </View>
            <View style={styles.stats2}>
              <View style={styles.stats21}>
                <Image resizeMode={"contain"} source={require('../../../constants/Images/signup/heart.png')} style={styles.imageIcon} />
                <Text style={styles.date}>{item.likes_count}</Text>
                <Image resizeMode={"contain"} source={require('../../../constants/Images/signup/comment.png')} style={styles.imageIcon} />
                <Text style={styles.date}>{item.comments_count}</Text>
              </View>
              {
                item.comments.length > 0 ? <View style={styles.stats22}>
                  <Text style={styles.date}>View all {item.comments.length} comments</Text>
                </View> : null
              }
            </View>
          </View>
        </View>
      )
    }
    else {
      return (
        <Text></Text>
      )
    }
  }
  renderFooter = () => {
  

    return (
      <View
        style={{
          height:60
        }}
      />
    );
  };
  render() {
    console.log("this.state.feeds", this.state.feeds)
    return (
      <View
        style={styles.feedContainer}>
        {this.state.feeds.length ?
          <FlatList
            extraData={this.state}
            data={this.state.feeds}
            renderItem={({ item }) => this.renderFeed(item)}
            ListFooterComponent={this.renderFooter}
          /> :
          <View style={styles.nofeedcontainer}>
            <Text style={styles.nofeedtext}>You're not following any artist. Please follow one or more artist(s).</Text>
            <TouchableOpacity
              style={styles.selectedButton}
              onPress={() => Actions.artistList()}
            >
              <Text style={styles.selectedButtonText}>Artists</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}
function mapUser(state) {
  return {
    // listData: state.listReducer.listData
  }
}
export default connect(mapUser, {})(Feed)
