"use strict";
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 工具类
 * 曾彬思
 * 2020-03-05
 */
exports.__esModule = true;
/** 屏幕适配 */
var width = 750;
var height = 1334;
var scaleMode = "fixedwidth";
// 游戏启动的时间戳
var gameStartTime = Math.floor((new Date()).getTime() / 1000);
// ===========================便捷方法====================================
var fl = /** @class */ (function () {
    function fl() {
    }
    /** 初始化 */
    fl.init = function () {
        var frameSize = fl.getFrameSize();
        if (scaleMode === "fixedwidth") {
            var ratio = frameSize.height / frameSize.width;
            fl.visibleSize = new Laya.Size(fl.visibleSize.width, fl.visibleSize.width * ratio);
        }
        else if (scaleMode === "fixedheight") {
            var ratio = frameSize.width / frameSize.height;
            fl.visibleSize = new Laya.Size(fl.visibleSize.height * ratio, fl.visibleSize.height);
        }
    };
    /**
     * 创建一个二维坐标实例
     * @param x
     * @param y
     */
    fl.v2 = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        return new Laya.Vector2(x, y);
    };
    /**
     * 创建一个二维坐标实例
     * @param x
     * @param y
     */
    fl.v3 = function (x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        return new Laya.Vector3(x, y, z);
    };
    /**
     * 创建一个二维坐标实例
     * @param x
     * @param y
     */
    fl.v4 = function (x, y, z, w) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (w === void 0) { w = 0; }
        return new Laya.Vector4(x, y, z, w);
    };
    /**
     * 向量缩放
     * @param v 向量
     * @param ratio 缩放倍数
     */
    fl.v2Mul = function (v, ratio) {
        return fl.v2(v.x * ratio, v.y * ratio);
    };
    /**
     * 向量加法
     * @param v1 向量1
     * @param v2 向量2
     */
    fl.v2Add = function (v1, v2) {
        return fl.v2(v1.x + v2.x, v1.y + v2.y);
    };
    /**
     * 向量减法
     * @param v1 向量1
     * @param v2 向量2
     */
    fl.v2Sub = function (v1, v2) {
        return fl.v2(v1.x - v2.x, v1.y - v2.y);
    };
    /**
     * 向量缩放
     * @param v 向量
     * @param ratio 缩放倍数
     */
    fl.v3Mul = function (v, ratio) {
        return fl.v3(v.x * ratio, v.y * ratio, v.z * ratio);
    };
    /**
     * 向量加法
     * @param v1 向量1
     * @param v2 向量2
     */
    fl.v3Add = function (v1, v2) {
        return fl.v3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    };
    /**
     * 向量减法
     * @param v1 向量1
     * @param v2 向量2
     */
    fl.v3Sub = function (v1, v2) {
        return fl.v3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    };
    /**
     * 创建一个颜色实例
     * @param r
     * @param g
     * @param b
     * @param a
     */
    fl.color = function (r, g, b, a) {
        if (a === void 0) { a = 255; }
        return new Laya.Color(r, g, b, a);
    };
    /**
     * 向量距离
     * @param v1 向量1
     * @param v2 向量2
     */
    fl.v3Distance = function (v1, v2) {
        return Laya.Vector3.distance(v1, v2);
    };
    /**
     * 版本号比较，v1大于v2返回1，v1小于v2返回-1，相等返回0
     * @param v1 版本号1
     * @param v2 版本号2
     */
    fl.compareVersion = function (v1, v2) {
        var v1s = v1.split('.') || [];
        var v2s = v2.split('.') || [];
        var maxLen = v1s.length > v2s.length ? v1s.length : v2s.length;
        var _v1, _v2;
        for (var i = 0; i < maxLen; i++) {
            _v1 = Number(v1s[i] || '0');
            _v2 = Number(v2s[i] || '0');
            if (_v1 > _v2) {
                return 1;
            }
            else if (_v1 < _v2) {
                return -1;
            }
        }
        return 0;
    };
    /**
     * 裁剪过长的字符串
     * @param str 字符串
     * @param maxLen 最大显示几位长度
     * @param addEllipsis 是否在末尾添加省略号
     */
    fl.subLongString = function (str, maxLen, addEllipsis) {
        var newStr = str;
        var len = str.length;
        if (len > maxLen) {
            newStr = newStr.substring(0, maxLen);
            if (addEllipsis) {
                newStr = newStr + '...';
            }
        }
        return newStr;
    };
    /**
     * 获取组件对象
     * @param node 节点
     * @param comName 组件类名
     */
    fl.getComponentByName = function (node, comName) {
    };
    /** 获取游戏运行的秒数 */
    fl.getRunTime = function () {
        return Math.floor((new Date()).getTime() / 1000) - gameStartTime;
    };
    /** 获取游戏设计分辨率 */
    fl.getVisibleSize = function () {
        return fl.visibleSize;
    };
    /** 获取设备屏幕分辨率 */
    fl.getFrameSize = function () {
        return new Laya.Size(Laya.Browser.clientWidth, Laya.Browser.clientHeight);
    };
    fl.EEventName = {
        EVENT_GAME_SHOW: 'EVENT_GAME_SHOW',
        EVENT_GAME_HIDE: 'EVENT_GAME_HIDE'
    };
    /** 设计分辨率 */
    fl.visibleSize = new Laya.Size(width, height);
    fl.V3_FORWARD = fl.v3(0, 0, 1);
    fl.V3_BACKWARD = fl.v3(0, 0, -1);
    fl.V3_LEFT = fl.v3(-1, 0, 0);
    fl.V3_RIGHT = fl.v3(1, 0, 0);
    fl.V3_TOP = fl.v3(0, 1, 0);
    fl.V3_BOTTOM = fl.v3(0, -1, 0);
    return fl;
}());
exports["default"] = fl;
fl.init();
var EZIndex;
(function (EZIndex) {
    // 默认面板
    EZIndex[EZIndex["NORMAL"] = 100] = "NORMAL";
    // 挂件
    EZIndex[EZIndex["WIDGET"] = 5000] = "WIDGET";
    // 一级弹窗
    EZIndex[EZIndex["WINDOW"] = 10000] = "WINDOW";
    // 二级弹窗
    EZIndex[EZIndex["DIALOG"] = 15000] = "DIALOG";
    // 顶层提示
    EZIndex[EZIndex["TIP"] = 29000] = "TIP";
    // 超顶层UI
    EZIndex[EZIndex["MAX"] = 29900] = "MAX";
})(EZIndex = exports.EZIndex || (exports.EZIndex = {}));
