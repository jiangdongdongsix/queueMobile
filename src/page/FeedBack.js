import React, { Component } from 'react';
import { StyleSheet,Image,View,Text,WingBlank,TextInput } from 'react-native';
import { Button,List,TextareaItem,ImagePicker } from 'antd-mobile';
import px2dp from '../utils/px2pd';

/**
 *  意见反馈
 */
export default class FeedBack extends React.Component {
    static navigationOptions ={
        title:'意见反馈',
    };

    constructor(props){
        super(props);
        this.state={
            advice:'',
            id:''
        }
    }

    _changeAdvice= (value) => {
        this.setState({
            advice:value
        });
    };


    handleSubmit(){
        let that = this;
        // 读取
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
                id:ret.id.toString()
            });
            fetch(url + '/iqescloud/app/user/feedback?userId='+ that.state.id +'&context=' + that.state.advice, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function(response) {
                return response.json();
            }).then(function (jsonData) {
                console.log(jsonData);
                if(jsonData.ErrorCode === '0'){
                    console.log('反馈成功');
                };
                that.props.navigation.navigate('Home');
            }).catch(function () {
                console.log('网络连接错误');
            });
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        });
    }


    render() {
        return (
            <View style={styles.feedbackBg}>
                <View ><Text style={styles.feedbackTitle}>问题建议</Text></View>
                <View style={{flex:1,marginBottom:px2dp(10)}}>
                    <List style={{borderColor:'#DCDCDC', borderStyle:'solid', borderWidth:1}}>
                        <TextareaItem
                            rows={5}
                            count={240}
                            value={this.state.advice}
                            onChange={this._changeAdvice.bind(this)}
                        />
                    </List>
                </View>
                <View style={{flex:1,paddingLeft:px2dp(20)}}>
                    <ImagePicker
                        onImageClick={(index, fs) => console.log(index, fs)}
                    />
                    <Text>添加照片</Text>
                </View>
                <View style={{flex:1}}>
                    <Button type="primary" style={{backgroundColor:'#F27241',borderWidth:0}} activeStyle={{backgroundColor:'#F27241',borderWidth:0}} onClick={this.handleSubmit.bind(this)}>提交</Button>
                </View>
            </View>
            );
    }
};


const styles = StyleSheet.create({
    feedbackBg:{
      backgroundColor:'white',
        flex:1
    },
    feedbackTitle:{
        padding:px2dp(20),
        borderBottomColor:'#DCDCDC',
        borderStyle:'solid',
        borderBottomWidth:1,
        fontSize:px2dp(16)
    }
})