import React, { Component } from 'react';
import { View,Text,StyleSheet,Image, ScrollView,Modal,TouchableHighlight } from 'react-native';
import px2dp from '../utils/px2pd';
import { List, InputItem, WhiteSpace,Button,Switch  } from 'antd-mobile';
import { WingBlank } from 'antd-mobile';
import ShopInfo from '../components/ShopInfoComponent';
const seatImg = require('../images/seat.jpg');
const loginClose = require('../images/02_close_icon_normal.png');
import Lightbox from 'react-native-lightbox';
import {Dimensions} from 'react-native';
export default class QueueUp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            IsSeat: false,
            IsQueueSuccess:false,
            modalVisible: false,
            eatNumber:'',
            seatNumber:'',
            customerTel:'',
            queueInfo:{
                describe:'',
                eatMaxNumber:'',
                eatMinNumber:'',
                waitPopulation:'',
                waitTime:''
            }

        };
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    changeSeatFlag = () =>{
        let flag = this.state.IsSeat;
        this.setState({
            IsSeat: !flag,
        })
        let info = {
            restaurantId:this.props.navigation.state.params.shopInfo.restaurantId,
            queueInfo: {
                id: this.props.navigation.state.params.shopInfo.queueId,
                eatNumber:this.state.eatNumber,
                seatFlag:false
            }
        }
        if(typeof this.state.eatNumber !== undefined){
            this.updataQueueData(info);
        }
    }


    changeSeatFlagSelf = () =>{
        let flag = this.state.IsSeat;
        this.setState({
            IsSeat: !flag,
        })

        if(typeof this.state.seatNumber !== undefined && this.state.seatNumber !== ''){
            let info = {
                restaurantId:this.props.navigation.state.params.shopInfo.restaurantId,
                queueInfo: {
                    id: this.props.navigation.state.params.shopInfo.queueId,
                    eatNumber:this.state.eatNumber,
                    seatFlag:true,
                    seatNum:this.state.seatNumber
                }
            }
            this.updataQueueData(info);
        }
    }

    //改变用餐人数
    _changeEatNuber= (value) => {
        this.setState({
            eatNumber:value
        });
        let info = {
            restaurantId:this.props.navigation.state.params.shopInfo.restaurantId,
            queueInfo: {
                id: this.props.navigation.state.params.shopInfo.queueId,
                eatNumber:value,
                seatFlag:this.state.IsSeat
            }
        }
        if(value >0 && typeof value !== undefined){
            this.updataQueueData(info);
        }
    }

    //改变座位号
    _changeSeatNumber= (value) =>{
        this.setState({
            seatNumber:value
        });
        let info2 = {
            restaurantId:this.props.navigation.state.params.shopInfo.restaurantId,
            queueInfo: {
                id: this.props.navigation.state.params.shopInfo.queueId,
                eatNumber:this.state.eatNumber,
                seatFlag:this.state.IsSeat,
                seatNum:value
            }
        }
        if(value >0 && typeof value !== undefined){
            this.updataQueueData(info2);
        }
    }

    //更新虚拟排队
    updataQueueData(info){
        const that = this;
        fetch(url + '/iqescloud/app/queue/virtualQueue', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        }).then(function(response) {
            return response.json();
        }).then(function (jsonData) {
            that.setState({ queueInfo: {
                describe:jsonData.localResponse.queueInfo.tableType.describe,
                eatMaxNumber:jsonData.localResponse.queueInfo.tableType.eatMaxNumber,
                eatMinNumBer:jsonData.localResponse.queueInfo.tableType.eatMinNumber,
                waitPopulation:jsonData.localResponse.queueInfo.waitPopulation,
                waitTime:jsonData.localResponse.queueInfo.waitTime
            } });
        }).catch(function () {
        });
    }


    _changeTel= (value) => {
        this.setState({
            customerTel:value
        });
    }

    _queue(){
        this.setState({
            IsQueueSuccess:true
        })
        const that = this;
        fetch(url + '/iqescloud/app/queue/confirmQueue?queueId='
              +this.props.navigation.state.params.shopInfo.queueId +'&tel='
              + this.state.customerTel+'&restaurantId='
              +this.props.navigation.state.params.shopInfo.restaurantId+'&userId='+
              this.props.navigation.state.params.shopInfo.userId, {
            method: 'PATCH',
        }).then(function(response) {
            return response.json();
        }).then(function (jsonData) {
            console.log(jsonData);
            let unsedInfo = {
                eatMinNumber:jsonData.localResponse.queueInfo.tableType.eatMinNumber,
                eatMaxNumber:jsonData.localResponse.queueInfo.tableType.eatMaxNumber,
                queueWaitTable:jsonData.localResponse.queueInfo.waitPopulation,
                queueWaitTime:jsonData.localResponse.queueInfo.waitTime,
                queueNumber:jsonData.localResponse.queueInfo.queueNumber,
                queueStartTime:jsonData.localResponse.queueInfo.queueStartTime,
                extractFlag:jsonData.localResponse.queueInfo.extractFlag,
                tableTypeDescribe:jsonData.localResponse.queueInfo.tableType.describe
            };

            let info = {
                queue:unsedInfo,
                restaurantInfo:that.props.navigation.state.params.shopInfo.restaurantInfo,
                restaurantId:jsonData.localResponse.restaurantId,
                flag:true
            }
            if (jsonData.ErrorCode === '0') {
                that.props.navigation.navigate('detail',{queueInfo:info});
            }
        }).catch(function () {
        });

    }

    componentWillUnmount(){
        if(!this.state.IsQueueSuccess){
            fetch(url + '/iqescloud/app/queue/queueInfo/id?queueId='+this.props.navigation.state.params.shopInfo.queueId +'&restaurantId='+this.props.navigation.state.params.shopInfo.restaurantId, {
                method: 'DELETE',
            }).then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            }).catch(function () {
            });
        }
    }

    static navigationOptions ={
        title:'排队取号',
    };


    render(){
       return (
           <ScrollView>
           <View style={{flex:1}}>
               <ShopInfo restInfo={ this.props.navigation.state.params.shopInfo.restaurantInfo}/>
               <View  style={styles.eatInput}>
                   <WhiteSpace />
                   <WhiteSpace />
                   <List>
                       <InputItem
                           placeholder="请输入用餐人数"
                           value = {this.state.eatNumber}
                           onChange ={this._changeEatNuber}
                       >用餐人数</InputItem>
                   </List>
               </View>
               <View style={styles.IsChooseSeat}>
                       <WingBlank>
                           <Text style={{color:'black'}}>座位</Text>
                       </WingBlank>
                       <View style={styles.buttonList}>
                           <Button  size="small" type="primary" style={{backgroundColor: this.state.IsSeat? 'grey' : '#ffa500',borderColor:this.state.IsSeat? 'grey' : '#ffa500'}}
                                    activeStyle={{backgroundColor: this.state.IsSeat? 'grey' : '#ffa500',borderColor:this.state.IsSeat? 'grey' : '#ffa500'}}   onClick={this.changeSeatFlag}>系统自动匹配座位</Button>
                           <WingBlank>
                               <Button  size="small" type="primary" style={{backgroundColor:this.state.IsSeat? '#ffa500' : 'grey',borderColor:this.state.IsSeat? '#ffa500' : 'grey' }}
                                        activeStyle={{backgroundColor:this.state.IsSeat? '#ffa500' : 'grey',borderColor:this.state.IsSeat? '#ffa500' : 'grey' }}
                                        onClick={this.changeSeatFlagSelf}>自选用餐位置</Button>
                           </WingBlank>
                   </View>
               </View>
               <View  style={{display:this.state.IsSeat ? 'flex' : 'none',flexDirection:'row',backgroundColor:'white',alignItems:'center'}}>
                   <List style={{flex:4}}>
                       <InputItem
                           placeholder="请输入桌号"
                           value = {this.state.seatNumber}
                           onChange ={this._changeSeatNumber}
                       >桌号</InputItem>
                   </List>
                   <TouchableHighlight onPress={() => {
                       this.setModalVisible(!this.state.modalVisible)
                   }} style={{flex:1,justifyContent:'center'}}>
                   <Text style={{color:'#ffa500',fontSize:px2dp(10)}}>查看座位图</Text>
                   </TouchableHighlight>
               </View>
               <WhiteSpace size="lg"/>
               <View style ={styles.queueInfo}>
                   <View>
                       <Text>餐桌类型</Text>
                       <WhiteSpace />
                       <Text>{this.state.queueInfo.describe}（{this.state.queueInfo.eatMinNumBer}-{this.state.queueInfo.eatMaxNumber}人）</Text>
                   </View>
                   <View>
                       <Text>等待桌位</Text>
                       <WhiteSpace />
                       <Text>{this.state.queueInfo.waitPopulation}桌</Text>
                   </View>
                   <View>
                       <Text>预估时间</Text>
                       <WhiteSpace />
                       <Text>{this.state.queueInfo.waitTime}分钟</Text>
                   </View>
               </View>
               <WhiteSpace size="lg"/>
               <View  style={styles.eatInput}>
                   <List>
                       <InputItem
                           placeholder="请输入电话号码"
                           value = {this.state.customerTel}
                           onChange ={this._changeTel}
                       >电话</InputItem>
                   </List>
               </View>
               <WingBlank><Text style={{fontSize:px2dp(10),color:'#ffa500'}}>*建议您输入手机号码，方便我们短信通知</Text></WingBlank>
               <WhiteSpace size="xl"/>
               <WingBlank><Button type="primary" style={{backgroundColor:'#ffa500',borderColor:'#ffa500'}}
                                  onClick={this._queue.bind(this)}
                                  activeStyle={{backgroundColor:'#ffa500',borderColor:'#ffa500'}}
                                 >立即取号</Button></WingBlank>
           </View>
               <Modal
                   animationType={"slide"}
                   transparent={false}
                   visible={this.state.modalVisible}
                   onRequestClose={() => {console.log("Modal has been closed.")}}
               >
                   <ScrollView>
                       <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems:'center',borderBottomColor:'grey', borderStyle:'solid', borderBottomWidth:1}}>
                           <TouchableHighlight onPress={() => {
                               this.setModalVisible(!this.state.modalVisible)
                           }}>
                               <Image source={loginClose} style={{width:50,height:50}}/>
                           </TouchableHighlight>
                           <Text style={{fontSize:22,fontWeight:'bold'}}>座位图</Text>
                           <View/>
                       </View>
                       <Lightbox>
                           <Image
                               style={{ height: px2dp(640),width: Dimensions.get('window').width,margin: px2dp(10)}}
                               source={seatImg}
                           />
                       </Lightbox>
                   </ScrollView>
               </Modal>
           </ScrollView>
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
    }
})





