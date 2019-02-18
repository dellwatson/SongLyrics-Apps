import React, { Component } from 'react'
import { Text, StyleSheet, View,
  Button,
 } from 'react-native'

export default class ArtistScreen extends Component {
  componentDidMount(){
    console.log(this.props.navigation.state.params.artistId)
  }

  _renderArtistInfo = () => {

  }

  _renderAlbumList = () => {
    //navigate to album
  }

  _renderTopSongs = () => {

  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <Button 
            title="To Home"
            onPress={() => this.props.navigation.navigate('HomeScreen')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({})
