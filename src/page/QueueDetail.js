import React, { Component } from 'react';
import { View,Text,StyleSheet,Image } from 'react-native';
import ShopInfo from '../components/ShopInfoComponent';
import { WingBlank,WhiteSpace,Button } from 'antd-mobile';
import px2dp from '../utils/px2pd';
const qrcord = require('../images/qrcord.png');
export default class QueueDetail extends React.Component{

    static navigationOptions ={
        title:'单号详情',
    };

    _cancel(){
        const that = this;
        fetch(url + '/iqescloud/app/queue/queueInfo/id?queueId='+this.props.navigation.state.params.queueInfo.queue.queueId +'&restaurantId='+this.props.navigation.state.params.queueInfo.restaurantId, {
            method: 'DELETE',
        }).then(function(response) {
            return response.json();
        }).then(function (jsonData) {
            that.props.navigation.navigate('home');
        }).catch(function () {
            console.log('获取时间出错');
        });
    }

    gobackHome(){
        this.props.navigation.navigate('home');
    }


    render() {
        return(
            <View style={{flex:1}}>
                <ShopInfo restInfo={ this.props.navigation.state.params.queueInfo.restaurantInfo}/>
                <WhiteSpace size="lg"/>
                <View style={styles.detail}>
                    <WingBlank>
                        <Text>取号时间：</Text>
                    </WingBlank>
                    <WingBlank>
                        <Text style={styles.number}>{this.props.navigation.state.params.queueInfo.queue.queueId}</Text>
                    </WingBlank>
                </View>
                <View style ={styles.queueInfo}>
                    <WingBlank>
                    <View>
                        <Text>餐桌类型</Text>
                        <WhiteSpace />
                        <Text>{this.props.navigation.state.params.queueInfo.queue.tableType.describe || ""}（{this.props.navigation.state.params.queueInfo.queue.tableType.eatMinNumber}-{this.props.navigation.state.params.queueInfo.queue.tableType.eatMaxNumber}人）</Text>
                    </View>
                    </WingBlank>
                    <View>
                        <Text>等待桌位</Text>
                        <WhiteSpace />
                        <Text style={{ color:'#f27242'}}>{this.props.navigation.state.params.queueInfo.queue.waitPopulation}桌</Text>
                    </View>
                    <WingBlank>
                    <View>
                        <Text>预估时间</Text>
                        <WhiteSpace />
                        <Text style={{ color:'#f27242'}}>{this.props.navigation.state.params.queueInfo.queue.waitTime}分钟</Text>
                    </View>
                    </WingBlank>
                </View>
                <View style = {styles.qrcord}>
                    <Image
                        source={qrcord}
                        style={{ height:px2dp(80),width:px2dp(80)}}
                    />
                    <WhiteSpace size="lg"/>
                    <Text style={{color:'#f27242',fontSize:px2dp(10)}}>
                        将二维码对准直立机扫描口，进行扫描
                    </Text>
                </View>
                <WhiteSpace size="xl"/>
                <WingBlank>
                    {
                        this.props.navigation.state.params.flag ?
                        <Button type="primary" style={{backgroundColor:'grey',borderColor:'#dcdcdc'}} onClick={this.gobackHome.bind(this)}>返回首页</Button>
                        :
                        <Button type="primary" style={{backgroundColor:'grey',borderColor:'#dcdcdc'}} onClick={this._cancel.bind(this)}>取消排队</Button>
                    }

                </WingBlank>
            </View>
        )

    }

}

const styles = StyleSheet.create({
    detail:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white'
    },
    number:{
        color:'#f27242',
        fontSize:px2dp(25)
    },
    queueInfo:{
        height:px2dp(70),
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        alignItems:'center'
    },
    qrcord:{
        height:px2dp(200),
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
    }
})