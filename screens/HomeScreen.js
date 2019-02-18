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

} from 'react-native'
import { Dimensions } from 'react-native';
import window from '../constants/Layout'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
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
                    data: resJson.data
                    },
                //   console.log(data)
                )   
            })
    }



  render() {
      const { data, dataId } = this.state;
      console.log('render')
    //   const loadInfo = data && data.map((item, index) => {
    //     //   console.log(item.artist.name)
    //     //   console.log(item.album.title)

    //       return (
    //         <Text 
    //             style={{flex:1, flexDirection:'row'}}
    //             key={item.id}
    //         >
    //             {item.artist.name}
    //         </Text>
    //       )

    //   })

    return (
      <View style={styles.container}>
        <TextInput
            placeholder="Search Song ..."
            clearButtonMode="always"
            onChange={this._handleQuery}
        />
        <FlatList
            data={data} 
            renderItem={({item}) => {
                return (
                <Text style={styles.text}>{item.artist.name}</Text>
                )
            }}
            keyExtractor={(item, index) => index.toString()}
        />
        {/* {loadInfo} */}

        <Text>window width: {window.width}</Text>
        <Text>awindow height: {window.height}</Text>
      </View>
    )
  }
}

//  styles
const styles = StyleSheet.create({
    container: {
        flex:2,
        paddingTop:20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    loadInfo: {
        flex:1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
})

export default HomeScreen
