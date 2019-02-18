import React from 'react';
import { createAppContainer, 
    createSwitchNavigator, 
    createStackNavigator, 
    createDrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen'
import BrowseScreen from '../screens/BrowseScreen'
import AlbumScreen from '../screens/AlbumScreen'
import ArtistScreen from '../screens/ArtistScreen'
import SongScreen from '../screens/SongScreen'

const HomeStack = createStackNavigator(
  {
    HomeScreen
  },
  {
    navigationOptions: {

    }
  }
)

const BrowseStack = createStackNavigator(
  {
    BrowseScreen
  },
  {
    navigationOptions: {
      
    }
  }
)

const AlbumStack = createStackNavigator(
  {
    AlbumScreen
  },
  {
    navigationOptions: {
      
    }
  }
)

const ArtistStack = createStackNavigator(
  {
    ArtistScreen
  },
  {
    navigationOptions: {
      
    }
  }
)

const SongStack = createStackNavigator(
  {
    SongScreen
  },
  {
    navigationOptions: {
      
    }
  }
)

export default createAppContainer(createSwitchNavigator({
  HomeStack,
  BrowseStack,
  AlbumStack,
  ArtistStack,
  SongStack
}));