import React, { Component } from 'react';
import { View,StyleSheet,Text } from 'react-native';
import { SearchBar} from 'antd-mobile';
import {Dimensions} from 'react-native';
import px2dp from '../utils/px2pd';
export default class HeaderSearchBar extends React.Component {
    render(){
        return (
            <View style={styles.headerContent}>
                {/*<View style={styles.header}>*/}
                    {/*<View style={styles.headerPosition}>*/}
                        {/*<Text>西安</Text>*/}
                    {/*</View>*/}
                    <View style={styles.headerSerchBar}>
                        <SearchBar
                            placeholder="Search"
                            onSubmit={value => console.log(value, 'onSubmit')}
                            onClear={value => console.log(value, 'onClear')}
                            onFocus={() => console.log('onFocus')}
                            onBlur={() => console.log('onBlur')}
                            onCancel={() => console.log('onCancel')}
                        />
                    </View>
                {/*</View>*/}
            </View>

        )
    }
}


const styles = StyleSheet.create({
    headerContent :{
        height:px2dp(45),

    },
    header :{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        width:Dimensions.get('window').width,
    },
    headerPosition :{
        flex:1,
    },
    headerSerchBar:{
        flex:4,
    },

})