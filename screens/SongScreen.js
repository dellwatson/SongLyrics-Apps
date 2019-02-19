import React, { Component } from 'react'
import { Text, StyleSheet, View,
    Button,
    ScrollView,
    TouchableOpacity,
 } from 'react-native'

export default class SongScreen extends Component {
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title:'Lyrics'
    //     }
    // }
    state = {
        songTitle: '',
        albumId:'',
        albumTitle:'',
        artistName:'',
        artistId:'',
        lyrics: '',
        load: false
    }

    async componentDidMount(){
        const { title, artist, album } = this.props.navigation.state.params;
        const url = `https://api.lyrics.ovh/v1/`
        const lyricsQuery = `${artist.name}/${title}`
        
        this._saveState()
        this._fetchLyrics(url+lyricsQuery)
    }

    _saveState = () => {
        const { title, artist, album } = this.props.navigation.state.params;
        this.setState({
            songTitle: title,
            albumId: album.id,
            albumTitle: album.title,
            artistId: artist.id,
            artistName: artist.name
        })
    }
    
    _fetchLyrics = (url) => {
        console.log(url)

        fetch(url)
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    lyrics: res.lyrics,
                    load: true
                })
                
            })
    }

    _renderSongInfo = () => {
        const { load, songTitle, albumId, albumTitle, artistId, artistName } = this.state;
        console.log(artistId)
        if(load){
            return(
                <View>
                    <Text>Song: {songTitle}</Text>
                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('AlbumScreen', {...this.state})}
                    >
                        <Text>Album: {albumTitle}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('ArtistScreen', {...this.state})}
                    >
                    {/* navigate stack */}
                        <Text>Artist: {artistName}</Text>
                    </TouchableOpacity>
                </View>
            )
        }else{
            return(
                <View>
                    <Text>LOADING</Text>
                </View>
            )
        }
    }

    _renderLyrics = () => {
        const { lyrics, load } = this.state;
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
            {this._renderSongInfo()}
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
