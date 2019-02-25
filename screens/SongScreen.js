import React, { Component } from 'react'
import { Text, StyleSheet, View,
    Image,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Dimensions
 } from 'react-native'
import colors from '../constants/Colors'
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Font } from 'expo'

const { width, height } = Dimensions.get("window");

export default class SongScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }


    state = {
        lyricsLoaded: false,
        renderingInfo: false,
        lyrics: '',
    }

     async componentDidMount(){
        const { title, artist } = this.props.navigation.state.params;
        const url = `https://api.lyrics.ovh/v1/${artist.name}/${title}`
        this._fetchLyrics(url)
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
        const { lyricsLoaded,  } = this.state;
        const { artist, album } = this.props.navigation.state.params;
        if(lyricsLoaded ){
            return(
                <View style={[styles.sizeContainer,]}>
                    <View style={{width:width*0.5, justifyContent:'center', alignItems:'center'}}>
                        <Image 
                            source={{uri: artist.picture_medium}}
                            style={{borderColor:'white',borderWidth: 2, width:width*0.43, height:width*0.43}}
                        />
                    </View>
                    <View style={{ width: width* 0.5, justifyContent: 'space-around', paddingLeft:10}}>
                        <View>
                            <Text style={{fontFamily:'Forum', fontSize:15, color: 'grey'}}>Artist</Text>
                            <Text style={{fontFamily:'Patua', fontSize:26, color: colors.white}}>{artist.name}</Text>
                        </View>
                        <View>
                            <Text style={{fontFamily:'Forum', fontSize:15, color: 'grey'}}>Album</Text>
                            <Text style={{fontFamily:'Patua', fontSize:26, color: colors.white}}>{album.title}</Text>
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

    _renderTitle = () => {
        const { lyricsLoaded,  } = this.state;
        const { title } = this.props.navigation.state.params;
        
        if(lyricsLoaded ){
            return (
                <View style={styles.titleContainer}>
                    <Text style={{fontFamily:'Forum', fontSize:30, color: colors.white, fontWeight:'500'}}>{title}</Text>
                </View>
            )
        }
      }

    _renderLyrics = () => {
        const { lyrics, lyricsLoaded,  } = this.state;
        if(lyricsLoaded ){
            return (
                <Text style={styles.lyrics}>
                    {lyrics}
                </Text>
            )
        }else{
            return null
        }
    }

    popInfo = () => {
        const { renderingInfo } = this.state
        this.setState({
            renderingInfo: !renderingInfo
        })
        //willmount
    }

  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar hidden/> */}
        <View style={[styles.detailsContainer,]}>
            <View style={styles.detailsIcon}> 
                <MaterialIcons 
                    onPress={() => this.props.navigation.goBack()}
                    style={{color: colors.white,}} 
                    size={26} 
                    name='arrow-back' />
                <AntDesign 
                    // onPress
                    style={{color: colors.lBlue,}} 
                    size={26} 
                    name='search1'/>
            </View>
            {this.state.renderingInfo? this._renderSongInfo() : null}
            {this._renderTitle()}
            <View 
                onPress={this.popInfo}
                style={styles.gridIcon}
            ></View>
        </View>

        <ScrollView style={{ paddingVertical: 20, marginLeft: 35}}>
            {this._renderLyrics()}
        </ScrollView>
      </View>
    )
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
        paddingBottom: 10,
        paddingTop:10,

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
