import React, { Component } from 'react'
import { Text, StyleSheet, View,
  Button,
 } from 'react-native'

export default class AlbumScreen extends Component {
  componentDidMount(){
    console.log(this.props.navigation.state.params)
  }

  _fetchAlbumData = () =>{

  }

  _renderAlbumInfo = () => {
    //album detail, artist
    //navigate to artist
  }
  
  _renderSongs = () => {
    //navigate songscreen
  }
  render() {
    return (
      <View>
        <Text> Album </Text>
        <Button 
            title="To Home"
            onPress={() => this.props.navigation.navigate('HomeScreen')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({})
