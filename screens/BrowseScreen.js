import React, { Component } from 'react'
import { Text, StyleSheet, View,
  Image,
  Button
 } from 'react-native'

export default class BrowseScreen extends Component {
    state = {
      data : []
    }

    async componentDidMount(){
      const { query } = this.props.navigation.state.params;
      console.log(query);

      fetch(`https://api.deezer.com/search?q=${query}&order=RANKING?strict=on`)
        .then(res => res.json())
        .then(resJson => {
          this.setState({ data: resJson.data })
        })

    }
    
  render() {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
        <Button title="Hello" onPress={() => this.props.navigation.navigate('SongScreen') }/>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})
