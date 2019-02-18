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


} from 'react-native'
import { Dimensions } from 'react-native';

class HomeScreen extends Component {
    state ={
        query: "",
        data: [],
        dataId: []

    }

    componentDidMount(){
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
        const url = `https://api.deezer.com/search?q=track:"${query}"&limit=3&order=RANKING?strict=on`;

        fetch(url)
            .then(res => res.json())
            .then((resJson) => {
                this.setState(
                    {
                    data: [...resJson.data]
                    }
                    // this._loadInfo
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
                //    source={{ uri: }} 
                />
                <View>
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
        <TextInput
            placeholder="Search Song ..."
            clearButtonMode="always"
            onChangeText={this._handleQuery}

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
        flex: 1
    },
    loadInfo: {
        flex:1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
})

export default HomeScreen
