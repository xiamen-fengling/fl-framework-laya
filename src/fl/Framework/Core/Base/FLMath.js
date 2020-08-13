"use strict";
exports.__esModule = true;
var index_1 = require("../../index");
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 数学工具类
 * 曾彬思
 * 2020-03-05
 */
var FLMath = /** @class */ (function () {
    function FLMath() {
    }
    //================数学部分==================
    //================数学部分==================
    //================数学部分==================
    /**
     * 格式化数字长度
     * @param num 整数
     * @param len 格式化后的长度
     */
    FLMath.formatLen = function (num, len) {
        var result = num.toString();
        if (result.length >= len) {
            return result;
        }
        while (result.length < len) {
            result = '0' + result;
        }
        return result;
    };
    /**
     * 格式化显示千位符
     * @param num 要格式化显示的数值
     */
    FLMath.formatToThousands = function (num) {
        return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    };
    /**
     * 格式化单位
     * @param num 要格式化显示的数值
     */
    FLMath.formatToUnitEN = function (num) {
        num = Math.round(num);
        var result = '';
        if (("" + num).length > 15) {
            result = (num / 1000000000000000).toFixed(2) + 'MB';
        }
        else if (("" + num).length > 12) {
            result = (num / 1000000000000).toFixed(2) + 'KB';
        }
        else if (("" + num).length > 9) {
            result = (num / 1000000000).toFixed(2) + 'B';
        }
        else if (("" + num).length > 6) {
            result = (num / 1000000).toFixed(2) + 'M';
        }
        else if (("" + num).length > 3) {
            result = (num / 1000).toFixed(2) + 'K';
        }
        else {
            result = "" + num;
        }
        return result;
    };
    /**
     * 精确数字(会四舍五入) 2.00
     * @param num 数字
     * @param len 精确个数
     *
     */
    FLMath.accurateNum = function (num, len) {
        var n = num.toFixed(len);
        return n - 0;
    };
    /**
     * 精确数字(不会四舍五入) 2.00
     * @param num 数字
     * @param len 精确个数
     *
     */
    FLMath.accurateNewNum = function (num, len) {
        var m = Math.pow(10, len);
        Math.floor(num * m) / m;
        // let n:any = num.toFixed(len);
        return Math.floor(num * m) / m;
    };
    /**
     * 求两点坐标的中点坐标
     * @param p1 第一个点
     * @param p2 第二个点
     */
    FLMath.getMidpointVec2 = function (p1, p2) {
        return index_1["default"].v2((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    };
    /**
     * 对数字进行插值运算
     *
     * @static
     * @param {number} current 当前数值
     * @param {number} target 插值目标
     * @param {number} [ratio=1] 插值系数[0, 1]
     * @returns {number}
     * @memberof FLMath
     */
    FLMath.lerpNumber = function (current, target, ratio) {
        if (ratio === void 0) { ratio = 1; }
        return (target - current) * ratio + current;
    };
    /**
     * 对向量进行插值运算
     *
     * @static
     * @param {cc.Vec2} current 当前向量
     * @param {cc.Vec2} target 插值目标
     * @param {number} [ratio=1] 插值系数[0, 1]
     * @returns {cc.Vec2}
     * @memberof FLMath
     */
    FLMath.lerpVec2 = function (v1, v2, ratio) {
        if (ratio === void 0) { ratio = 1; }
        return index_1["default"].v2(FLMath.lerpNumber(v1.x, v2.x, ratio), FLMath.lerpNumber(v1.y, v2.y, ratio));
    };
    /**
     * 插值颜色
     * @param startColor 当前值
     * @param endColor 目标值
     * @param ratio 插值系数[0, 1]
     */
    FLMath.lerpColor = function (startColor, endColor, ratio) {
        if (ratio === void 0) { ratio = 1; }
        var r = Math.floor(FLMath.lerpNumber(startColor.r, endColor.r, ratio));
        var g = Math.floor(FLMath.lerpNumber(startColor.g, endColor.g, ratio));
        var b = Math.floor(FLMath.lerpNumber(startColor.b, endColor.b, ratio));
        var a = Math.floor(FLMath.lerpNumber(startColor.a, endColor.a, ratio));
        return index_1["default"].color(r, g, b, a);
    };
    /**
     * 加法运算
     * 解决JS浮点运算导致进度错误的bug，支持8位小数长度的矫正
     * @param n1 加数
     * @param n2 加数
     * @param multiple 浮点数倍数
     */
    FLMath.add = function (n1, n2, multiple) {
        if (!multiple) {
            multiple = 1000;
        }
        return Math.floor(n1 * multiple + n2 * multiple) / multiple;
    };
    /**
     * 减法运算
     * 解决JS浮点运算导致进度错误的bug，支持8位小数长度的矫正
     * @param n1 被减数
     * @param n2 减数
     * @param multiple 浮点数倍数
     */
    FLMath.sub = function (n1, n2, multiple) {
        if (!multiple) {
            multiple = 1000;
        }
        return Math.floor(n1 * multiple - n2 * multiple) / multiple;
    };
    /**
     * 乘法运算
     * 解决JS浮点运算导致进度错误的bug，支持8位小数长度的矫正
     * @param n1 乘数
     * @param n2 乘数
     * @param multiple 浮点数倍数
     */
    FLMath.mul = function (n1, n2, multiple) {
        if (!multiple) {
            multiple = 1000;
        }
        return (n1 * multiple) * (n2) / multiple;
    };
    /**
     * 除法运算
     * 解决JS浮点运算导致进度错误的bug，支持8位小数长度的矫正
     * @param n1 被除数
     * @param n2 除数
     * @param multiple 浮点数倍数
     */
    FLMath.div = function (n1, n2, multiple) {
        if (!multiple) {
            multiple = 1000;
        }
        return (n1 * multiple) / (n2) / multiple;
    };
    /**
     * 取余运算
     * 两个数会被取整后运算
     * @param n1 被除数
     * @param n2 除数
     */
    FLMath.mod = function (n1, n2) {
        return Math.floor(n1) % Math.floor(n2);
    };
    /**
     * 幂运算
     * @param x 底数
     * @param y 指数
     */
    FLMath.pow = function (x, y) {
        return Math.pow(x, y);
    };
    /**
     * 开方运算
     * 默认开平方
     * @param x 被开方数
     * @param y 次方
     */
    FLMath.sqrtPow = function (x, y) {
        if (!y) {
            // 默认开平方
            return Math.sqrt(x);
        }
        return Math.pow(x, 1 / y);
    };
    /**
     * 角度转弧度
     * @param angle
     */
    FLMath.rad = function (angle) {
        return Math.PI / 180 * angle;
    };
    /**
     * 弧度转角度
     * @param radian
     */
    FLMath.deg = function (radian) {
        return 180 / Math.PI * radian;
    };
    /**
     * 贝塞尔曲线
     * @param t
     * @param stX 开始点x
     * @param stY 开始点y
     * @param kongzhiX 控制点x
     * @param kongzhiY 控制点y
     * @param endX 结束点x
     * @param endY 结束点y
     */
    FLMath.bezier = function (t, stX, stY, kongzhiX, kongzhiY, endX, endY) {
        if (stX === void 0) { stX = 0; }
        if (stY === void 0) { stY = 0; }
        var tem = 1 - t;
        var pos = new Laya.Point();
        pos.x = tem * tem * stX + 2 * t * tem * kongzhiX + t * t * endX;
        pos.y = tem * tem * stY + 2 * t * tem * kongzhiY + t * t * endY;
        return pos; //返回坐标位置
    };
    //================随机数部分==================
    //================随机数部分==================
    //================随机数部分==================
    /**
     * 随机一个整数，取值区间[min, max]
     * @param min 最小值
     * @param max 最大值
     */
    FLMath.randomNumber = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    /**
     * 随机一个bool值
     */
    FLMath.randomBool = function () {
        var result = 0;
        if (FLMath.randomNumber(1, 10) >= 5) {
            result = 1;
        }
        return !!result;
    };
    /**
     * 随机扇形上的点
     * @param x 坐标x
     * @param y 坐标y
     * @param radius 半径
     * @param startAngle 初始角度
     * @param endAngle 结束角度
     */
    FLMath.getRandomXYInfan = function (x, y, radius, startAngle, endAngle) {
        var angle = startAngle + Math.random() * (endAngle - startAngle);
        var newPoint = new Laya.Point;
        newPoint.x = x + radius * Math.cos(angle);
        newPoint.y = y - radius * Math.sin(angle);
        return newPoint;
    };
    //================数组操作部分==================
    //================数组操作部分==================
    //================数组操作部分==================
    /**
     * 随机返回一个数组中的值
     * @param array 需要取值的数组
     */
    FLMath.arrayRandomValue = function (array) {
        var index = FLMath.randomNumber(0, array.length - 1);
        return array[index];
    };
    /**
     * 获得从arr数组中取出n个项的所有组合
     * @param {array} arr 原始数据集合
     * @param {number} n 要取出的个数
     */
    FLMath.arrayCombine = function (arr, n) {
        var m = arr.length;
        if (n > m) {
            return [];
        }
        n = n || m;
        if (n === m) {
            var result_1 = [];
            result_1.push(arr);
            return result_1;
        }
        // 采用01转换法，将所有被选中的对象标记为1，未选中的标记为0
        var resultIndexs = [], flagArr = [], isEnd = false, i, j, leftCnt;
        // 首先初始化，将数组前n个元素置1，表示第一个组合为前n个数。
        for (i = 0; i < m; ++i) {
            flagArr[i] = i < n ? 1 : 0;
        }
        resultIndexs.push(flagArr.concat());
        // 然后从左到右扫描数组元素值的“10”组合，找到第一个“10”组合后将其变为“01”组合；
        // 同时将其左边的所有“1”全部移动到数组的最左端。
        while (!isEnd) {
            leftCnt = 0;
            for (i = 0; i < m - 1; i++) {
                if (flagArr[i] == 1 && flagArr[i + 1] == 0) {
                    for (j = 0; j < i; j++) {
                        flagArr[j] = j < leftCnt ? 1 : 0;
                    }
                    flagArr[i] = 0;
                    flagArr[i + 1] = 1;
                    var aTmp = flagArr.concat();
                    resultIndexs.push(aTmp);
                    // 当第一个“1”移动到数组的m-n的位置，即n个“1”全部移动到最右端时，就得到了最后一个组合
                    if (aTmp.slice(-n).join("").indexOf('0') == -1) {
                        isEnd = true;
                    }
                    break;
                }
                flagArr[i] == 1 && leftCnt++;
            }
        }
        // return resultIndexs;
        // 将对应选中的下标转换成原始数组的数据进行填充到结果
        var result = [];
        for (var i_1 = 0; i_1 < resultIndexs.length; i_1++) {
            result[i_1] = [];
            var ri = resultIndexs[i_1];
            for (var j_1 = 0; j_1 < ri.length; j_1++) {
                if (ri[j_1] === 1) {
                    result[i_1].push(arr[j_1]);
                }
            }
        }
        return result;
    };
    /**
     * 验证对象是否在数组中
     *
     * @static
     * @param {*} value 要验证的对象
     * @param {*} arr 数组
     * @returns {boolean}
     * @memberof FLMath
     */
    FLMath.checkInArray = function (value, arr) {
        return arr.indexOf(value) !== -1;
    };
    /**
     * 数组洗牌
     * @param arr 数组
     */
    FLMath.shuffle = function (arr) {
        for (var i = arr.length - 1; i >= 0; i--) {
            var randomIndex = Math.floor(Math.random() * (i + 1));
            var itemAtIndex = arr[randomIndex];
            arr[randomIndex] = arr[i];
            arr[i] = itemAtIndex;
        }
        return arr;
    };
    //================渲染和图形学部分==================
    //================渲染和图形学部分==================
    //================渲染和图形学部分==================
    /**
     * 0~255类型的颜色转换为0.0~1.0的颜色
     * @param color 颜色(带rgba属性)
     * @param isStruct 是否结构体，默认返回cc.Color
     */
    FLMath.colorFloat = function (color, isStruct) {
        if (isStruct === void 0) { isStruct = false; }
        if (isStruct) {
            return { r: color.r / 255, g: color.g / 255, b: color.b / 255, a: color.a / 255 };
        }
        else {
            return index_1["default"].color(color.r / 255, color.g / 255, color.b / 255, color.a / 255);
        }
    };
    /**
     * 0.0~1.0类型的颜色转换为1~255的颜色
     * @param color 颜色(带rgba属性)
     * @param isStruct 是否结构体，默认返回cc.Color
     */
    FLMath.colorInt = function (color, isStruct) {
        if (isStruct === void 0) { isStruct = false; }
        if (isStruct) {
            return { r: Math.floor(color.r * 255), g: Math.floor(color.g * 255), b: Math.floor(color.b * 255), a: Math.floor(color.a * 255) };
        }
        else {
            return index_1["default"].color(Math.floor(color.r * 255), Math.floor(color.g * 255), Math.floor(color.b * 255), Math.floor(color.a * 255));
        }
    };
    /**
     * 转换颜色对象为cc.Color类型
     * @param color rbga
     */
    FLMath.colorToClass = function (color) {
        if (color.a === null || color.a === undefined) {
            color.a = 255;
        }
        return index_1["default"].color(color.r, color.g, color.b, color.a);
    };
    return FLMath;
}());
exports["default"] = FLMath;
// 设置随机种子
Math.seed = Date.now();
Math.random = function () {
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    return Math.seed / 233280.0;
};
