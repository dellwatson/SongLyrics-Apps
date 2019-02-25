import React, { Component } from 'react'
import { Text, StyleSheet, View,
  Image,
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
      <View>
        <Text>  </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})
