import React, { Component } from 'react';
import { Button,StyleSheet,Image } from 'react-native';

export default class MyHomeScreen extends React.Component {

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        );
    }
}