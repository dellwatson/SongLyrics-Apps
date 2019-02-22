import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Image,
    Keyboard,
    StatusBar,
    TextInput,
    FlatList,
    TouchableOpacity,
    Button,
    ScrollView,
    
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import colors from '../constants/Colors'
const { width, height } = Dimensions.get("window");

const staticUri = "https://e-cdns-images.dzcdn.net/images/artist/0707267475580b1b82f4da20a1b295c6/250x250-000000-80-0-0.jpg"


class HomeScreen extends Component {
    state ={
        query: "",
        data: [],
        dataId: []
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
        //straight to change the API instead of state.query? 
    }

    //use throttle ? check cores ?
    _fetchInfo = () => {
        const { query, data } = this.state;
        const url = `https://api.deezer.com/search?q=${query}&limit=10&order=RANKING?strict=on`;

        fetch(url)
            .then(res => res.json())
            .then((resJson) => {
                this.setState(
                    {
                    data: [...resJson.data]
                    }
                )   
            })
    }

    _loadInfo = () => {
        const { data, dataId, query } = this.state;
        console.log(query)
        // data.map((item) => {
        //     console.log(item.id)
        // })
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
                {/* <Image 
                   source={{ uri: staticUri}} 
                /> */}
              
                    <Text style={{backgroundColor:'#1B1D43', color:'white'}}>
                        {item.title} {item.artist.name}
                    </Text>
                    <Text style={{backgroundColor:'#1B1D43',}}>
                        {item.title} {item.artist.name}
                    </Text>
            </TouchableOpacity>
        )
    }

    _renderSuggestion = () => {
        const { data, dataId, query } = this.state;
      const { navigation } = this.props;
        return <FlatList
            style={styles.renderSuggestion}
            data={data} 
            renderItem={this._Suggestion}
            navigation={navigation}
            keyExtractor={(item, index) => index.toString()}
            />
    }

  render() {
      const { data, dataId, query } = this.state;
      const { navigation } = this.props;

    return (
      <View style={styles.container}>
        {/* <StatusBar hidden /> */}
        <View style={styles.searchBar}>
            <TextInput
                style={{color:'black' , fontSize: 18 }}
                placeholder="Search Song ... "
                placeholderTextColor= 'black'
                clearButtonMode="always"
                onChangeText={this._handleQuery}
                clearButtonMode="always"
                // onPress={()=> navigation.navigate('BrowseScreen', {...query})}
                //search icon pressed.

            />
            <Ionicons style={{color: colors.pink,}} size={26} name='md-search'/>
        </View>
        {query ? this._renderSuggestion(): null}

        {/* {this._renderSuggestion()} */}
        <View style={styles.imageContainer}>
            <Image 
                source={{uri: staticUri}}
                style={styles.image}
            />
        </View>

        <Button 
            title="To Lyrics"
            onPress={() => navigation.navigate('SongScreen')}
        />
      </View>
    )
  }

}

//  styles
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'space-around',
        alignItems: 'center',
        // borderColor: 'black',
        // borderWidth: 3,
        backgroundColor: colors.warmWhite
    },
    font: {
        // fontFamily: 'Menlo',
        fontSize: 36,
        fontWeight: "900"
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: height* 0.05,
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
    renderSuggestion:{
        top: height* 0.05,
    },
    suggestion: {
        width: width* 0.75,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        backgroundColor:'green'
    },
    imageContainer:{
        // bottom: height* 0.10,
        // top: height* 0.2,
        // justifyContent: 'flex-end',
        // backgroundColor: '#FFFFFF',
        // borderColor: '#131637',
        // borderWidth: 3,
        width,
        height: width* 0.85,
        alignItems: 'center',
        justifyContent:'center',
    },
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
