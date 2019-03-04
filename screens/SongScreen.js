import React, { Component } from 'react'
import { Text, StyleSheet, View,
    Image,
    StatusBar,
    Animated,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    LayoutAnimation,
    SafeAreaView,
    UIManager

 } from 'react-native'
import colors from '../constants/Colors'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");
const close = 0;
const open = height * .3;

export default class SongScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <Text style={ styles.textHeader }>{navigation.state.params.title}</Text>,
            headerTintColor: 'white',
            titleStyle:{
                fontSize: 30,
                fontFamily: 'Noto'
            },
            headerStyle: {
                backgroundColor: colors.lBlue,
                shadowColor: 'transparent',
                borderBottomWidth: 0,
                elevation:0,
                shadowOffset: {
                    height: 0,
                }
            },
            headerLeft: (
                <MaterialIcons 
                    onPress={()=> navigation.goBack(null)}
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
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        StatusBar.setHidden(true)
        const { title, artist } = this.props.navigation.state.params;
        const url = `https://api.lyrics.ovh/v1/${artist.name}/${title}`
        // const url = `https://api.lyrics.ovh/v1/beyonce/halo`
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

    _fetchLyrics = (url) => {
        fetch(url)
            .then(res => res.json())
            .then((res) => {
                this.setState({
                    lyrics: res.lyrics,
                    lyricsLoaded: true
                })
            })  
            .catch(err => console.log(err))
    }

    _renderLyrics = () => {
        const { lyrics, lyricsLoaded } = this.state;
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

    render() {
        const { openInfo, lyrics, lyricsLoaded } = this.state
        const { artist } = this.props.navigation.state.params;
        console.log(lyricsLoaded)

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={[styles.infoContainer, openInfo ? {height: open} : {height:close}]}>
                        <Image 
                            source={{ uri: artist.picture_medium }}
                            style={{ height: 200, width: 200, borderRadius: 20, opacity: .9 }}/>
                        <View style={styles.infoRight}>
                            <View style={{alignItems:'flex-start', justifyContent:'center'}}>
                                <Text style={{fontFamily:'Nunito', color: 'white', fontSize: 20}}>Artist</Text>
                                <Text style={{fontFamily:'Noto', color: 'grey', fontSize: 26}}>Hello</Text>
                            </View>
                            <View style={{alignItems:'flex-start', }}>
                                <Text style={{fontFamily:'Nunito', color: 'grey', fontSize: 20}}>Album</Text>
                                <Text style={{fontFamily:'Noto', color: 'grey' ,fontSize: 26}}>Hello</Text>
                            </View>
                        </View>
                    </View>
                    <MaterialIcons 
                        onPress={this.openInfo}
                        name={openInfo ? 'arrow-drop-up' : 'arrow-drop-down'}
                        size={30}
                        style={{color: 'white'}}/>
                </View>
                <ScrollView style={styles.bottomContainer}>
                    {this._renderLyrics()}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    textHeader:{
        fontFamily:'Noto',
        fontSize:36,
        color:'white'
    },
    container: {
        flex: 1,
    },
    topContainer: {
        backgroundColor: colors.lBlue,
        justifyContent:'flex-end',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    infoContainer: {
        flexDirection:'row',
        width: width* .8,
        justifyContent: 'space-between',
        alignItems:'flex-end',
    },
    infoRight: {
        flex:1,
        height:open,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bottomContainer: {
        flex: 1,
        paddingLeft: width*.1,
        paddingTop: 20,
    },
    lyrics: {
        color: 'grey',
        fontFamily: 'Nunito'
    },
    text: {
        color: 'white',
        fontFamily: 'Noto'
    }
    
})
