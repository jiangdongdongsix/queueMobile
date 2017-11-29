/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from "react";
import { View } from 'react-native'
import { Provider, connect } from "react-redux";
import Routes from './src/config/routes';
import './src/config/constants';
import './src/config/storage';


/**
 * App入口
 */
export default class App extends Component {

    render() {
        return(
            <View style = {{flex:1}}>
                <Routes />
            </View>
        )
    }
}


