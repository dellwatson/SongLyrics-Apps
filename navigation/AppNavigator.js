import React from 'react';
import { createAppContainer, 
    createSwitchNavigator, 
    createStackNavigator, 
    createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen'
import BrowseScreen from '../screens/BrowseScreen'
// import AlbumScreen from '../screens/AlbumScreen'
// import ArtistScreen from '../screens/ArtistScreen'
import SongScreen from '../screens/SongScreen'
import { create } from 'uuid-js';

export default createAppContainer(createStackNavigator(
  {
    HomeScreen,
    // SongScreen
  },
  {
    navigationOptions: {

    }
  }
))

const BrowseStack = createStackNavigator(
  {
    BrowseScreen
  },
  {
    navigationOptions: {
      
    }
  }
)

// const AlbumStack = createStackNavigator(
//   {
//     AlbumScreen,
//     ArtistScreen
//   },
//   {
//     navigationOptions: {
      
//     }
//   }
// )

// const ArtistStack = createStackNavigator(
//   {
//     ArtistScreen
//   },
//   {
//     navigationOptions: {
      
//     }
//   }
// )

const SongStack = createStackNavigator(
  {
    SongScreen,
  },
  {
    navigationOptions: {
      
      // header:null
      // headerTransparent: true
    }
  }
)

// export default createAppContainer(createSwitchNavigator({
//   // HomeScreen,
//   // SongStack
// }));

// export default createAppContainer(HomeStack)