import React from 'react';
import { createAppContainer, 
    createSwitchNavigator, 
    createStackNavigator, 
  } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen'
import BrowseScreen from '../screens/BrowseScreen'
import SongScreen from '../screens/SongScreen'

export default createAppContainer(createStackNavigator(
  {
    HomeScreen,
    SongScreen,
    BrowseScreen
  },
  {
    navigationOptions: {

    }
  }
))

// const BrowseStack = createStackNavigator(
//   {
//     BrowseScreen
//   },
//   {
//     navigationOptions: {
      
//     }
//   }
// )


// const SongStack = createStackNavigator(
//   {
//     SongScreen,
//   },
//   {
//     navigationOptions: {
      
//     }
//   }
// )

// export default createAppContainer(createSwitchNavigator({
//   // HomeScreen,
//   // SongStack
// }));

// export default createAppContainer(HomeStack)