import React, { Component } from 'react'
import { Text, StyleSheet, View,
    Button,
    ScrollView,
    TouchableOpacity,
    Dimensions
 } from 'react-native'
import colors from '../constants/Colors'
// import window from '../constants/Layout'
const { width, height } = Dimensions.get("window");


export default class SongScreen extends Component {
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title:'Lyrics'
    //     }
    // }
    state = {
        songTitle: 'Stranger Things',
        albumId:'2321323',
        albumTitle:'KYGO',
        artistName:'kygo',
        artistId:'2321323',
        lyrics: '',
        load: false
    }

    async componentDidMount(){
        // const { title, artist, album } = this.props.navigation.state.params;
        const url = `https://api.lyrics.ovh/v1/kygo/stranger things`
        // const lyricsQuery = `${url}${artist.name}/${title}`
        
        // this._saveState()
        this._fetchLyrics(url)
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
                <View style={[styles.sizeContainer, styles.songInfo]}>
                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('AlbumScreen', {...this.state})}
                    >
                    <View 
                        style={{flexDirection:'row',alignSelf:'flex-end',}}
                        >
                        <Text>Song: {songTitle}</Text> 
                    </View>
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
      <View style={styles.container}>
        <View style={[styles.detailsContainer, styles.sizeContainer]}>
            {this._renderSongInfo()}
        </View>
        {/* bikin arrowny disni, height nya sama dengan, di tempel */}
        <View>
            <ScrollView >
                {this._renderLyrics()}
            </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    sizeContainer: {
        width: width,
        height: height* 0.60,
    },
    songInfo:{
        justifyContent:'space-around', 
        alignItems:'center',

    },
    detailsContainer:{
        backgroundColor: colors.lBlue,
        borderBottomRightRadius: 50,
        borderBottomStartRadius: 50,
    },
    lyrics: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    
})
