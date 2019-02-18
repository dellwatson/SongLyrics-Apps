import React, { Component } from 'react'
import { Text, StyleSheet, View,
    Button,
    ScrollView,
 } from 'react-native'

export default class SongScreen extends Component {
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title:'Lyrics'
    //     }
    // }
    state = {
        lyrics: '',
        load: false
    }

    async componentDidMount(){
        console.log('SONGSCREEN')
        const { title, artist } = this.props.navigation.state.params;
        console.log(artist)
        
        const url = `https://api.lyrics.ovh/v1/`
        const lyricsQuery = `${artist.name}/${title}`
        this._fetchLyrics(url, lyricsQuery)
    }
    
    _fetchLyrics = (url, lyrics) => {
        console.log(url+lyrics)

        fetch(url+lyrics)
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    lyrics: res.lyrics,
                    load: true
                },
                console.log(res.lyrics))
            })
    }

    _renderLyrics = () => {
        const { lyrics, load } = this.state;
        console.log(lyrics)
        
        if(load){
            return (
                <Text style={styles.lyrics}>
                    {lyrics}
                </Text>
            )
        }else{
            return (
                <Text style={styles.lyrics}>
                    ini lyrics
                </Text>
            )
        }
    }

  render() {
    return (
      <View 
        style={styles.container}
      >
        <Text style={styles.title}> SongScreen </Text>
        <ScrollView
            style={styles.container}

        >
            {this._renderLyrics()}
        </ScrollView>

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
    lyrics: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        flex: 1,

    },
})
