import React, { Component } from 'react'
import { Text, StyleSheet, View,
  Button,
 } from 'react-native'

export default class AlbumScreen extends Component {
  state = {

  }
  componentDidMount(){
    // console.log(this.props.navigation.state.params.)
    //fetch with album Id
    //fetch and load image album
    
  }

  _fetchAlbumData = (albumId) =>{
    const url = `https://api.deezer.com/album/${albumId}`
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.data
        })
      })
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
