import React, { Component } from 'react'
import { 
    Text, 
    View,
    StyleSheet,
    Image,
    Keyboard,
    StatusBar,
    TextInput,

} from 'react-native'

class HomeScreen extends Component {
    state ={
        query: "",
        data: [],

    }

    _handleQuery = (text) => {
        this.setState({
            query: text
        },
        this._loadInfo
        )
        //straight to change the API instead of state.query? 
    }

    //use throttle ? check cores ?
    _fetchInfo = () => {
        const { query, data } = this.state;
        const url = `https://api.deezer.com/search?q=track:"${query}"&limit=20&order=RANKING?strict=on`;

        fetch(url)
            .then(res => res.json())
            .then((resJson) => {
                this.setState(
                    {
                    data: [...resJson.data]
                    },
                    // this._loadInfo
                )
            })
    }

    _loadInfo = () => {
        const { data } = this.state;
        
    }


  render() {
      const { data } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
            styles={styles.textInput}
            placeholder="Search Song ..."
            clearButtonMode="always"
            onChange={this._handleQuery}
        />
        <Text>{this.state.query}</Text>
        {
            data && data.map((item, index) => {
                return (
                    <Text 
                        style={styles.loadInfo}
                        key={item.id}
                    >
                        {item.title}
                    </Text>
                )
            })
        }
      </View>
    )
  }
}

//  styles
const styles = StyleSheet.create({
    container: {
        flex:1,

    },
    textInput: {
        flex:1,

    },
    loadInfo: {
        flex:1,

    },
})

export default HomeScreen
