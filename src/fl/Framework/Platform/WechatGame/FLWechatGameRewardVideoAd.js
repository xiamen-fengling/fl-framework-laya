"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var FLBehavior_1 = require("../../Core/FLBehavior");
var FLDevice_1 = require("../../Core/Base/FLDevice");
var FLStore_1 = require("../../Core/Base/FLStore");
var AppConfig_1 = require("../../../Config/AppConfig");
var GameDataCenter_1 = require("../../../Config/GameDataCenter");
var FLSystemEvent_1 = require("../../Core/Base/FLSystemEvent");
var FLNetHTTP_1 = require("../../Core/Network/FLNetHTTP");
var FLGameConfig_1 = require("../../../Config/FLGameConfig");
var FLAnalytics_1 = require("../../Core/Base/FLAnalytics");
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 激励视频广告组件
 * zengbinsi
 * 2018-08-27
 * 2018-10-26
 */
var FLWechatGameRewardVideoAd = /** @class */ (function (_super) {
    __extends(FLWechatGameRewardVideoAd, _super);
    function FLWechatGameRewardVideoAd() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop { name: adUnitId, type: String, tips: '视频广告单元ID，由微信官方提供' } */
        _this.adUnitId = '';
        /** @prop { name: adConfigKey, type: String, tips: '广告单元ID预埋Key，用于从服务端获取的配置中读取广告单元，服务端获取广告配置后要设置到FLWechatGameRewardVideoAd组件的adConfig属性上。该配置会覆盖默认的adUnitId属性' } */
        _this.adConfigKey = '';
        /** @prop { name: adVideoPlayTag, type: String, tips: '播放标识，用于播放状态回调事件的识别' } */
        _this.adVideoPlayTag = '';
        /** @prop { name: debugVideoAd, type: Bool, default: false, tips: '是否开启调试，调试用于在没有视频广告的时候验证回调逻辑是否正确' } */
        _this.debugVideoAd = false;
        /** @prop { name: debugAdResult, type: Option, default: "successed", option: "successed,failed,loadfailed", tips: '调试结果设置。successed:播放成功, failed:玩家中途关闭视频, loadfailed:视频加载失败' } */
        _this.debugAdResult = 'successed';
        // @prop({ type: [cc.Component.EventHandler], tooltip: '视频关闭的回调。回调函数包含两个参数，第一个参数是error错误信息，第二个参数是result播放成功的信息' })
        _this.closeCallbacks = [];
        return _this;
    }
    FLWechatGameRewardVideoAd.prototype.recreateRewardedVideoAd = function (datas) {
        if (FLWechatGameRewardVideoAd.videoAd) {
            return;
        }
        this.adConfigKey = this.adConfigKey.trim();
        if (this.adConfigKey.length > 0) {
            this.adUnitId = datas[this.adConfigKey] || this.adUnitId;
        }
        this.createRewardedVideoAd(this.adUnitId);
    };
    /**
     * 创建激励视频广告组件（全局单例）
     *
     * 用户观看完视频，系统触发 FLWechatMiniGame.EEventType.AD_VIDEO_PLAYER_ENDED
     * 用户中途退出，系统触发 FLWechatMiniGame.EEventType.AD_VIDEO_PLAYER_CANCELLED
     *
     * @param adUnitd 广告ID
     */
    FLWechatGameRewardVideoAd.prototype.createRewardedVideoAd = function (adUnitId) {
        if (FLDevice_1["default"].isWechatGame() || !adUnitId || adUnitId.length === 0) {
            return;
        }
        if (!FLWechatGameRewardVideoAd.videoAd || FLWechatGameRewardVideoAd.currentAdUnitId !== adUnitId) {
            FLWechatGameRewardVideoAd.videoAd = wx.createRewardedVideoAd({ adUnitId: adUnitId });
            FLWechatGameRewardVideoAd.currentAdUnitId = adUnitId;
        }
        if (!FLWechatGameRewardVideoAd.videoAd) {
            return;
        }
        // FLWechatGameRewardVideoAd.videoAd.onLoad((err)=>{});
        // FLWechatGameRewardVideoAd.videoAd.onClose((err)=>{});
        // FLWechatGameRewardVideoAd.videoAd.onError((err)=>{});
        try {
            FLWechatGameRewardVideoAd.videoAd.offLoad();
            FLWechatGameRewardVideoAd.videoAd.offClose();
            FLWechatGameRewardVideoAd.videoAd.offError();
        }
        catch (error) { }
    };
    /**
     * 显示并播放激励广告视频
     */
    FLWechatGameRewardVideoAd.prototype.showRewardVideoAd = function () {
        var _this = this;
        if (this.debugVideoAd) {
            if (this.debugAdResult === 'successed') {
                this.closeCallbacks.map(function (fn) { return fn.runWith([undefined, { msg: '视频调试模拟播放成功' }]); });
            }
            else if (this.debugAdResult === 'failed') {
                this.closeCallbacks.map(function (fn) { return fn.runWith([{ msg: '视频调试模拟您关闭了视频' }]); });
            }
            else {
                this.closeCallbacks.map(function (fn) { return fn.runWith([{ msg: '视频调试模拟加载视频失败' }]); });
            }
            return console.warn('激励视频广告开启了调试模式模拟结果回调，发布时必须关闭');
        }
        var playVideoCountToday = FLStore_1["default"].getTodayValue(AppConfig_1["default"].APP_ID + "_" + GameDataCenter_1["default"].userTag + "_playVideoCount", 0);
        if (playVideoCountToday >= (window.PLAY_VIDEO_MAX || 20)) {
            return this.closeCallbacks.map(function (fn) { return fn.runWith([{ msg: '今日视频次数已用完' }]); });
        }
        if (!FLWechatGameRewardVideoAd.videoAd) {
            return this.closeCallbacks.map(function (fn) { return fn.runWith([{ msg: '视频广告看光了，请稍后再试' }]); });
            // this.createRewardedVideoAd(adUnitId: string)
        }
        try {
            FLWechatGameRewardVideoAd.videoAd.offLoad(this.onLoadVideoAd.bind(this));
            FLWechatGameRewardVideoAd.videoAd.offClose(this.onCloseVideoAd.bind(this));
            FLWechatGameRewardVideoAd.videoAd.offError(this.onErrorVideoAd.bind(this));
            FLWechatGameRewardVideoAd.videoAd.offLoad();
            FLWechatGameRewardVideoAd.videoAd.offClose();
            FLWechatGameRewardVideoAd.videoAd.offError();
        }
        catch (error) {
            FLWechatGameRewardVideoAd.videoAd.offLoad();
            FLWechatGameRewardVideoAd.videoAd.offClose();
            FLWechatGameRewardVideoAd.videoAd.offError();
        }
        FLWechatGameRewardVideoAd.videoAd.onLoad(this.onLoadVideoAd.bind(this));
        FLWechatGameRewardVideoAd.videoAd.onClose(this.onCloseVideoAd.bind(this));
        FLWechatGameRewardVideoAd.videoAd.onError(this.onErrorVideoAd.bind(this));
        FLWechatGameRewardVideoAd.videoAd.show().then(function (res) {
            // this.showCallbacks.map(fn => fn.emit([undefined, { msg: '视频显示成功', adVideoPlayTag: this.adVideoPlayTag }]));
        })["catch"](function (err) {
            // 重新加载
            FLWechatGameRewardVideoAd.videoAd.load().then(function () {
                FLWechatGameRewardVideoAd.videoAd.show().then(function () {
                    // this.showCallbacks.map(fn => fn.emit([undefined, { msg: '视频显示成功', adVideoPlayTag: this.adVideoPlayTag }]));
                })["catch"](function (err) {
                    _this.closeCallbacks.map(function (fn) { return fn.runWith([__assign(__assign({}, err), { msg: '视频广告看光了，请稍后再试', adVideoPlayTag: _this.adVideoPlayTag })]); });
                });
            })["catch"](function (err) {
                _this.closeCallbacks.map(function (fn) { return fn.runWith([__assign(__assign({}, err), { msg: '视频广告看光了，请稍后再试', adVideoPlayTag: _this.adVideoPlayTag })]); });
                FLAnalytics_1["default"].sendUserEvent('观看激励视频错误', __assign(__assign({}, err), { adVideoPlayTag: _this.adVideoPlayTag, adUnitId: _this.adUnitId }));
            });
            FLAnalytics_1["default"].sendUserEvent('观看激励视频错误', __assign(__assign({}, err), { adVideoPlayTag: _this.adVideoPlayTag, adUnitId: _this.adUnitId }));
        });
        FLAnalytics_1["default"].sendUserEvent('播放激励视频', { adVideoPlayTag: this.adVideoPlayTag, adUnitId: this.adUnitId });
    };
    FLWechatGameRewardVideoAd.prototype.onEnabled = function () {
        FLSystemEvent_1["default"].on('update_ad_config', this.recreateRewardedVideoAd, this);
        this.adUnitId = this.adUnitId.trim();
        this.adConfigKey = this.adConfigKey.trim();
        if (window.adConfigs && this.adConfigKey.length > 0) {
            this.adUnitId = window.adConfigs[this.adConfigKey] || this.adUnitId;
        }
        this.createRewardedVideoAd(this.adUnitId);
    };
    FLWechatGameRewardVideoAd.prototype.onDisabled = function () {
        FLSystemEvent_1["default"].off('update_ad_config', this.recreateRewardedVideoAd, this);
        if (FLWechatGameRewardVideoAd.videoAd) {
            try {
                FLWechatGameRewardVideoAd.videoAd.offLoad(this.onLoadVideoAd.bind(this));
                FLWechatGameRewardVideoAd.videoAd.offClose(this.onCloseVideoAd.bind(this));
                FLWechatGameRewardVideoAd.videoAd.offError(this.onErrorVideoAd.bind(this));
            }
            catch (error) {
                FLWechatGameRewardVideoAd.videoAd.offLoad();
                FLWechatGameRewardVideoAd.videoAd.offClose();
                FLWechatGameRewardVideoAd.videoAd.offError();
            }
        }
        // FLWechatGameRewardVideoAd.videoAd = null;
    };
    // 广告加载回调
    FLWechatGameRewardVideoAd.prototype.onLoadVideoAd = function (res) {
        // this.loadCallbacks.map(fn => fn.emit([undefined, { msg: '视频加载成功', adVideoPlayTag: this.adVideoPlayTag }]));
    };
    // 广告被关闭的回调
    FLWechatGameRewardVideoAd.prototype.onCloseVideoAd = function (res) {
        var _this = this;
        // 用户点击了【关闭广告】按钮
        // 小于 2.1.0 的基础库版本，res 是一个 undefined
        if (res && res.isEnded || res === undefined) {
            // 正常播放结束，可以下发游戏奖励
            this.closeCallbacks.map(function (fn) { return fn.runWith([undefined, __assign(__assign({}, res), { adVideoPlayTag: _this.adVideoPlayTag })]); });
            // 记录次数
            var playVideoCountToday = FLStore_1["default"].getTodayValue(AppConfig_1["default"].APP_ID + "_" + GameDataCenter_1["default"].userTag + "_playVideoCount", 0);
            FLStore_1["default"].setTodayValue(AppConfig_1["default"].APP_ID + "_" + GameDataCenter_1["default"].userTag + "_playVideoCount", playVideoCountToday + 1);
            // 新用户视频观看服务端统计
            this.sendWatchVideo();
        }
        else {
            // 播放中途退出，不下发游戏奖励
            this.closeCallbacks.map(function (fn) { return fn.runWith([__assign(__assign({}, res), { msg: '完整看完视频才有奖励哦!', adVideoPlayTag: _this.adVideoPlayTag })]); });
            FLAnalytics_1["default"].sendUserEvent('观看激励视频错误', __assign(__assign({}, res), { adVideoPlayTag: this.adVideoPlayTag, adUnitId: this.adUnitId }));
        }
    };
    // 广告错误
    FLWechatGameRewardVideoAd.prototype.onErrorVideoAd = function (res) {
        var msg;
        switch (res.errCode) {
            case 1000:
                msg = '后端接口调用失败，暂时无法观看';
                break;
            case 1001:
                msg = '参数错误，暂时无法观看';
                break;
            case 1002:
                msg = '广告单元无效，暂时无法观看';
                break;
            case 1003:
                msg = '内部错误，暂时无法观看';
                break;
            case 1004:
                msg = '无合适的广告，暂时无法观看';
                break;
            case 1005:
                msg = '广告组件审核中，暂时无法观看';
                break;
            case 1006:
                msg = '广告组件被驳回，暂时无法观看';
                break;
            case 1007:
                msg = '广告组件被封禁，暂时无法观看';
                break;
            case 1008:
                msg = '广告单元已关闭，暂时无法观看';
                break;
            default:
                msg = '遇到未知错误，暂时无法观看';
                break;
        }
        // this.errorCallbacks.map(fn => fn.emit([{ ...res, msg, adVideoPlayTag: this.adVideoPlayTag }]));
        try {
            //发送流量主警告
            this.sendWarning(res.errCode);
        }
        catch (error) { }
    };
    FLWechatGameRewardVideoAd.prototype.sendWarning = function (code) {
        if (code === void 0) { code = '-1000'; }
        var isSend = 0;
        var RewardSendWaring = FLStore_1["default"].getTodayValue('RewardSendWaring', 0);
        if (RewardSendWaring) {
            return;
        }
        code = code.toString();
        switch (code) {
            case '1005':
            case '1006':
            case '1007':
                isSend = 1;
                break;
        }
        if (isSend === 1 && RewardSendWaring === 0) {
            FLStore_1["default"].setTodayValue('RewardSendWaring', 1);
            try {
                FLNetHTTP_1["default"].postAsync("https://warning.feigo.fun/api/warning/flow-main", {
                    name: AppConfig_1["default"].GAME_NAME,
                    appid: AppConfig_1["default"].APP_ID,
                    code: code
                });
            }
            catch (err) {
            }
        }
    };
    /**发送视频看完的统计 */
    FLWechatGameRewardVideoAd.prototype.sendWatchVideo = function () {
        //记录当日新增用户数据
        if (window.isTodayReg && GameDataCenter_1["default"].etag) {
            try {
                FLNetHTTP_1["default"].getAsync(FLGameConfig_1["default"].APP_SERVER_HOST + "/api/user/watch-video-log/" + GameDataCenter_1["default"].etag, {
                    'x-access-token': GameDataCenter_1["default"].token,
                    'client-ver': AppConfig_1["default"].APP_VERSION,
                    'client-os': FLDevice_1["default"].os
                });
            }
            catch (err) {
            }
        }
        FLAnalytics_1["default"].sendUserEvent('观看激励视频成功', { adVideoPlayTag: this.adVideoPlayTag, adUnitId: this.adUnitId });
    };
    /** 获取今日已经观看的视频次数 */
    FLWechatGameRewardVideoAd.getPlayVideoCount = function () {
        return FLStore_1["default"].getTodayValue(AppConfig_1["default"].APP_ID + "_" + GameDataCenter_1["default"].userTag + "_playVideoCount", 0);
    };
    /** 获取今日可观看视频的总次数 */
    FLWechatGameRewardVideoAd.getPlayVideoCountTotal = function () {
        return window.PLAY_VIDEO_MAX || 20;
    };
    /** 获取今日剩余的视频观看次数 */
    FLWechatGameRewardVideoAd.getHaveVideoCount = function () {
        return (window.PLAY_VIDEO_MAX || 20) - FLStore_1["default"].getTodayValue(AppConfig_1["default"].APP_ID + "_" + GameDataCenter_1["default"].userTag + "_playVideoCount", 0);
    };
    // /** @prop { tooltip: '显示其它事件', type: Function, name:showOtherEvents  } */
    // showOtherEvents: Function = null;
    // @property({ type: [cc.Component.EventHandler], visible() { return this.showOtherEvents; }, tooltip: '视频拉起成功的回调。回调函数包含两个参数，第一个参数是error错误信息，第二个参数是result显示成功的信息' })
    // showCallbacks: cc.Component.EventHandler[] = [];
    // @property({ type: [cc.Component.EventHandler], visible() { return this.showOtherEvents; }, tooltip: '视频加载成功的回调。回调函数包含两个参数，第一个参数是error错误信息，第二个参数是result显示成功的信息' })
    // loadCallbacks: cc.Component.EventHandler[] = [];
    // @property({ type: [cc.Component.EventHandler], visible() { return this.showOtherEvents; }, tooltip: '视频发生错误的回调。回调函数包含一个error参数，error带有详细的错误信息' })
    // errorCallbacks: cc.Component.EventHandler[] = [];
    // 当前组件对应的微信广告视图对象，微信视频广告视图对象是一个全局单例
    FLWechatGameRewardVideoAd.videoAd = null;
    // 当前视频组件对应的广告单元ID
    FLWechatGameRewardVideoAd.currentAdUnitId = '';
    return FLWechatGameRewardVideoAd;
}(FLBehavior_1["default"]));
exports["default"] = FLWechatGameRewardVideoAd;
