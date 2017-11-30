import React, {Component} from 'react';
import {Image, View, StyleSheet, Text, FlatList,Modal,TextInput} from 'react-native';
import {Button, WingBlank, WhiteSpace,Progress,List,Tabs} from 'antd-mobile';
import HeaderSearchBar from '../components/HeaderSearchBar';
import px2dp from '../utils/px2pd';
import px2dw from '../utils/px2dw';
import {Dimensions} from 'react-native';
// 底部 正常时的照片
const HomeIcon = require('../images/home_icon_normal.png');
//选中时照片
const HomeIconChecked = require('../images/01_home_icon_check.png')
const shop = require('../images/pic1.png');
const loginClose = require('../images/02_close_icon_normal.png');

const tabs = [
    {title:'账号密码登录'},
    {title:'手机号快速登录'},
];
export default class MyHomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataFlag:true,
            id:'',
            login:false,
            name:"",
            modal:false

        }
    }


    static navigationOptions = {

        // StackNavigator 属性部分

        // title:'Test1', 同步设置导航和tabbar文字,不推荐使用
        // headerTitle:'首页', // 只会设置导航栏文字,
        header: (() => {
            return (
                <HeaderSearchBar/>
            )
        }), // 可以自定义导航条内容，如果需要隐藏可以设置为null
        // header:null,
        // headerBackTitle:null, // 设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null
        // headerTruncatedBackTitle:'', // 设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"。
        // headerRight:{}, // 设置导航条右侧。可以是按钮或者其他。
        // headerLeft:{}, // 设置导航条左侧。可以是按钮或者其他。
        // 设置导航条的样式。如果想去掉安卓导航条底部阴影可以添加elevation: 0,iOS去掉阴影是。
        // 设置导航条文字样式。安卓上如果要设置文字居中，只要添加alignSelf:'center'就可以了
        // headerBackTitleStyle:{}, // 设置导航条返回文字样式。
        // headerTintColor:'green', // 设置导航栏文字颜色。总感觉和上面重叠了。
        gesturesEnabled: true, // 是否支持滑动返回收拾，iOS默认支持，安卓默认关闭
        // TabNavigator 属性部分
        tabBarVisible: true, // 是否隐藏标签栏。默认不隐藏(true)
        tabBarIcon: (({tintColor, focused}) => {
            return (
                <Image
                    source={!focused ? HomeIcon : HomeIconChecked}
                        style={[{height: 25, width: 25}, {tintColor: tintColor}]}
                />
            )
        }), // 设置标签栏的图标。需要单独设置。
        tabBarLabel: '首页', // 设置标签栏的title。推荐这个方式。
    }


    vitural(userinfo,item){
        let that = this;
        fetch(url + "/iqescloud/app/queue/virtualQueue",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                restaurantId: item.restaurantId,
                queueInfo:{
                    customerName:userinfo.name,
                },
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                let info = {
                    restaurantId:responseJson.localResponse.restaurantId,
                    queueId:responseJson.localResponse.id,
                    restaurantInfo:item.restaurantInfo,
                    userId:userinfo.id
                }
                if (responseJson.ErrorCode === '0') {
                    that.props.navigation.navigate('queue',{shopInfo:info});
                }
            }).catch((err) => {
        });
    }

    _handleBack() {
        const navigator = this.props.navigator;
        if (navigator && navigator.getCurrentRoutes().length > 1) {
            navigator.pop();
            return true;
        }
        return false;
    }

    handleSignIn(){
        let that = this;
        fetch(url + '/iqescloud/app/user/login?tel=' + that.state.user +'&password=' + that.state.pwd)
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData);
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
            console.log(storage);
            if(jsonData.ErrorCode === '0'){
                console.log('登录成功');
            }
        }).catch(function () {
            console.log('登录失败');
        });
    }

    handleInputUser(user){
        let that = this;
        that.setState({user:user});
    }

    handleInputPwd(pwd){
        let that = this;
        that.setState({ pwd: pwd });
    }

    goQueue(item) {
        let that = this;
        let userinfo = null;
        storage.load({
            key: 'userInfo',
            autoSync: true,
            syncInBackground: true,
            syncParams: {
                extraFetchOptions: {
                },
                someFlag: true,
            },
        }).then(ret => {
            userinfo= {
                id:ret.id,
                name:ret.userName,
                login:true
            };
            that.vitural(userinfo,item);
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            // console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    that.setState({
                        modal:true
                    });
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        });
    }

    onClose = key=>()=>{
        this.setState({
            [key]:false,
        });
    };

    componentWillMount() {
        const that = this;
        fetch(url + "/iqescloud/app/homePage")
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.ErrorCode === '0') {
                    that.setState({
                        data: responseJson.restaurantList
                    })
                }else {
                    that.setState({
                        dataFlag:false
                    })
                }

            }).catch((error) => {
                that.setState({
                    dataFlag:false
                })
        });
    }

    _keyExtractor = (item, index) => item.restaurantId;

    _keyExtractor2 = (item, index) => item.tableType.id;

    renderqueinfo(item){
        return (
            <View style={styles.queueItem} key={item.tableType.id}>
                <Text style={{width: px2dw(70),fontSize:px2dp(12)}}>{item.tableType.describe}({item.tableType.eatMinNumber}-{item.tableType.eatMaxNumber})人</Text>
                <Text style={{width: px2dw(70),fontSize:px2dp(12)}}>正在排队{item.waitPopulation}桌</Text>
                <Text style={{width: px2dw(70),fontSize:px2dp(12)}}>约{item.waitTime}分钟</Text>
            </View>
        )
    }


    renderItem(item) {
        return (
            <View style={styles.shopContent} key={item.restaurantId}>
                <View style={styles.shop}>
                    <View style={styles.shopName}>
                        <WingBlank><Text>{item.restaurantInfo.name}</Text></WingBlank>
                        <View style={styles.buttonList}>
                            <Button type="primary" size="small"
                                    style={{backgroundColor: '#ffa500', borderColor: '#ffa500'}}
                                    activeStyle={{backgroundColor: '#ffa500', borderColor: '#ffa500'}}
                                    onClick = {() => this.props.navigation.navigate('menu')}
                            >菜单预览</Button>
                            <WingBlank>
                                <Button type="primary" size="small"
                                        style={{backgroundColor: '#ff4500', borderColor: '#ff4500'}}
                                        activeStyle={{backgroundColor: '#ff4500', borderColor: '#ff4500'}}
                                        onClick={this.goQueue.bind(this,item)}>排队取号</Button>

                            </WingBlank>
                        </View>
                    </View>
                    <View style={styles.shopQueue}>
                        <WingBlank style={{width:px2dw(70)}}>
                            <Image
                                source={shop}
                                style={{height: 85, width: 85}}
                            />
                        </WingBlank>

                        <FlatList
                                data={item.queueInfos.queueInfo}
                                renderItem={
                                    ({item}) => this.renderqueinfo(item)
                                    }
                                style={{width: px2dw(250) }}
                                keyExtractor={this._keyExtractor2}
                            />

                    </View>
                    <View style={styles.address}>
                        <WingBlank><Text style={styles.fontSmall}>地址：{item.restaurantInfo.address}</Text></WingBlank>
                        <WingBlank><Text style={styles.fontSmall}>1.8公里</Text></WingBlank>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.state.dataFlag ?
                <FlatList
                data={this.state.data}
                renderItem={({item}) => this.renderItem(item)}
                keyExtractor={this._keyExtractor}
                />
                :
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>网络出现故障</Text>
                </View>
                }

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
        )
    }
}

const styles = StyleSheet.create({
    shopContent: {
        height: px2dp(150),
        backgroundColor: 'white',
        margin: 5,
    },
    shop: {
        flex: 1,
        flexDirection: 'column',

    },
    buttonList: {
        flexDirection: 'row',
    },
    queueItem: {
        width: px2dw(230),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shopName: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    shopQueue: {
        flex: 4,
        flexDirection: 'row',
        width:Dimensions.get('window').width
    },
    address: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fontSmall: {
        fontSize: px2dp(10),
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

})