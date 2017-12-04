import React, { Component } from 'react';
import { StyleSheet,Image,View,Text,ImageBackground,Modal,Animated,TouchableOpacity,TextInput } from 'react-native';
import { Button,Progress,List,Tabs,Toast} from 'antd-mobile';
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
const Item = List.Item;
const tabs = [
    {title:'账号密码登录'},
    {title:'手机号快速登录'},
];
export default class MyInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:'点击登录 >',
            rvalue:'--',
            percent: 50,
            score:'--',
            fadeAnim: new Animated.Value(15),
            modal:false,
            user:'',
            pwd:'',
            login:false
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

    initFeedback = ()=>{
        this.props.navigation.navigate('feedback');
    };

    // initScore=()=>{
    //     this.props.navigation.navigate('signin');
    // };

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

    handleInputUser(user){
        let that = this;
        that.setState({user:user});
    }

    handleInputPwd(pwd){
        let that = this;
        that.setState({ pwd: pwd });
    }

    handleSignOut(){
        let that = this;
        that.props.navigation.goBack();
        that.setState({
            name:'点击登录 >',
            rvalue:'--',
            percent: 50,
            score:'--',
            login:false
        });
        storage.remove({
            key: 'userInfo'
        })
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
                name:ret.userName,
                rvalue:ret.creditValue,
                percent:ret.creditValue,
                score:ret.memberIntegral,
                login:true
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

    handleSignIn(){
        let that = this;
        fetch(url + '/iqescloud/app/user/login?tel=' + that.state.user +'&password=' + that.state.pwd)
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData);
            if(jsonData.ErrorCode === '0'){
                console.log('登录成功');
                Toast.info('登录成功', 1);
                that.setState({
                    modal:false,
                    name:jsonData.user.userName,
                    rvalue:jsonData.user.creditValue,
                    percent: jsonData.user.creditValue,
                    score:jsonData.user.memberIntegral,
                    login:true
                });
                storage.save({
                    key:'userInfo',
                    data: {
                        "creditValue":jsonData.user.creditValue,
                        "id":jsonData.user.id,
                        "memberIntegral":jsonData.user.memberIntegral,
                        "password":jsonData.user.password,
                        "tel":jsonData.user.tel,
                        "userName":jsonData.user.userName
                    },
                    expires: 1000 * 3600
                });
            }else if(jsonData.ErrorCode === '1'){
                console.log(jsonData.ErrorMessage);
                that.setState({
                    modal:false
                });
                Toast.info(jsonData.ErrorMessage);
                Toast.info(jsonData.ErrorMessage,1)
            }
            console.log(storage);
        }).catch(function () {
            console.log('登录失败');
        });
    }

    render() {
        const { percent,name,rvalue } = this.state;
        return (
            <View style={styles.Info}>
                <View style={styles.InfoPerson}>
                    <ImageBackground source={myTopBg} style={{height:px2dp(200)}}>
                        <View style={styles.InfoTitleIcon}>
                            <View>
                                <Image source={mySetNormal} style={{height:px2dp(50),width:px2dp(50) }}/>
                            </View>
                            <View>
                                <Image source={myMessageNormal} style={{height:px2dp(50),width:px2dp(50) }}/>
                            </View>
                        </View>
                        <View style={styles.InfoName}>
                            <View style={{flex:2}} onClick={this.state.login === true ? ()=>{} :this.showModal('modal')}>
                                <Image source={myHead} style={{height:px2dp(85),width:px2dp(85) }}/>
                            </View>
                            <View style={styles.InfoNameGroup}>
                                <Text style={styles.InfoTitleUserName} onPress={this.showModal('modal')}>{name}</Text>
                                <Text style={{paddingBottom:px2dp(10)}}>信誉值:{rvalue}</Text>
                                <View style={styles.InfoUserValueProgress}>
                                    <Progress percent={percent} position="normal"/>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.InfoList}>
                    <View style={{flex:4}}>
                        <List style={styles.InfoListItems} key={1}>
                            <Item arrow="horizontal" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" onClick={this.state.login === false ? this.showModal('modal') : this.initOrder}>我的订单</Item>
                        </List>
                        <List style={styles.InfoListItems} key={2}>
                            <Item extra={this.state.score} thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png">会员积分</Item>
                        </List>
                        <List style={styles.InfoListItems} key={3}>
                            <Item arrow="horizontal" thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png" onClick={this.state.login === false ? this.showModal('modal') : this.initFeedback}>意见反馈</Item>
                        </List>
                            <Modal
                                animationType={'slide'}
                                onRequestClose={() => console.log('onRequestClose...')}
                                visible={this.state.modal}
                            >
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
                                                            <Button onClick={this.handleSignIn.bind(this)} type="primary" style={{backgroundColor:'#F27241',borderWidth:0}} activeStyle={{backgroundColor:'#F27241',borderWidth:0}}>登录</Button>
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
                                                            <Button onPress={this._handleBack.bind(this)} type="primary" style={{backgroundColor:'#F27241',borderWidth:0}}>登录</Button>
                                                        </View>
                                                    </View>
                                                </Tabs>
                                            </View>
                                        </View>
                            </Modal>
                    </View>
                    <View style={{flex:2}}>
                        <Button onClick={this.handleSignOut.bind(this)} style={{display: this.state.login === false ? 'none':'flex'}}> 退出登录</Button>
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
        padding:px2dp(6)
    },
    InfoName:{
        flex:2,
        flexDirection:'row',
        padding:px2dp(6)
    },
    InfoNameGroup:{
        flex:4
    },
    InfoTitleUserName:{
        fontSize:px2dp(20),
        paddingBottom:px2dp(4),
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
        marginBottom:px2dp(20)
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
