import React, { Component } from 'react'
import { Text, StyleSheet, View,
    Image,
    StatusBar,
    Animated,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    LayoutAnimation

 } from 'react-native'
import colors from '../constants/Colors'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const { width, height } = Dimensions.get("window");

const close = height * .1;
const open = height * .4;


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

            headerStyle: {
                backgroundColor: 'red',
                shadowColor: 'transparent',
                borderBottomWidth: 0

            }
        }
    }

    state = {
        drag: new Animated.Value(0),
        lyricsLoaded: false,
        renderingInfo: false,
        lyrics: '',
        openInfo: false,
    }

     async componentDidMount(){
        // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
         StatusBar.setHidden(true)
        // const { title, artist } = this.props.navigation.state.params;
        // const url = `https://api.lyrics.ovh/v1/${artist.name}/${title}`
        const url = `https://api.lyrics.ovh/v1/beyonce/halo`

        this._fetchLyrics(url)
    }

    openInfo = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        // LayoutAnimation.configureNext({
        //     duration: 250, 
        //     create: {
        //         type: LayoutAnimation.Types.linear,
        //         property: LayoutAnimation.Properties.scaleX
        //     },
        //     update: {
        //         type: LayoutAnimation.Types.linear,
        //         // springDamping: 0.7,
        //     }
        // });
        this.setState({ openInfo: !this.state.openInfo})
    }


    render() {
        const { openInfo } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={[styles.infoContainer, openInfo ? {height: open} : {height:close}]}>
                        {/* {openInfo ?  */}
                        <Image source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg' }}
                                            style={{ height: 200, width: 200 }}/>
                        {/* : null
                        } */}
                        {/* <Image source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg' }}
                                            style={{ height: 200, width: 200 }}/> */}
                    </View>
                    <MaterialIcons 
                        onPress={this.openInfo}
                        name={openInfo ? 'arrow-drop-up' : 'arrow-drop-down'}
                        size={30}
                        style={{color: 'white'}}/>
                </View>


                <View style={styles.bottomContainer}>

                </View>

            </View>
        )
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
        backgroundColor: 'pink',
        width: width* .8,
        justifyContent: 'flex-end'
    },
    infoContainerClose: {
        // flex: 1,
        height: close,
        backgroundColor: 'pink',
        width: width* .8,
        justifyContent: 'flex-end'
    },
    infoContainerOpen: {
        height: open,
        backgroundColor: 'pink',
        width: width* .8,
        justifyContent: 'flex-end'
    },
    bottomContainer: {
        // flex: 3,
        backgroundColor: 'blue'
    }
    
})
