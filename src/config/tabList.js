
import React, { Component } from 'react';
import { TabNavigator } from "react-navigation";
    import { Button,StyleSheet,Image } from 'react-native';
import MyHomeScreen from '../page/HomePage';
import MyInfo from  '../page/MyInfo';

/**
 *   TabNavigator : 配置底部带有选项卡的标签栏
 *   配有两个选项卡
 *   Home：首页  普通配置
 *   myInfor： 个人页面 在个人页面组件中配置标题、icon等信息
 */
const TabList = TabNavigator({
    Home: {
        screen: MyHomeScreen,
    },
    myInfor: {
        screen: MyInfo,
    },
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled:false,
    tabBarOptions: {
        activeTintColor: '#ff8c00',
        style: {
            backgroundColor: 'white',
        },
        showLabel:true, // 是否显示label，默认开启。
        // style:{}, // tabbar的样式。
        // labelStyle:{}, //label的样式。

        // activeTintColor:'', // label和icon的前景色 活跃状态下（选中） 。
        inactiveTintColor:'grey', // label和icon的前景色 不活跃状态下(未选中)。
        showIcon:true, // 是否显示图标，默认关闭。
        // showLabel:true, //是否显示label，默认开启。
        // style:{}, // tabbar的样式。
        // labelStyle:{}, // label的样式。
        upperCaseLabel:false, // 是否使标签大写，默认为true。
        // pressColor:'', // material涟漪效果的颜色（安卓版本需要大于5.0）。
        // pressOpacity:'', // 按压标签的透明度变化（安卓版本需要小于5.0）。
        // scrollEnabled:false, // 是否启用可滚动选项卡。
        // tabStyle:{}, // tab的样式。
        indicatorStyle:{height:0}, // 标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题。
        // labelStyle:{}, // label的样式。
        // iconStyle:{}, // 图标的样式。
    },
});


export default TabList;
