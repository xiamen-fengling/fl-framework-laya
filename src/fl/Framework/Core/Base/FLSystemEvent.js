"use strict";
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 系统事件
 * 曾彬思
 * 2020-03-05
 */
exports.__esModule = true;
var FLSystemEvent = /** @class */ (function () {
    function FLSystemEvent() {
    }
    /**
     * 注册事件
     * @param eventName 事件名
     * @param callback 回调函数
     * @param target 调用者
     */
    FLSystemEvent.on = function (eventName, callback, target) {
        !FLSystemEvent.events[eventName] && (FLSystemEvent.events[eventName] = []);
        FLSystemEvent.events[eventName].push({ callback: callback, target: target });
    };
    /**
     * 注销事件
     * @param eventName 事件名
     * @param callback 回调函数
     * @param target 调用者
     */
    FLSystemEvent.off = function (eventName, callback, target) {
        if (!FLSystemEvent.events[eventName]) {
            return;
        }
        var info;
        for (var i = 0; i < FLSystemEvent.events[eventName].length; i++) {
            info = FLSystemEvent.events[eventName][i];
            if (info.callback === callback && info.target === target) {
                return FLSystemEvent.events[eventName].splice(i, 1);
            }
        }
    };
    /**
     * 触发事件
     * @param eventName 事件名称
     * @param data 参数
     */
    FLSystemEvent.emit = function (eventName, data, data1, data2, data3, data4) {
        if (!FLSystemEvent.events[eventName]) {
            return;
        }
        FLSystemEvent.events[eventName].map(function (info) { info.callback.call(info.target, data, data1, data2, data3, data4); });
    };
    // 所有的事件回调
    FLSystemEvent.events = {};
    return FLSystemEvent;
}());
exports["default"] = FLSystemEvent;
window.FLSystemEvent = FLSystemEvent;
