import React, { Component } from 'react'
import { Text, StyleSheet, View,
    Image,
    StatusBar,
    Animated,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    LayoutAnimation,
    SafeAreaView

 } from 'react-native'
import colors from '../constants/Colors'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const { width, height } = Dimensions.get("window");

const close = 0;
const open = height * .3;


export default class SongScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'HELLO',
            headerStyle: {
                backgroundColor: 'red',
                shadowColor: 'transparent',
                borderBottomWidth: 0
            },
            headerLeft: (
                <MaterialIcons 
                    name='keyboard-arrow-left'
                    size={26}
                    style={{color: 'white'}} />
            ),
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
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        LayoutAnimation.configureNext({
            duration: 250, 
            create: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.scaleX
            },
            update: {
                type: LayoutAnimation.Types.linear,
                // springDamping: 0.7,
            }
        });
        this.setState({ openInfo: !this.state.openInfo})
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
        const { openInfo, lyrics, lyricsLoaded } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={[styles.infoContainer, openInfo ? {height: open} : {height:close}]}>
                        <Image 
                            source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg' }}
                            style={{ height: 200, width: 200 }}/>
                        <View style={styles.infoRight}>
                            <Text>Hello</Text>
                        </View>
                    </View>
                    <MaterialIcons 
                        onPress={this.openInfo}
                        name={openInfo ? 'arrow-drop-up' : 'arrow-drop-down'}
                        size={30}
                        style={{color: 'white'}}/>
                </View>
                <ScrollView style={styles.bottomContainer}>
                    {lyricsLoaded ? <Text>{lyrics}</Text> : null}
                    {/* {kasih refetch or loading} */}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        backgroundColor: 'red',
        justifyContent:'flex-end',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    infoContainer: {
        flexDirection:'row',
        backgroundColor: 'pink',
        width: width* .8,
        justifyContent: 'space-between',
        alignItems:'flex-end',
    },
    infoRight: {
        flex:1,
        height:open,
        backgroundColor: 'blue',
    },
    bottomContainer: {
        flex: 1,
        paddingLeft: width*.1,
        paddingTop: 20,
    }
    
})
