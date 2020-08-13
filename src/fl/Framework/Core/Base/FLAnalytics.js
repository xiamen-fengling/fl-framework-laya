"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var FLAnalyticsConfig_1 = require("../../../Config/FLAnalyticsConfig");
var FLGameConfig_1 = require("../../../Config/FLGameConfig");
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 统计分析
 * zengbinsi
 * 2020-03-06
 */
var FLAnalytics = /** @class */ (function () {
    function FLAnalytics() {
    }
    /**
     * 发送统计事件
     * @param key 事件名
     * @param params 参数
     */
    FLAnalytics.sendEvent = function (key, params) {
        if (FLGameConfig_1["default"].serverConfig.SWITCH_ALADDIN !== 1) {
            return;
        }
        try {
            params = __assign({ shareId: window.userData.share_id, etag: window.userData.etag, hours: (new Date()).getHours() }, params);
            params.token = undefined;
        }
        catch (error) {
        }
        try {
            wx.aldSendEvent && wx.aldSendEvent(key, params);
            // console.log('======>>> FLAnalytics.sendEvent', key);
        }
        catch (error) { }
        try {
            window.uma && window.uma.trackEvent(FLAnalyticsConfig_1.FLAKeyConfig[key], params);
        }
        catch (error) { }
    };
    /**
     * 发送用户统计事件
     * @param key 事件名
     * @param params 参数
     */
    FLAnalytics.sendUserEvent = function (key, params) {
        if (FLGameConfig_1["default"].serverConfig.SWITCH_ALADDIN !== 1) {
            // console.log('禁止打点');
            return;
        }
        window.userData = window.userData || {};
        try {
            params = __assign({ openId: window.userData.openId, first: window.userData.first, todayReg: window.userData.isTodayReg, shareId: window.userData.share_id, etag: window.userData.etag, hours: (new Date()).getHours() }, params);
            params.token = undefined;
        }
        catch (error) {
        }
        try {
            wx.aldSendEvent && wx.aldSendEvent(key, params);
            // console.log('======>>> FLAnalytics.sendUserEvent', key);
        }
        catch (error) { }
        try {
            window.uma && window.uma.trackEvent(FLAnalyticsConfig_1.FLAKeyConfig[key], params);
        }
        catch (error) { }
    };
    /**关卡开始统计 */
    FLAnalytics.sendStageStartEvent = function (stage, name) {
        // console.log('关卡开始打点', stage);
        try {
            wx.aldStage.onStart({
                stageId: stage,
                stageName: name
            });
        }
        catch (error) {
        }
    };
    /**关卡结束统计 */
    FLAnalytics.sendStageEndEvent = function (stage, name, iswin) {
        // console.log('关卡结束打点', stage, iswin);
        try {
            var str = iswin ? "complete" : "fail";
            wx.aldStage.onEnd({
                stageId: stage,
                stageName: name,
                // userId    : "06_bmjrPtlm6_2sgVt7hMZOPfL2M",  //用户ID 可选
                event: str
            });
        }
        catch (error) {
        }
    };
    return FLAnalytics;
}());
exports["default"] = FLAnalytics;
