import React, { Component } from 'react';
import { View,Text,StyleSheet,Image } from 'react-native';
import px2dp from '../utils/px2pd';
import {Dimensions} from 'react-native';
import { List, InputItem, WhiteSpace,Button,Switch  } from 'antd-mobile';
import { WingBlank } from 'antd-mobile';
const shop = require('../images/pic1.png');
const phone = require('../images/02_call_button.png');
const loctionIcon = require('../images/02_location_pic.png');
const timeIcon = require('../images/02_time_pic.png');

export default class QueueUp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            IsSeat: false,
            IsReceiveMessage:true
        };
    }

    changeSeatFlag = () =>{
        let flag = this.state.IsSeat;
        this.setState({
            IsSeat: !flag,

        })
    }



    static navigationOptions ={
        title:'排队取号',
    };
    render(){
       return (
           <View style={{flex:1}}>
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
                               <Text style = {{fontSize: 20}}>软件园店</Text>
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
                               <Text style={styles.addressTittle}>地址：陕西省西安市高新区5楼</Text>
                           </View>
                           <View style={styles.address}>
                               <Image
                                   source={timeIcon}
                                   style={{height:10,width:10 }}
                               />
                               <Text style={styles.addressTittle}>营业时间: 11:00 - 23:00</Text>
                           </View>
                       </View>
                   </View>
               </View>
               <View  style={styles.eatInput}>
                   <WhiteSpace />
                   <WhiteSpace />
                   <List>
                       <InputItem
                           placeholder="请输入用餐人数"
                       >用餐人数</InputItem>
                   </List>
               </View>
               <View style={styles.IsChooseSeat}>
                   <WingBlank>
                     <Text style={{color:'black'}}>座位</Text>
                   </WingBlank>
                   <View style={styles.buttonList}>
                       <Button  size="small" type="primary" style={{backgroundColor: this.state.IsSeat? 'grey' : '#ffa500',borderColor:this.state.IsSeat? 'grey' : '#ffa500'}} onClick={this.changeSeatFlag}>系统自动匹配座位</Button>
                       <WingBlank>
                           <Button  size="small" type="primary" style={{backgroundColor:this.state.IsSeat? '#ffa500' : 'grey',borderColor:this.state.IsSeat? '#ffa500' : 'grey'}} onClick={this.changeSeatFlag}>自选用餐位置</Button>
                       </WingBlank>
                   </View>
               </View>
               <View  style={{display:this.state.IsSeat ? 'flex' : 'none'}}>
                   <List>
                       <InputItem
                           placeholder="请输入桌号"
                       >桌号</InputItem>
                   </List>
               </View>
               <WhiteSpace size="lg"/>
               <View style ={styles.queueInfo}>
                   <View style = {styles.queueContent}>
                       <Text>餐桌类型</Text>
                       <WhiteSpace />
                       <Text>小桌（1-4人）</Text>
                   </View>
                   <View>
                       <Text>等待桌位</Text>
                       <WhiteSpace />
                       <Text>4桌</Text>
                   </View>
                   <View>
                       <Text>预估时间</Text>
                       <WhiteSpace />
                       <Text>4桌</Text>
                   </View>
               </View>
               <WhiteSpace size="lg"/>
               <View  style={styles.eatInput}>
                   <List>
                       <InputItem
                           placeholder="请输入电话号码"
                       >电话</InputItem>
                   </List>
               </View>
               <WingBlank><Text style={{fontSize:px2dp(10),color:'#ffa500'}}>*建议您输入手机号码，方便我们短信通知</Text></WingBlank>
               <WhiteSpace size="lg"/>
               <View style={styles.IsChooseSeat}>
                   <WingBlank>
                       <Text style={{color:'black'}}>是否接收排队状态</Text>
                   </WingBlank>
                   <Switch checked={this.state.IsReceiveMessage} color="#ffa500"/>
               </View>
               <WhiteSpace size="xl"/>
               <WingBlank><Button type="primary" style={{backgroundColor:'#ffa500',borderColor:'#ffa500'}}>立即取号</Button></WingBlank>
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
    eatInput:{
        backgroundColor:'white',
    },
    IsChooseSeat:{
        height:px2dp(40),
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        alignItems:'center',
    },
    buttonList:{
        flexDirection:'row',
    },
    queueInfo:{
        height:px2dp(100),
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor:'white',
        alignItems:'center'

    },


})





