import React, { Component } from 'react';
import { Button,StyleSheet,Image,View,Text,ImageBackground,Modal,Animated,TouchableOpacity,TextInput } from 'react-native';
import { Progress,List,Tabs } from 'antd-mobile';
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
                                <Text style={{fontSize:22,paddingBottom:4,fontWeight:'bold'}}>{name}</Text>
                                <Text style={{paddingBottom:6}}>信誉值:{rvalue}</Text>
                                <View style={{flex:1,alignItems:'flex-start',flexDirection:'row'}}>
                                    <Progress percent={percent} position="normal"/>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.InfoList}>
                    <View style={{flex:4}}>
                        <List style={styles.InfoListItems}>
                            <Item arrow="horizontal" thumb="../images/06_order_icon.png" onClick={this.initOrder}>我的订单</Item>
                        </List>
                        <List style={styles.InfoListItems}>
                            <Item extra='500' thumb="../images/06_order_icon.png">会员积分</Item>
                        </List>
                        <List style={styles.InfoListItems}>
                            <Item arrow="horizontal" thumb="../images/06_order_icon.png" onClick={this.showModal('modal')}>意见反馈</Item>
                        </List>
                            <Modal
                                animationType={'slide'}
                                onRequestClose={() => console.log('onRequestClose...')}
                                visible={this.state.modal}
                            >
                                        <View style={{flex:1,flexDirection:'column',height:50,justifyContent: 'space-between'}}>
                                            <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems:'center',borderBottomColor:'grey', borderStyle:'solid', borderBottomWidth:1,}}>
                                                <Text onClick={this.onClose('modal')}>
                                                    <Image source={loginClose} style={{width:45,height:45}}/>
                                                </Text>
                                                <Text style={{fontSize:22,fontWeight:'bold'}}>登录</Text>
                                                <Text style={{paddingRight:8}} onClick={this.onClose('modal')}>注册</Text>
                                            </View>
                                            <View style={{flex:5,backgroundColor:'#F4F4F4'}}>
                                                <Tabs tabs={tabs} initialPage={0}>
                                                    <View>
                                                        <View style={{flexDirection:'row',backgroundColor:'white',marginTop:10}}>
                                                            <Text style={{flex:1,paddingTop:15,paddingLeft:20,fontWeight:'bold'}}>账号</Text>
                                                            <TextInput placeholder='请输入账号'
                                                                       placeholderTextColor={'#939393'}
                                                                       style={{flex:5}}

                                                            >
                                                            </TextInput>
                                                        </View>
                                                        <View style={{flexDirection:'row',backgroundColor:'white',marginTop:10}}>
                                                            <Text style={{flex:1,paddingTop:15,paddingLeft:20,fontWeight:'bold'}}>密码</Text>
                                                            <TextInput placeholder='请输入密码'
                                                                       placeholderTextColor={'#939393'}
                                                                       style={{flex:5}}

                                                            >
                                                            </TextInput>
                                                        </View>
                                                    </View>

                                                    <View>
                                                        <View style={{flexDirection:'row',backgroundColor:'white',marginTop:10}}>
                                                            <Text style={{flex:1,paddingTop:15,paddingLeft:20,fontWeight:'bold'}}>手机号</Text>
                                                            <TextInput placeholder='请输入手机号'
                                                                       placeholderTextColor={'#939393'}
                                                                       style={{flex:5}}

                                                            >
                                                            </TextInput>
                                                        </View>
                                                        <View style={{flexDirection:'row',backgroundColor:'white',marginTop:10}}>
                                                            <Text style={{flex:1,paddingTop:15,paddingLeft:20,fontWeight:'bold'}}>验证码</Text>
                                                            <TextInput placeholder='请输入验证码'
                                                                       placeholderTextColor={'#939393'}
                                                                       style={{flex:5}}

                                                            >
                                                            </TextInput>
                                                        </View>
                                                        <Text style={{color:'#939393',fontSize:12,paddingTop:10,paddingLeft:60}}>验证码将以短信形式发送至您手机，请注意查收</Text>
                                                    </View>
                                                </Tabs>
                                            </View>
                                        </View>
                            </Modal>
                    </View>
                    <View style={{flex:2}}>
                        <Button
                            onPress={() => this.props.navigation.goBack()}
                            title="退出登录"
                        />
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
    InfoList:{
        flex:4
    },
    InfoListItems:{
        marginBottom:20
    }
});
