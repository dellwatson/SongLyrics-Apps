import React, { Component } from 'react'
import { Text, StyleSheet, View,
    Button,
 } from 'react-native'

export default class SongScreen extends Component {
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title:'Lyrics'
    //     }
    // }
    componentDidMount(){
        console.log('SONGSCREEN')
        console.log(this.props)
        // const { title, artist } = this.props.navigation.state.params;
        // const { navigation: {
        //     state: {
        //         params: {
        //             title, artist
        //         }
        //     }
        // }} = this.props
    }

    _fetchLyrics = () => {

    }

  render() {
    return (
      <View 
        style={styles.container}
      >
        <Text style={styles.title}> SongScreen </Text>
        <Button 
            title="To Home"
            onPress={() => this.props.navigation.navigate('HomeScreen')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        
    },
    title: {
        flex: 1,

    },

})
