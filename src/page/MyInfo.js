import React, { Component } from 'react';
import { StyleSheet,Image,View,Text,ImageBackground,Modal,Animated,TouchableOpacity,TextInput } from 'react-native';
import { Button,Progress,List,Tabs } from 'antd-mobile';
import px2dp from '../utils/px2pd';
/**
 *  我的主页
 */
const myHead = require('../images/06_head_pic.png');
const mySetNormal = require('../images/06_set_icon_normal.png');
const myMessageNormal = require('../images/06_message_icon_normal.png');
const myTopBg = require('../images/06_top_bg.png');
const myIcon = require('../images/user_icon_normal.png');
const myIconChecked = require('../images/01_user_icon_check.png');
const loginClose = require('../images/02_close_icon_normal.png');
const sss = require('../images/06_order_icon.png');
const Item = List.Item;
const tabs = [
    {title:'账号密码登录'},
    {title:'手机号快速登录'},
];
export default class MyInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:'小明',
            rvalue:'优',
            percent: 90,
            fadeAnim: new Animated.Value(15),
            modal:false
        };
    }
    static navigationOptions = {
        title:'我的', // 只会设置导航栏文字
        header:null,
        headerStyle:{
            backgroundColor:'#4ECBFC'
        },
        tabBarIcon:(({tintColor,focused}) => {
            return(
                <Image
                    source={!focused ? myIcon : myIconChecked}
                    style={[{height:25,width:25 }, {tintColor: tintColor}]}
                />
            )
        })
    };

    showModal = key =>(e)=>{
        e.preventDefault();
        this.setState({
            modal: !this.state.modal
        })
    };

    onClose = key=>()=>{
        this.setState({
            [key]:false,
        });
    };

    initOrder = () =>{
        this.props.navigation.navigate('order');
    };


    initMenu = () =>{
        this.props.navigation.navigate('menu');
    };

    _handleBack() {
        const navigator = this.props.navigator;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }
        return false;
    }

    handleSignUp = ()=>{
        this.setState({
            modal: !this.state.modal
        });
        this.props.navigation.navigate('signUp');
    };

    render() {
        const { percent,name,rvalue } = this.state;
        return (
            <View style={styles.Info}>
                <View style={styles.InfoPerson}>
                    <ImageBackground source={myTopBg} style={{height:195}}>
                        <View style={styles.InfoTitleIcon}>
                            <View>
                                <Image source={mySetNormal} style={{height:45,width:45 }}/>
                            </View>
                            <View>
                                <Image source={myMessageNormal} style={{height:45,width:45 }}/>
                            </View>
                        </View>
                        <View style={styles.InfoName}>
                            <View style={{flex:2}}>
                                <Image source={myHead} style={{height:85,width:85 }}/>
                            </View>
                            <View style={styles.InfoNameGroup}>
                                <Text style={styles.InfoTitleUserName}>{name}</Text>
                                <Text style={{paddingBottom:6}}>信誉值:{rvalue}</Text>
                                <View style={styles.InfoUserValueProgress}>
                                    <Progress percent={percent} position="normal"/>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.InfoList}>
                    <View style={{flex:4}}>
                        <List style={styles.InfoListItems}>
                            <Item arrow="horizontal" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" onClick={this.initOrder}>我的订单</Item>
                        </List>
                        <List style={styles.InfoListItems}>
                            <Item extra='500' thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" onClick={this.initMenu}>会员积分</Item>
                        </List>
                        <List style={styles.InfoListItems}>
                            <Item arrow="horizontal" thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" onClick={this.showModal('modal')}>意见反馈</Item>
                        </List>
                            <Modal
                                animationType={'slide'}
                                onRequestClose={() => console.log('onRequestClose...')}
                                visible={this.state.modal}
                            >
                                        <View style={styles.LoginModal}>
                                            <View style={styles.LoginModalTitle}>
                                                <Text onPress={this.onClose('modal')}>
                                                    <Image source={loginClose} style={{width:120,height:120}}/>
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
                                                                       style={{flex:5}}
                                                                       border={'none'}
                                                            >
                                                            </TextInput>
                                                        </View>
                                                        <View style={styles.LoginTabsUserNumber}>
                                                            <Text style={styles.LoginTabsUserPwd}>密码</Text>
                                                            <TextInput placeholder='请输入密码'
                                                                       placeholderTextColor={'#939393'}
                                                                       style={{flex:5}}
                                                                       border={'none'}
                                                            >
                                                            </TextInput>
                                                        </View>
                                                        <View style={{marginTop: px2dp(20), height: px2dp(50)}}>
                                                            <Button onPress={this._handleBack.bind(this)}  type="primary" style={{backgroundColor:'#F27241',borderWidth:0}}>登录</Button>
                                                        </View>
                                                    </View>

                                                    <View>
                                                        <View style={styles.LoginTabsUserNumber}>
                                                            <Text style={styles.LoginTabsUserNumberText}>手机号</Text>
                                                            <TextInput style={{flex:5}} border={'none'}>+86</TextInput>
                                                            <Text style={{fontSize:px2dp(16),paddingTop:px2dp(10),paddingRight:px2dp(8)}}> > </Text>
                                                        </View>
                                                        <View style={{flexDirection:'row',backgroundColor:'white',marginTop:10}}>
                                                            <Text style={styles.LoginTabsUserPwd}>手机号</Text>
                                                            <TextInput placeholder='请输入手机号'
                                                                       placeholderTextColor={'#939393'}
                                                                       style={{flex:5}}
                                                                       border={'none'}
                                                            >
                                                            </TextInput>
                                                        </View>
                                                        <View style={styles.LoginTabsUserNumber}>
                                                            <Text style={styles.LoginTabsUserPwd}>验证码</Text>
                                                            <TextInput placeholder='请输入验证码'
                                                                       placeholderTextColor={'#939393'}
                                                                       style={{flex:3}}
                                                                       border={'none'}
                                                            >
                                                            </TextInput>
                                                            <Button  size="small" style={styles.LoginTabsPhoneVerify}>请输入验证码</Button>
                                                        </View>
                                                        <Text style={styles.LoginTabsPhoneVerifyMess}>验证码将以短信形式发送至您手机，请注意查收</Text>
                                                        <View style={{marginTop: px2dp(20), height: px2dp(50)}}>
                                                            <Button onPress={this._handleBack.bind(this)} type="primary" style={{backgroundColor:'#F27241',borderWidth:0}}>登录</Button>
                                                        </View>
                                                    </View>
                                                </Tabs>
                                            </View>
                                        </View>
                            </Modal>
                    </View>
                    <View style={{flex:2}}>
                        <Button onPress={() => this.props.navigation.goBack()}> 退出登录</Button>
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
