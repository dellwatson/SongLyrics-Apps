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
    StatusBar


} from 'react-native'
import { Dimensions } from 'react-native';

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
        const url = `https://api.deezer.com/search?q=${query}&limit=3&order=RANKING?strict=on`;

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
                <Image 
                   source={{ uri: staticUri}} 
                />
                <View>
                    <Text>
                      {item.title}
                    </Text>
                    <Text>
                      {item.artist.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }



  render() {
      const { data, dataId, query } = this.state;
      const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar  hidden />
        <TextInput
            placeholder="Search Song ..."
            clearButtonMode="always"
            onChangeText={this._handleQuery}
            // onPress={()=> navigation.navigate('BrowseScreen', {...query})}
            //search icon pressed.

        />
        <FlatList
            data={data} 
            renderItem={this._Suggestion}
            navigation={navigation}
            keyExtractor={(item, index) => index.toString()}
        />
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
        paddingTop:20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    suggestion: {
        flex: 1,
        flexDirection: 'row'
    },
    loadInfo: {
        flex:1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
})

export default HomeScreen
