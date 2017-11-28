import { StackNavigator, SafeAreaView } from 'react-navigation';
import TabList from './tabList';
import QueueUp from '../page/QueueUp';
import Order from '../page/MyOrder';
import Menu from '../page/Menu';
import SignUp from '../page/SignUp';
/**
 * 项目路由器
 * StackNavigator ：堆栈路由器
 * TabList ： 底部标签栏
 * 路由Api：https://reactnavigation.org/docs/navigators
 */
const Routes = StackNavigator({
    Home: { screen: TabList },
    queue:{ screen: QueueUp },
    order:{ screen: Order},
    menu:{screen: Menu},
    signUp:{screen : SignUp}
});

export default Routes;
