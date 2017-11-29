/**
 * 获取设备高度和宽度
 * 输出:
 *     整个设备宽度
 *     将高度分成640 份的函数，传入所需高度大小
 */
import {Dimensions} from 'react-native';

// device width/height
// 获取设备宽度
const deviceWidthDp = Dimensions.get('window').width;
//获取设备高度
// const deviceHeightDp = Dimensions.get('window').height;
// design width/height
const uiWidthPx = 320;

export default function px2dw(uiElementWx) {
    //console.log(deviceWidthDp);
    //console.log(deviceHeightDp);
    return uiElementWx *  deviceWidthDp / uiWidthPx;
}
