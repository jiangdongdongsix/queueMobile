
import React, { Component } from 'react';
import { View,Text,StyleSheet,Image } from 'react-native';
import { WingBlank  } from 'antd-mobile';
import px2dp from '../utils/px2pd';
const shop = require('../images/pic1.png');
const phone = require('../images/02_call_button.png');
const loctionIcon = require('../images/02_location_pic.png');
const timeIcon = require('../images/02_time_pic.png');

/**
 * 排队取号和单号详情页面底部的门店信息
 */
export default class ShopInfo extends React.Component{
    render(){
        return(
            <View style={styles.shopInfo}>
                <View style={styles.shop}>
                    <WingBlank>
                        <Image
                            source={shop}
                            style={{height:85,width:85 }}
                        />
                    </WingBlank>
                    <View style={styles.shopLeft}>
                        <View style={styles.title}>
                            <Text style = {{fontSize: 20}}>{this.props.restInfo.name}</Text>
                            <WingBlank>
                                <Image
                                    source={phone}
                                    style={{height:30,width:30 }}
                                />
                            </WingBlank>
                        </View>
                        <View style={styles.address}>
                            <Image
                                source={loctionIcon}
                                style={{height:10,width:10 }}
                            />
                            <Text style={styles.addressTittle}>地址：{this.props.restInfo.detailAddress}</Text>
                        </View>
                        <View style={styles.address}>
                            <Image
                                source={timeIcon}
                                style={{height:10,width:10 }}
                            />
                            <Text style={styles.addressTittle}>营业时间: {this.props.restInfo.openTime} - {this.props.restInfo.endTime}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    shopInfo:{
        height:px2dp(100),
        backgroundColor:'white'
    },
    shop:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    shopLeft:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center'
    },
    title:{
        flex:3,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    address:{
        flex:1,
        flexDirection:'row',
    },
    addressTittle:{
        fontSize:10
    },
})