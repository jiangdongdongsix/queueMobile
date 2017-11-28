import React, { Component } from 'react';
import { StyleSheet,Image,View,Text,ImageBackground,Modal,Animated,TouchableOpacity,TextInput } from 'react-native';
import { Button,Progress,List,Tabs } from 'antd-mobile';
import px2dp from '../utils/px2pd';
/**
 *  注册
 */


export default class SignUp extends React.Component {
    static navigationOptions = {
        title:'注册', // 只会设置导航栏文字
    };

    render() {
        return (
            <View style={styles.LoginModal}>
                <View style={styles.LoginTabs}>
                        <View>
                            <View style={styles.LoginTabsUserNumber}>
                                <Text style={styles.LoginTabsUserNumberText}>设置账号</Text>
                                <TextInput placeholder='请输入账号'
                                           placeholderTextColor={'#939393'}
                                           style={{flex:3}}
                                           border={'none'}
                                >
                                </TextInput>
                            </View>
                            <View style={styles.LoginTabsUserNumber}>
                                <Text style={styles.LoginTabsUserPwd}>设置密码</Text>
                                <TextInput placeholder='请输入密码'
                                           placeholderTextColor={'#939393'}
                                           style={{flex:3}}
                                           border={'none'}
                                >
                                </TextInput>
                            </View>
                            <View style={styles.LoginTabsUserNumber}>
                                <Text style={styles.LoginTabsUserPwd}>确认输入密码</Text>
                                <TextInput placeholder='请再次输入密码'
                                           placeholderTextColor={'#939393'}
                                           style={{flex:3}}
                                           border={'none'}
                                >
                                </TextInput>
                            </View>
                            <View style={{marginTop: px2dp(80), height: px2dp(50)}}>
                                <Button  type="primary" style={{backgroundColor:'#F27241',borderWidth:0}}>立即注册</Button>
                            </View>
                        </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Info:{
        flex:1
    },
    InfoPerson:{
        flex:2
    },
    InfoTitleIcon:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5
    },
    InfoName:{
        flex:2,
        flexDirection:'row',
        padding:5
    },
    InfoNameGroup:{
        flex:4
    },
    InfoTitleUserName:{
        fontSize:22,
        paddingBottom:4,
        fontWeight:'bold'
    },
    InfoUserValueProgress:{
        flex:1,
        alignItems:'flex-start',
        flexDirection:'row'
    },
    InfoList:{
        flex:4
    },
    InfoListItems:{
        marginBottom:20
    },
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
        fontSize:22,
        fontWeight:'bold',
        paddingBottom:7,
        paddingTop:5
    },
    LoginTabs:{
        flex:5,
        backgroundColor:'#F4F4F4'
    },
    LoginTabsUserNumber:{
        flexDirection:'row',
        backgroundColor:'white',
        marginTop:10
    },
    LoginTabsUserNumberText:{
        flex:1,
        paddingTop:15,
        paddingLeft:20,
        fontWeight:'bold'
    },
    LoginTabsUserPwd:{
        flex:1,
        paddingTop:15,
        paddingLeft:20,
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
