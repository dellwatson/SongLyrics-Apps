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
        // scrollData: [staticUri, staticUri,staticUri]
    }

    componentDidMount(){
        //load chart
    }
    
    _handleQuery = (text) => {
        this.setState({
            query: text
        },
        this._fetchInfo
            // this._loadInfo
        )
    }

    // use throttle ? check cores ?
    _fetchInfo = () => {
        const { query, data } = this.state;
        const url = `https://api.deezer.com/search?q=${query}&limit=10&order=RANKING?strict=on`;

        fetch(url)
            .then(res => res.json())
            .then((resJson) => {
                this.setState(
                    {
                        data: resJson.data
                    }
                )   
            })
    }

    clearQuery = () => {
        this.setState({
            text: '',
        });
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
                   style={{width:width*0.08, height:width*0.08, borderRadius:40}}
                />
                <Text style={{backgroundColor:'#1B1D43', color:'white'}}>
                    {item.title} {item.artist.name}
                </Text>
            </TouchableOpacity>
        )
    }

    _renderSuggestion = () => {
        const { data, dataId, query } = this.state;
    //   const { navigation } = this.props;
        return (
            <FlatList
                // style={styles.renderSuggestion}
                // contentContainerStyle
                data={data} 
                renderItem={this._Suggestion}
                // navigation={navigation}
                keyExtractor={(item, index) => index.toString()}
            />
        )
    }

  render() {
      const { data, dataId, query } = this.state;
      const { navigation } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={this.clearQuery} >
        <View style={styles.headerContainer}>
            <Text>Header</Text>
            <AntDesign size={26} name='questioncircleo'/>
        </View>

        <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
                <TextInput
                    style={{color:'black' , fontSize: 18 }}
                    placeholder="Search Song ... "
                    // placeholderTextColor= 'black'
                    clearButtonMode="always"
                    onChangeText={this._handleQuery}
                    clearButtonMode="always"
                    // onPress={()=> navigation.navigate('BrowseScreen', {...query})}
                    //search icon pressed.
                />
                <AntDesign style={{color: colors.pink,}} size={26} name='search1'/>
            </View>
        </View>

        <View style={{justifyContent:'center', alignItems:'center'}}>
            {query ? this._renderSuggestion(): null}
        </View>
        <View style={styles.chartsContainer}>
            <Text>TOP CHARTS</Text>
        </View>
        {query ? null : this._renderChartListContainer()}
      </TouchableOpacity>
    )
  }

  _renderChartListContainer = () => {
      return (
        <View style={styles.imageContainer}>

        </View>
      )
  }

  _renderItemCharts = () => {

  }
}

//  styles
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        alignItems: 'stretch',
        backgroundColor: colors.warmWhite
    },
    headerContainer:{
        flex:1,
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    ////
    searchContainer: {
        flex:1.8,
        // backgroundColor: 'green',
        justifyContent: 'center',
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
    ////

    chartsContainer: {
        flex:1,
        // backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ////





    imageContainer: {
        flex:4,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems:'center'
    },

    imageScroll: {
        flex:9,
        // width: width,
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    chartSongTitle: {
        flex:1,
        zIndex: 100,
        // right:width* 0.25,
        bottom:height*0.2
    },

    ////
    font: {
        // fontFamily: 'Menlo',
        fontSize: 36,
        fontWeight: "900"
    },
    //
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
    //
    image: {
        
        width: width/ 2,
        height: width* 0.50,
        // resizeMode: 'contain'
        borderRadius: 20,
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center'
    },
   
    loadInfo: {
        // justifyContent: 'center',
        // alignItems: 'center'
    },
})

export default HomeScreen
