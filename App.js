/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import ProfileAction from './src/action/ProfileAction';
import ProfileViewAction from './src/action/ProfileViewAction'

const AppNavigator = createStackNavigator({
  Profile: { screen: ProfileAction },
  ProfileView: { screen: ProfileViewAction }, 
},
{
  initialRouteName: 'Profile',
}
)

const AppContainer = createAppContainer(AppNavigator);
const store = configureStore();

export default class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}



