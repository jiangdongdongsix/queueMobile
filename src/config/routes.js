import { StackNavigator, SafeAreaView } from 'react-navigation';
import TabList from './tabList';
import QueueUp from '../page/QueueUp';
import Order from '../page/MyOrder';
import SectionListBasics from '../page/Menu';
import SignUp from '../page/SignUp';
import QueueDetail from '../page/QueueDetail';
import FeedBack from '../page/FeedBack';
import Signin from '../page/Login';

/**
 * 项目路由器
 * StackNavigator ：堆栈路由器
 * TabList ： 底部标签栏
 * 路由Api：https://reactnavigation.org/docs/navigators
 */
const Routes = StackNavigator({
    home: { screen: TabList },
    queue:{ path:'queue/:shopInfo',screen: QueueUp },
    order:{ screen: Order},
    menu:{screen: SectionListBasics},
    signUp:{screen:SignUp},
    detail:{path:'detail/:queueInfo',screen: QueueDetail},
    feedback:{screen: FeedBack},
    signin:{screen:Signin}
});

export default Routes;
