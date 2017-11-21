/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import Routes from './src/config/routes';

/**
 * App入口
 */
export default class App extends Component {

    render() {
        return(
            <Routes />
        )
    }
}


