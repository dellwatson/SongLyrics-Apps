import React, { Component } from 'react'
import { Text, StyleSheet, View,
    Image,
    StatusBar,
    Animated,
    ScrollView,
    TouchableOpacity,
    Dimensions,

 } from 'react-native'
import colors from '../constants/Colors'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");

export default class SongScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'HELLO',
            headerLeft: (
                <MaterialIcons 
                    name='keyboard-arrow-left'
                    size={26}
                    style={{color: 'white'}} />
            ),
            headerTransparent: true,
        }
    }



    state = {
        drag: new Animated.Value(0),
        lyricsLoaded: false,
        renderingInfo: false,
        lyrics: '',
    }

     async componentDidMount(){
         StatusBar.setHidden(true)
        // const { title, artist } = this.props.navigation.state.params;
        // const url = `https://api.lyrics.ovh/v1/${artist.name}/${title}`
        const url = `https://api.lyrics.ovh/v1/beyonce/halo`

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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.infoContainer}>

                    </View>
                    <MaterialIcons 
                        name='arrow-drop-down'
                        size={30}
                        style={{color: 'white'}}/>
                </View>
                <View style={styles.bottomContainer}>

                </View>

            </View>
        )
    }
    

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        // alignItems: 'stretch'
    },
    topContainer: {
        // flex: 1,
        backgroundColor: 'red',
        justifyContent:'flex-end',
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    infoContainer: {
        // flex: 1,
        height: height*.4,
        backgroundColor: 'pink',
        width: width* .8,
    },
    bottomContainer: {
        // flex: 3,
        backgroundColor: 'blue'
    }
    
})
