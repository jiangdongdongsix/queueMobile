import React, { Component } from 'react';
import { Button,StyleSheet,Image,View,Text } from 'react-native';

/**
 *  我的主页
 */
const  myIcon = require('../images/user_icon_normal.png');
const myIconChecked = require('../images/01_user_icon_check.png');
export default class MyInfo extends React.Component {
    static navigationOptions = {
        title:'我的', // 只会设置导航栏文字,
        headerStyle:{
            backgroundColor:'#4ECBFC'
        },
        headerTitleStyle:{
            fontSize:20,
            color:'white',
            alignSelf:'center'
        }, // 设置导航条文字样式。安卓上如果要设置文字居中，只要添加alignSelf:'center'就可以了
        tabBarLabel: '我的',
        tabBarIcon:(({tintColor,focused}) => {
            return(
                <Image
                    source={!focused ? myIcon : myIconChecked}
                    style={[{height:25,width:25 }, {tintColor: tintColor}]}
                />
            )
        })
    };

    render() {
        return (
            <View>
                <Text>我的个人主页</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Go back home"
                />
            </View>
        );
    }
}