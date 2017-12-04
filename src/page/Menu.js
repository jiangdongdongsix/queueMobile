import React, { Component } from 'react';
import {Image, View, StyleSheet, Text, FlatList,ScrollView} from 'react-native';
import {Button, WingBlank, WhiteSpace} from 'antd-mobile';
import px2dp from '../utils/px2pd';
const shop = require('../images/pic1.png');

export default class SectionListBasics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataFlag:true,
        }
    }

    static navigationOptions ={
        title:'菜单预览',
    };


    componentWillMount() {
        const that = this;
        fetch(url + "/iqescloud/app/menus?restaurantId=1")
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.ErrorCode === '0') {
                    that.setState({
                        data: responseJson.menus.menus
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

    _keyExtractor = (item, index) => item.id;



    renderItem(item) {
        return(
            <View style={{flexDirection:'row',alignItems:'center',marginTop:px2dp(10),backgroundColor:'white'}}>
                <WingBlank>
                    <Image
                        source={shop}
                        style={{height: 85, width: 85}}
                    />
                </WingBlank>

                <View>
                    <Text style={{fontSize:px2dp(15)}}>{item.menuName}</Text>
                    <Text style={{marginTop:px2dp(5),color:"#ff4500"}}>￥{item.memberMenuPrice}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <ScrollView style={{flex: 1}}>
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

            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})