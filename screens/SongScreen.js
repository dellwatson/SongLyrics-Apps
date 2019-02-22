import React, { Component } from 'react'
import { Text, StyleSheet, View,
    Button,
    Image,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Dimensions
 } from 'react-native'
import colors from '../constants/Colors'
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Font } from 'expo'






// import window from '../constants/Layout'
const { width, height } = Dimensions.get("window");
const staticUri = "https://e-cdns-images.dzcdn.net/images/artist/0707267475580b1b82f4da20a1b295c6/250x250-000000-80-0-0.jpg"


export default class SongScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }

    state = {
        fontLoaded  : false,
        songTitle: 'Stranger Things',
        albumId:'2321323',
        albumTitle:'KYGO',
        artistName:'kygo',
        artistId:'2321323',
        lyrics: '',
        lyricsLoaded: false
    }

     async componentDidMount(){
        await Font.loadAsync({
            'Forum': require('../assets/fonts/Forum/Forum-Regular.ttf'),
            'Patua': require('../assets/fonts/Patua_One/PatuaOne-Regular.ttf'),
        })
        this.setState({ fontLoaded: true })


        // const { title, artist, album } = this.props.navigation.state.params;
        const url = `https://api.lyrics.ovh/v1/kygo/stranger things`
        // const lyricsQuery = `${url}${artist.name}/${title}`

        // this._fetchDetails()
        
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
        fetch(url)
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    lyrics: res.lyrics,
                    lyricsLoaded: true
                })
                
            })
    }


    _renderSongInfo = () => {
        const { lyricsLoaded, fontLoaded, songTitle, albumId, albumTitle, artistId, artistName } = this.state;
        if(lyricsLoaded && fontLoaded){
            return(
                <View style={[styles.sizeContainer,]}>
                    <View style={{width:width*0.5, justifyContent:'center', alignItems:'center'}}>
                        <Image 
                            source={{uri: staticUri}}
                            style={{borderColor:'white',borderWidth: 2, width:width*0.43, height:width*0.43}}
                        
                        />
                    </View>
                    <View style={{ width: width* 0.5, justifyContent: 'space-around', paddingLeft:10}}>
                        <View>
                            <Text style={{fontFamily:'Forum', fontSize:15, color: 'grey'}}>Artist</Text>
                            <Text style={{fontFamily:'Patua', fontSize:26, color: colors.white}}>{artistName}</Text>
                        </View>
                        <View>
                            <Text style={{fontFamily:'Forum', fontSize:15, color: 'grey'}}>Album</Text>
                            <Text style={{fontFamily:'Patua', fontSize:26, color: colors.white}}>{albumTitle}</Text>
                        </View>
                        <TouchableOpacity style={{ backgroundColor: 'pink', height:30, width:width/4.5, borderRadius: 10, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontFamily:'Forum', fontSize:20, color: colors.white, fontWeight:"400"}}>Artist</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }else{
            return null
        }
    }

    _renderLyrics = () => {
        const { lyrics, lyricsLoaded, fontLoaded } = this.state;
        if(lyricsLoaded && fontLoaded){
            return (
                <Text style={styles.lyrics}>
                    {lyrics}
                </Text>
            )
        }else{
            return null
        }
    }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <View style={[styles.detailsContainer,]}>
            <View style={styles.detailsIcon}> 
                <MaterialIcons style={{color: colors.white,}} size={26} name='dashboard' />
                <AntDesign style={{color: colors.white,}} size={26} name='search1'/>
            </View>
            {this._renderSongInfo()}
            {this._renderTitle()}
            <View style={styles.gridIcon}></View>
        </View>


        <ScrollView style={{ paddingVertical: 20, marginLeft: 35}}>
            {this._renderLyrics()}
        </ScrollView>
      </View>
    )
  }

  _renderTitle = () => {
    const { lyricsLoaded, fontLoaded, songTitle, albumId, albumTitle, artistId, artistName } = this.state;
    if(lyricsLoaded && fontLoaded){
        return (
            <View style={styles.titleContainer}>
                <Text style={{fontFamily:'Forum', fontSize:30, color: colors.white, fontWeight:'500'}}>{songTitle}</Text>
            </View>
        )
    }
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    detailsContainer:{
        backgroundColor: colors.lBlue,
        borderBottomRightRadius: 50,
        borderBottomStartRadius: 50,
        width,
        paddingBottom: 10

    },
    detailsIcon: {
        paddingHorizontal: 20,
        paddingTop:20,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15 
    },
    gridIcon: {
        width: width/4,
        backgroundColor:'grey',
        height: 5,
        borderRadius: 20,
        alignSelf: 'center'
    },
    sizeContainer: {
        width: width,
        height: height* 0.40,
        flexDirection: 'row'
        // paddingTop: 35,
        // paddingHorizontal: 20

    },
    textDetails: {
        color: colors.white,
        fontSize: 24,
        // fontWeight: "900"
    },
    lyrics: {
        fontFamily: 'Forum',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: "300"

    },
    
})
