import React, { Component } from 'react';
import { Button,StyleSheet,Image,View,Text,WingBlank,ScrollView,TouchableHighlight } from 'react-native';
import { WhiteSpace,Tabs } from 'antd-mobile';
import px2dp from '../utils/px2pd';
/**
 *  我的订单
 */
const tabs = [
    {title:'未使用订单'},
    {title:'已完成订单'},
];
export default class MyOrder extends React.Component {
    static navigationOptions ={
        title:'我的订单',
    };
    state = {
        restaurantId:1,
        userId:'',
        unused:[],
        history:[],
        restaurantInfo:{}
    };

    componentWillMount(){
        let that = this;
        //获取userId
        storage.load({
            key: 'userInfo',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
            syncInBackground: true,
            // 你还可以给sync方法传递额外的参数
            syncParams: {
                extraFetchOptions: {
                    // 各种参数
                },
                someFlag: true,
            },
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
            // 你只能在then这个方法内继续处理ret数据
            // 而不能在then以外处理
            // 也没有办法“变成”同步返回
            // 你也可以使用“看似”同步的async/await语法
            console.log(ret.id);
            that.setState({
                userId:ret.id
            });
            console.log(that.state.userId);

            fetch(url + '/iqescloud/app/user/order/userId?userId=' +ret.id+ '&restaurantId=1').then(function(response) {
                return response.json();
            }).then(function (jsonData) {
                console.log(jsonData.localResponse);
                let historyInfo = [];
                let unusedInfo = [];
                let lenHistory = jsonData.localResponse.history.length;
                let lenunused = jsonData.localResponse.unused.length;
                let restaurantInfo = jsonData.localResponse.restaurantInfo;
                for(let i=0;i<lenHistory;i++){
                    historyInfo.push({
                        queueNumber: jsonData.localResponse.history[i].queueNumber,
                        eatMinNumber: jsonData.localResponse.history[i].eatMinNumber,
                        eatMaxNumber: jsonData.localResponse.history[i].eatMaxNumber,
                        queueEndTime: jsonData.localResponse.history[i].queueEndTime,
                        queueStartTime: jsonData.localResponse.history[i].queueStartTime,
                        tableTypeDescribe: jsonData.localResponse.history[i].tableTypeDescribe,
                        key:i
                    });
                }

                for(let i=0;i<lenunused;i++) {
                    unusedInfo.push({
                        queueNumber: jsonData.localResponse.unused[i].queueNumber,
                        eatMinNumber: jsonData.localResponse.unused[i].eatMinNumber,
                        eatMaxNumber: jsonData.localResponse.unused[i].eatMaxNumber,
                        queueWaitTable: jsonData.localResponse.unused[i].queueWaitTable,
                        queueWaitTime: jsonData.localResponse.unused[i].queueWaitTime,
                        queueStartTime: jsonData.localResponse.unused[i].queueStartTime,
                        tableTypeDescribe: jsonData.localResponse.unused[i].tableTypeDescribe,
                        key: i
                    });

                    console.log(historyInfo);
                    console.log(unusedInfo);
                    that.setState({
                        history: historyInfo,
                        unused:unusedInfo,
                        restaurantInfo:restaurantInfo
                    });
                }
            }).catch(function () {
                console.log('获取我的订单失败');
            });
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            // console.warn(err.message);
            // switch (err.name) {
            //     case 'NotFoundError':
            //         console.log('丑九怪');
            //         break;
            //     case 'ExpiredError':
            //         // TODO
            //         break;
            // }
        });
    };


    handleDetailOrder(item){
        let that = this;
        let unsedInfo = {
            eatMinNumber:item.eatMinNumber,
            eatMaxNumber:item.eatMaxNumber,
            queueWaitTable:item.queueWaitTable,
            queueWaitTime:item.queueWaitTime,
            queueNumber:item.queueNumber,
            queueStartTime:item.queueStartTime,
            extractFlag:item.extractFlag,
            tableTypeDescribe:item.tableTypeDescribe,
            queueId:item.queueNumber.slice(1)
        };
        let info = {
            queue:unsedInfo,
            restaurantInfo:that.state.restaurantInfo,
            restaurantId:that.state.restaurantId,
            flag:false
        };
        that.props.navigation.navigate('detail',{queueInfo:info});
    }

    render() {
        const that = this;
        const unusedElements=[];      //保存渲染以后 JSX的数组
        if(that.state.unused.length >0){
            for(let unused of that.state.unused){
                    unusedElements.push(
                        <TouchableHighlight onPress={this.handleDetailOrder.bind(this,unused)}>
                        <View style={styles.OrderList} key={unused.key} >
                            <View style={styles.OrderListL}>
                                <Text style={styles.OrderTime}>取号时间:{unused.queueStartTime}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{flex:4}}>需等待桌数</Text>
                                    <Text style={{flex:2}}>预估时间</Text>
                                </View>
                                <View style={styles.OrderResult}>
                                    <Text style={{flex:4,color:'orange',fontSize:px2dp(14)}}>{unused.queueWaitTable}</Text>
                                    <Text style={{flex:2,color:'orange',fontSize:px2dp(14)}}> >{unused.queueWaitTime}</Text>
                                </View>
                            </View>
                            <View style={styles.OrderListR}>
                                <Text style={styles.OrderListRNumber}>{unused.queueNumber}</Text>
                                <Text style={{color:'orange',paddingBottom:8}}>{unused.tableTypeDescribe}</Text>
                                <Text>({unused.eatMinNumber}-{unused.eatMaxNumber})人</Text>
                            </View>
                        </View>
                        </TouchableHighlight>)
            }
        }else{
            unusedElements.push(
                <View style={{justifyContent:'center',alignItems:'center'}}><Text>没有相关订单</Text></View>
            )
        }


        const historyElements=[];
        if(that.state.history.length>0){
            for(let history of that.state.history) {
                historyElements.push(
                    <View style={styles.OrderList} key={history.key}>
                        <View style={styles.OrderListL}>
                            <Text style={styles.OrderTime}>取号时间:{history.queueStartTime}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.OrderTime}>完成时间:{history.queueEndTime}</Text>
                            </View>
                        </View>
                        <View style={styles.OrderListR}>
                            <Text style={styles.OrderListRNumber}>{history.queueNumber}</Text>
                            <Text style={{color: 'orange', paddingBottom: 8}}>{history.tableTypeDescribe}</Text>
                            <Text>({history.eatMinNumber}-{history.eatMaxNumber})人</Text>
                        </View>
                    </View>)
            }
        }else{
            historyElements.push(
                <View style={{justifyContent:'center',alignItems:'center'}}><Text>没有相关订单</Text></View>
            )
        }

        return (
            <ScrollView>
            <View style={styles.Order}>
                <Tabs tabs={tabs} initialPage={0}>
                    <View style={{flex:3}}>
                        {unusedElements}
                    </View>
                    <View style={{flex:3}}>
                        {historyElements}
                    </View>
                </Tabs>
            </View>
            </ScrollView>
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
        padding:px2dp(10),
        marginTop:px2dp(10),
        height:px2dp(100),
        flexDirection:'row'
    },
    OrderListL:{
        flex:4,
        borderRightColor:'#DCDCDC',
        borderStyle:'solid',
        borderRightWidth:1,
        paddingLeft:px2dp(6)
    },
    OrderTime:{
        fontWeight:'bold',
        fontSize:px2dp(16),
        paddingBottom:px2dp(8)
    },
    OrderResult:{
        flexDirection:'row',
        paddingTop:px2dp(8)
    },
    OrderListR:{
        flex:2,
        paddingLeft:px2dp(20)
    },
    OrderListRNumber:{
        fontSize:px2dp(20),
        color:'orange',
        paddingBottom:8
    }
});
