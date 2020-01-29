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

//Action Screens
import ProfileAction from './src/action/ProfileAction';
import ProfileViewAction from './src/action/ProfileViewAction'
import ProductListAction from './src/action/ProductListingAction';
import SingleProductAction from './src/action/SingleProductAction';


const AppNavigator = createStackNavigator({
  Profile: { screen: ProfileAction },
  ProfileView: { screen: ProfileViewAction },
  ProductList: { screen: ProductListAction },
  SingleProduct: { screen: SingleProductAction }
},
  {
    initialRouteName: 'ProductList',
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



