import React, { Component } from 'react';
import { StyleSheet,Image,View,Text,ImageBackground,Modal,Animated,TouchableOpacity,TextInput } from 'react-native';
import { Button,Progress,List,Tabs,WhiteSpaceMenu, ActivityIndicator, NavBar } from 'antd-mobile';
import px2dp from '../utils/px2pd';
/**
 *  菜单预览
 */

const data = [
    {
        value: '1',
        label: 'Food',
        children: [
            {
                label: 'All Foods',
                value: '1',
                disabled: false,
            },
            {
                label: 'Chinese Food',
                value: '2',
            }, {
                label: 'Hot Pot',
                value: '3',
            }, {
                label: 'Buffet',
                value: '4',
            }, {
                label: 'Fast Food',
                value: '5',
            }, {
                label: 'Snack',
                value: '6',
            }, {
                label: 'Bread',
                value: '7',
            }, {
                label: 'Fruit',
                value: '8',
            }, {
                label: 'Noodle',
                value: '9',
            }, {
                label: 'Leisure Food',
                value: '10',
            }],
    }, {
        value: '2',
        label: 'Supermarket',
        children: [
            {
                label: 'All Supermarkets',
                value: '1',
            }, {
                label: 'Supermarket',
                value: '2',
                disabled: true,
            }, {
                label: 'C-Store',
                value: '3',
            }, {
                label: 'Personal Care',
                value: '4',
            }],
    },
    {
        value: '3',
        label: 'Extra',
        isLeaf: true,
        children: [
            {
                label: 'you can not see',
                value: '1',
            },
        ],
    },
];

export default class Menu extends React.Component {
    static navigationOptions ={
        title:'菜单预览',
    };
    constructor(...args) {
        super(...args);
        this.state = {
            initData: '',
            show: false,
        };
    }
    onChange = (value) => {
        let label = '';
        data.forEach((dataItem) => {
            if (dataItem.value === value[0]) {
                label = dataItem.label;
                if (dataItem.children && value[1]) {
                    dataItem.children.forEach((cItem) => {
                        if (cItem.value === value[1]) {
                            label += ` ${cItem.label}`;
                        }
                    });
                }
            }
        });
        console.log(label);
    }
    handleClick = (e) => {
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
            show: !this.state.show,
        });
        // mock for async data loading
        if (!this.state.initData) {
            setTimeout(() => {
                this.setState({
                    initData: data,
                });
            }, 500);
        }
    }

    onMaskClick = () => {
        this.setState({
            show: false,
        });
    }

    render() {
        const { initData, show } = this.state;
        const menuEl = (
            <Menu
                className="foo-menu"
                data={initData}
                value={['1', '3']}
                onChange={this.onChange}
            />
        );
        return (
            <View className={show ? 'menu-active' : ''}>
                <View>
                    <NavBar
                        leftContent="Menu"
                        mode="light"
                        icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" />}
                        onLeftClick={this.handleClick}
                        className="top-nav-bar"
                    >
                        Here is title
                    </NavBar>
                </View>
                {show ? <View className="menu-mask" onClick={this.onMaskClick} /> : null}
            </View>
        );
    }
}

