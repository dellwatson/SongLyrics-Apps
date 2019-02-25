import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Image,
    Keyboard,
    TextInput,
    FlatList,
    TouchableOpacity,
    Linking
} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import colors from '../constants/Colors'
const { width, height } = Dimensions.get("window");


class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }

    state ={
        query: "",
        data: [],
        dataId: [],
    }

    _handleQuery = (text) => {
        this.setState({
            query: text
        },
        this._fetchInfo
        )
    }

    _fetchInfo = () => {
        const { query, data } = this.state;
        const url = `https://api.deezer.com/search?q=${query}&limit=10&order=RANKING?strict=on`;

        fetch(url)
            .then(res => res.json())
            .then((resJson) => {
                this.setState(
                    {
                        data: resJson.data,
                    }
                )   
            })
    }

    clearQuery = () => {
        // this.setState({
        //     query: '',
        // });
        Keyboard.dismiss()
    }

    _Suggestion = ({ item,  }) => {
        const { navigation } = this.props
        return (
            <TouchableOpacity
                style={styles.suggestion}
                onPress={ () => navigation.navigate('SongScreen', {...item})}
            >
                <Image 
                   source={{uri: item.artist.picture_small}} 
                   style={{width:width*0.08, height:width*0.08, borderRadius:40, marginRight:5}}
                />
                <Text
                    //  style={{backgroundColor:'#1B1D43', color:'white'}}
                    >
                    {item.title} {item.artist.name}
                </Text>
            </TouchableOpacity>
        )
    }

    _renderSuggestion = () => {
        const { data, } = this.state;
        return (
            <FlatList
                data={data} 
                renderItem={this._Suggestion}
                keyExtractor={(item, index) => index.toString()}
            />
        )
    }

  render() {
      const { data, dataId, query, } = this.state;

    return (
      <TouchableOpacity style={styles.container} onPress={this.clearQuery} >
        <View style={[styles.headerContainer, ]}>
            <View style={{paddingLeft: 35}}>
                <Text> Find The Lyrics v.1.0 </Text>
            </View>
            <View style={{
                    width:width*.35, 
                    height: 40, 
                    backgroundColor:colors.lBlue, 
                    borderTopLeftRadius: 20, 
                    borderBottomLeftRadius:20,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-evenly'
                    }}>
                <AntDesign 
                    onPress={()=> Linking.openURL('http://www.instagram.com/dellwatson')}
                    style={{color:'grey'}} 
                    size={20} 
                    name='instagram'/>
                <AntDesign 
                    onPress={()=> Linking.openURL('http://www.github.com/dellwatson')}
                    style={{color:'grey'}} 
                    size={20} 
                    name='github'/>
            </View>
        </View>

        <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
                <TextInput
                    style={{color:'black' , fontSize: 18 }}
                    placeholder="Search Song ... "
                    clearButtonMode="always"
                    onChangeText={this._handleQuery}
                />
                <AntDesign 
                    // onPress={()=> navigation.navigate('BrowseScreen', {...query})}
                    style={{color: colors.pink,}} 
                    size={26} name='search1'/>
            </View>
        </View>

        <View style={{justifyContent:'flex-start', alignItems:'center'}}>
            {query ? this._renderSuggestion(): null}
        </View>
        <View style={styles.devInfoContainer}>
            <View style={{width: width*.5,height:width*.4 , backgroundColor:colors.lBlue, justifyContent:'space-between'}}>
                <View>
                    <Text style={styles.text}>New Design Incoming</Text>
                    <Text style={styles.text}>New Design Incoming</Text>
                    <Text style={styles.text}>New Design Incoming</Text>
                </View>
                <View style={{alignSelf: 'center', width: width*.25 ,flexDirection:'row', justifyContent:'space-around', alignItems:'space-around'}}>
                   
                </View>
            </View>
        </View>
      </TouchableOpacity>
    )
  }
}

//  styles
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        alignItems: 'stretch',
        backgroundColor: '#EDECEC'
    },
    headerContainer:{
        top:15,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ////
    searchContainer: {
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center'

    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width* 0.75,
        height: 50,
        backgroundColor: colors.white,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        borderWidth: 0.2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        // elevation: 0.3,
    },
    containerSuggestion: {
        justifyContent:'center',
        backgroundColor:'green',
    },
    suggestion: {
        width: width* 0.75,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    ////
    devInfoContainer: {
        flex: 4,
        width,
        justifyContent:'center',
        alignItems:'center'
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        color:colors.white
        // color:'grey'
    },

})

export default HomeScreen
