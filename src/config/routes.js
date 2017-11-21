import { StackNavigator, SafeAreaView } from 'react-navigation';
import TabList from './tabList';

/**
 * 项目路由器
 * StackNavigator ：堆栈路由器
 * TabList ： 底部标签栏
 * 路由Api：https://reactnavigation.org/docs/navigators
 */
const Routes = StackNavigator({
    Home: { screen: TabList }
});

export default Routes;
