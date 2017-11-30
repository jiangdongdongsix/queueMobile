import React, { Component } from 'react';
import { View,StyleSheet,Text,Image,TextInput } from 'react-native';
import { Button,Tabs } from 'antd-mobile';
import px2dp from '../utils/px2pd';

const loginClose = require('../images/02_close_icon_normal.png');
const tabs = [
    {title:'账号密码登录'},
    {title:'手机号快速登录'},
];
export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user:'',
            pwd:''
        };
    }

    onClose = ()=>{
        this.props.navigation.navigate('Home');
    };


    handleSignUp = ()=>{
        this.props.navigation.navigate('feedback');
    };

    render(){
        return (
            <View style={styles.LoginModal}>
                <View style={styles.LoginModalTitle}>
                    <Text onPress={this.onClose('modal')}>
                        <Image source={loginClose} style={{width:px2dp(120),height:px2dp(120)}}/>
                    </Text>
                    <Text style={styles.LoginModalLoginText}>登录</Text>
                    <Text style={{paddingRight:8}} onPress={this.handleSignUp}>注册</Text>
                </View>
                <View style={styles.LoginTabs}>
                    <Tabs tabs={tabs} initialPage={0}>
                        <View>
                            <View style={styles.LoginTabsUserNumber}>
                                <Text style={styles.LoginTabsUserNumberText}>账号</Text>
                                <TextInput placeholder='请输入账号'
                                           placeholderTextColor={'#939393'}
                                           underlineColorAndroid="transparent"
                                           style={{flex:5}}
                                           onChangeText={(text)=>this.handleInputUser(text)}
                                >
                                </TextInput>
                            </View>
                            <View style={styles.LoginTabsUserNumber}>
                                <Text style={styles.LoginTabsUserPwd}>密码</Text>
                                <TextInput placeholder='请输入密码'
                                           placeholderTextColor={'#939393'}
                                           underlineColorAndroid="transparent"
                                           style={{flex:5}}
                                           secureTextEntry={true}
                                           onChangeText={(text)=>this.handleInputPwd(text)}
                                >
                                </TextInput>
                            </View>
                            <View style={{marginTop: px2dp(20), height: px2dp(50)}}>
                                <Button type="primary" style={{backgroundColor:'#F27241',borderWidth:0}}>登录</Button>
                            </View>
                        </View>

                        <View>
                            <View style={styles.LoginTabsUserNumber}>
                                <Text style={styles.LoginTabsUserNumberText}>中国</Text>
                                <TextInput style={{flex:5}} border={'none'} editable={false}>+86</TextInput>
                                <Text style={{fontSize:px2dp(16),paddingTop:px2dp(10),paddingRight:px2dp(8)}}> > </Text>
                            </View>
                            <View style={{flexDirection:'row',backgroundColor:'white',marginTop:10}}>
                                <Text style={styles.LoginTabsUserPwd}>手机号</Text>
                                <TextInput placeholder='请输入手机号'
                                           placeholderTextColor={'#939393'}
                                           underlineColorAndroid="transparent"
                                           style={{flex:5}}
                                           autoFocus={true}
                                >
                                </TextInput>
                            </View>
                            <View style={styles.LoginTabsUserNumber}>
                                <Text style={styles.LoginTabsUserPwd}>验证码</Text>
                                <TextInput placeholder='请输入验证码'
                                           placeholderTextColor={'#939393'}
                                           underlineColorAndroid="transparent"
                                           style={{flex:3}}
                                >
                                </TextInput>
                                <Button  size="small" style={styles.LoginTabsPhoneVerify}>请输入验证码</Button>
                            </View>
                            <Text style={styles.LoginTabsPhoneVerifyMess}>验证码将以短信形式发送至您手机，请注意查收</Text>
                            <View style={{marginTop: px2dp(20), height: px2dp(50)}}>
                                <Button  type="primary" style={{backgroundColor:'#F27241',borderWidth:0}}>登录</Button>
                            </View>
                        </View>
                    </Tabs>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    LoginModal:{
        flex:1,
        flexDirection:'column',
        height:50,
        justifyContent: 'space-between'
    },
    LoginModalTitle:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        borderBottomColor:'#DCDCDC',
        borderStyle:'solid',
        borderBottomWidth:1
    },
    LoginModalLoginText:{
        fontSize:px2dp(20),
        fontWeight:'bold',
        paddingBottom:px2dp(7),
        paddingTop:px2dp(5)
    },
    LoginTabs:{
        flex:5,
        backgroundColor:'#F4F4F4'
    },
    LoginTabsUserNumber:{
        flexDirection:'row',
        backgroundColor:'white',
        marginTop:px2dp(10)
    },
    LoginTabsUserNumberText:{
        flex:1,
        paddingTop:px2dp(15),
        paddingLeft:px2dp(20),
        fontWeight:'bold'
    },
    LoginTabsUserPwd:{
        flex:1,
        paddingTop:px2dp(15),
        paddingLeft:px2dp(20),
        fontWeight:'bold'
    },
    LoginTabsPhoneVerify:{
        flex:2,
        height:px2dp(35),
        marginTop:px2dp(5)
    },
    LoginTabsPhoneVerifyMess:{
        color:'#939393',
        fontSize:px2dp(12),
        paddingTop:px2dp(10),
        paddingLeft:px2dp(100)
    }
});