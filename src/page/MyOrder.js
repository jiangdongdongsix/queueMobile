import React, { Component } from 'react';
import { Button,StyleSheet,Image,View,Text,WingBlank } from 'react-native';
import { WhiteSpace,Tabs } from 'antd-mobile';
import px2dp from '../utils/px2pd';
/**
 *  我的订单
 */
const tabs = [
    {title:'所有订单'},
    {title:'未使用订单'},
];
export default class MyOrder extends React.Component {
    static navigationOptions ={
        title:'我的订单',
    };

    render() {
        return (
            <View style={styles.Order}>
                <Tabs tabs={tabs} initialPage={0}>
                    <View style={{flex:3}}>
                        <View style={styles.OrderList}>
                            <View style={styles.OrderListL}>
                                <Text style={styles.OrderTime}>取号时间:ww2222</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{flex:4}}>需等待桌数</Text>
                                    <Text style={{flex:2}}>预估时间</Text>
                                </View>
                                <View style={styles.OrderResult}>
                                    <Text style={{flex:4,color:'orange'}}>5</Text>
                                    <Text style={{flex:2,color:'orange'}}> >30分钟</Text>
                                </View>
                            </View>
                            <View style={styles.OrderListR}>
                                <Text style={{fontSize:22,color:'orange',paddingTop:6,paddingBottom:8}}>B201</Text>
                                <Text style={{color:'orange',paddingBottom:8}}>小桌</Text>
                                <Text>(1-4)人</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:3}}>
                        <View style={styles.OrderList}>
                            <View style={styles.OrderListL}>
                                <Text>取号时间:ww2222</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{flex:4}}>需等待桌数</Text>
                                    <Text style={{flex:2}}>预估时间</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{flex:4,color:'orange'}}>8</Text>
                                    <Text style={{flex:2,color:'orange'}}> >30分钟</Text>
                                </View>
                            </View>
                            <View style={styles.OrderListR}>
                                <Text>B20</Text>
                                <Text>大桌</Text>
                                <Text>(1-4)人</Text>
                            </View>
                        </View>
                    </View>
                </Tabs>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Order:{
        flex:1,
        flexDirection:'row'
    },
    OrderList:{
        backgroundColor:'white',
        padding:8,
        marginTop:10,
        height:px2dp(100),
        flexDirection:'row'
    },
    OrderListL:{
        flex:4,
        borderRightColor:'#DCDCDC',
        borderStyle:'solid',
        borderRightWidth:1,
        paddingLeft:10
    },
    OrderTime:{
        fontWeight:'bold',
        fontSize:18,
        paddingTop:8,
        paddingBottom:8
    },
    OrderResult:{
        flexDirection:'row',
        paddingTop:8
    },
    OrderListR:{
        flex:2,
        paddingLeft:15
    }
});
