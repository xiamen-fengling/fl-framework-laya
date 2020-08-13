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
var FLWechatGameRewardVideoAd_1 = require("./FLWechatGameRewardVideoAd");
var FLBehavior_1 = require("../../Core/FLBehavior");
var FLWechatGameShare_1 = require("./FLWechatGameShare");
var FLSystemEvent_1 = require("../../Core/Base/FLSystemEvent");
var FLGameConfig_1 = require("../../../Config/FLGameConfig");
var FLMath_1 = require("../../Core/Base/FLMath");
var FLStore_1 = require("../../Core/Base/FLStore");
var GameDataCenter_1 = require("../../../Config/GameDataCenter");
var FLWechatMiniGame_1 = require("./FLWechatMiniGame");
/**
 * copyright (c) 2017-2019 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 激励视频和分享开关规则控制
 * zengbinsi
 * 2018-12-24
 */
var MJRewardAdAndShareSwitch = /** @class */ (function (_super) {
    __extends(MJRewardAdAndShareSwitch, _super);
    function MJRewardAdAndShareSwitch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // =======================================
        // 编辑器属性定义(以@property修饰)
        // =======================================
        /** @prop { name: switchType, type: Number, tips: '轮播开关' } */
        _this.switchType = 1;
        /** @prop { name: switchConfigName, type: String, tips: '开关名称' } */
        _this.switchConfigName = '';
        /** @prop { name: tag, type: String, tips: '功能标记' } */
        _this.tag = '';
        /** @prop { name: isSuccToChageSwitch, type: Bool, tips: '是否成功分享或者看完视频才切换模式' } */
        _this.isSuccToChageSwitch = true;
        /** @prop { name: rewardVideoAd, type: FLWechatGameRewardVideoAd, tips: '激励视频广告组件' } */
        _this.rewardVideoAd = null;
        /** @prop { name: share, type: FLWechatGameShare, tips: '分享组件对象' } */
        _this.share = null;
        // /** @prop { name: initDisplayCallbacks, type: [cc.Component.EventHandler], tips: '界面初始化' } */
        _this.initDisplayCallbacks = [];
        // /** @prop { name: successedCallbacks, type: [cc.Component.EventHandler], tips: '功能触发回调' } */
        _this.successedCallbacks = [];
        // =======================================
        // 静态属性定义(以static修饰)
        // =======================================
        /** 游戏事件对象 */
        // public static EEventName = {
        //     // 在这里定义事件(key-value形式，key必须全大写下划线分隔，value必须是字符串)
        // };
        // =======================================
        // 外部/内部属性定义(以public/private修饰)
        // =======================================
        // 数据对象缓存
        // private data = null;
        // private datas = [];
        _this.userData = {};
        // 是否操作成功
        _this.isSuccessed = false;
        return _this;
    }
    // =======================================
    // 生命周期(模板方法，以on开头)
    // =======================================
    /** 注册事件 */
    MJRewardAdAndShareSwitch.prototype.onAddEvents = function () {
        FLSystemEvent_1["default"].on('update_server_config', this.onUpdateServerConfig, this);
    };
    /** 取消事件注册 */
    MJRewardAdAndShareSwitch.prototype.onRemoveEvents = function () {
        FLSystemEvent_1["default"].off('update_server_config', this.onUpdateServerConfig, this);
    };
    /** 初始化配置 */
    // onLoadConfig() {
    // }
    /** onLoad结束的回调 */
    MJRewardAdAndShareSwitch.prototype.onLoaded = function () {
        if (FLGameConfig_1["default"].serverConfig.mjSuccToChageSwitch === 1) {
            this.isSuccToChageSwitch = true;
        }
        else {
            this.isSuccToChageSwitch = false;
        }
    };
    /** 在组件第一次update前调用，做一些初始化逻辑 */
    MJRewardAdAndShareSwitch.prototype.onStart = function () {
        var _this = this;
        if (this.switchConfigName && this.switchConfigName !== '') {
            this.switchType = FLGameConfig_1["default"].serverConfig[this.switchConfigName];
        }
        if (FLMath_1["default"].checkInArray(this.switchType, [7, 8]) && !!FLStore_1["default"].getTodayValue("_GameDataCenter.userTag_lastClose_" + this.switchConfigName, 0)) {
            return this.initDisplayCallbacks.map(function (fn) { return fn.runWith([undefined, { switchType: _this.switchType, displayType: 'all' }]); });
        }
        if (this.switchType === 3) {
            // 视频领取
            this.initDisplayCallbacks.map(function (fn) { return fn.runWith([undefined, { switchType: _this.switchType, displayType: 'video' }]); });
        }
        else if (FLMath_1["default"].checkInArray(this.switchType, [4, 5, 7, 8]) && FLStore_1["default"].getTodayValue("_GameDataCenter.userTag_" + this.tag + "LastTag", (this.switchType === 4 || this.switchType === 7) ? 'videoAd' : 'share') === 'share') {
            if (FLWechatGameRewardVideoAd_1["default"].getHaveVideoCount() <= 0 && FLWechatGameShare_1["default"].getHaveShareCount() > 0) {
                // 没有视频了转分享
                FLStore_1["default"].setTodayValue("_GameDataCenter.userTag_" + this.tag + "LastTag", 'videoAd');
                this.initDisplayCallbacks.map(function (fn) { return fn.runWith([undefined, { switchType: _this.switchType, displayType: 'share' }]); });
            }
            else {
                // 视频领取
                this.initDisplayCallbacks.map(function (fn) { return fn.runWith([undefined, { switchType: _this.switchType, displayType: 'video' }]); });
            }
        }
        else if (this.switchType === 6 && 9 < new Date().getHours() && FLStore_1["default"].getTodayValue("_GameDataCenter.userTag_" + this.tag + "LastTag", 'share') === 'share') {
            // 视频领取
            this.initDisplayCallbacks.map(function (fn) { return fn.runWith([undefined, { switchType: _this.switchType, displayType: 'video' }]); });
        }
        else {
            if (FLWechatGameShare_1["default"].getHaveShareCount() <= 0) {
                // 没有分享全部显示视频领取
                FLStore_1["default"].setTodayValue("_GameDataCenter.userTag_" + this.tag + "LastTag", 'share');
                this.initDisplayCallbacks.map(function (fn) { return fn.runWith([undefined, { switchType: _this.switchType, displayType: 'video' }]); });
            }
            else {
                // 分享领取
                this.initDisplayCallbacks.map(function (fn) { return fn.runWith([undefined, { switchType: _this.switchType, displayType: 'share' }]); });
            }
        }
        // 视频看完并且不是弃用分享
        if (FLWechatGameRewardVideoAd_1["default"].getHaveVideoCount() <= 0 && FLWechatGameShare_1["default"].getHaveShareCount() > 0 && !FLMath_1["default"].checkInArray(this.switchType, [1, 3])) {
            // 分享领取
            FLStore_1["default"].setTodayValue("_GameDataCenter.userTag_" + this.tag + "LastTag", 'videoAd');
            this.initDisplayCallbacks.map(function (fn) { return fn.runWith([undefined, { switchType: _this.switchType, displayType: 'share' }]); });
        }
    };
    /**
     * 场景动画更新前回调
     * @param dt 游戏帧时长
     */
    // onUpdate(dt) {
    // }
    /** 场景动画更新后回调 */
    // onLateUpdate() {
    // }
    /** 销毁组件 */
    MJRewardAdAndShareSwitch.prototype.onDestroyed = function () {
        if (FLMath_1["default"].checkInArray(this.switchType, [7, 8]) && !this.isSuccessed) {
            FLStore_1["default"].setTodayValue("_GameDataCenter.userTag_lastClose_" + this.switchConfigName, 1);
        }
    };
    // =======================================
    // 引擎事件回调(以on开头)
    // =======================================
    /** touch事件回调 */
    // onTouchStart(event: cc.Event.EventTouch) {
    // }
    // onTouchMoved(event: cc.Event.EventTouch) {
    // }
    // onTouchEnded(event: cc.Event.EventTouch) {
    // }
    // onTouchCancelled(event: cc.Event.EventTouch) {
    // }
    // =======================================
    // 自定义事件回调(以on开头)
    // =======================================
    /** 按钮点击事件 */
    // onClicked(event: cc.Event, customData: string) {
    // }
    // 服务端配置刷新
    MJRewardAdAndShareSwitch.prototype.onUpdateServerConfig = function (config) {
        this.onLoaded();
        this.onStart();
    };
    // =======================================
    // 服务端接口调用(以submitXXXToServer、getXXXXFromServer命名)
    // =======================================
    // 从服务端获取数据
    // private getDataFromServer() {
    // }
    // =======================================
    // 游戏逻辑方法(内部调用的用private修饰，外部调用和编辑器绑定的public修饰，废弃的方法不加修饰符方便后期移除)
    // =======================================
    // setData(data) {
    //     this.data = data;
    //     // init TODO:
    // }
    MJRewardAdAndShareSwitch.prototype.emitShareOrVideo = function (userData) {
        this.userData = userData || {};
        switch (this.switchType) {
            case 1:
                this.rule1();
                break;
            case 2:
                this.rule2();
                break;
            case 3:
                this.rule3();
                break;
            case 4:
                this.rule4();
                break;
            case 5:
                this.rule5();
                break;
            case 6:
                var hour = new Date().getHours();
                if (hour < 10) {
                    this.rule3();
                }
                else {
                    this.rule4();
                }
                break;
            default:
                this.rule3();
                console.log('开关配置规则错误：', FLGameConfig_1["default"].serverConfig, this.switchType);
                break;
        }
    };
    // 触发分享
    MJRewardAdAndShareSwitch.prototype.emitShare = function (callback) {
        // 拉起分享
        this.share.share("nickname=" + GameDataCenter_1["default"].nickname + "&invite_userid=" + GameDataCenter_1["default"].userId);
    };
    // 触发视频广告
    MJRewardAdAndShareSwitch.prototype.emitVideoAd = function () {
        this.rewardVideoAd = this.rewardVideoAd || this.owner.getComponent(FLWechatGameRewardVideoAd_1["default"]);
        if (this.rewardVideoAd) {
            this.rewardVideoAd.showRewardVideoAd();
        }
        else {
            FLWechatMiniGame_1["default"].showToast('视频加载失败');
        }
    };
    MJRewardAdAndShareSwitch.prototype.rule1 = function () {
        return FLWechatMiniGame_1["default"].showToast('功能暂时关闭');
    };
    MJRewardAdAndShareSwitch.prototype.rule2 = function () {
        this.emitShare();
    };
    MJRewardAdAndShareSwitch.prototype.rule3 = function () {
        this.emitVideoAd();
    };
    MJRewardAdAndShareSwitch.prototype.rule4 = function () {
        this.rule4Or5(4);
    };
    MJRewardAdAndShareSwitch.prototype.rule5 = function () {
        this.rule4Or5(5);
    };
    // 规则4和规则5其实是一样的，只是循环的时候第一个类型不同而已
    MJRewardAdAndShareSwitch.prototype.rule4Or5 = function (rule) {
        var _this = this;
        // 获取上一次类型
        var lastTag = FLStore_1["default"].getTodayValue("_GameDataCenter.userTag_" + this.tag + "LastTag", (rule === 4 || rule === 7) ? 'videoAd' : 'share');
        if (lastTag === 'share') {
            if (FLWechatGameRewardVideoAd_1["default"].getPlayVideoCount() < FLWechatGameRewardVideoAd_1["default"].getPlayVideoCountTotal()) {
                this.emitVideoAd();
                // this.scheduleOnce(()=>{
                //     // 分享领取
                //     this.initDisplayCallbacks.map(fn=>fn.emit([undefined, {switchType: this.switchType, displayType: 'share'}]));
                // }, 0.3);
            }
            else {
                FLWechatMiniGame_1["default"].showToast('今日观看次数已用完');
                // 分享领取
                // this.initDisplayCallbacks.map(fn=>fn.emit([undefined, {switchType: this.switchType, displayType: 'share'}]));
            }
            // 如果是拉起视频就切换在这里设置LastTag为视频【不可删除】
            // 如果是拉起视频就切换在这里设置LastTag为视频【不可删除】
            // 如果是拉起视频就切换在这里设置LastTag为视频【不可删除】
            if (!this.isSuccToChageSwitch) {
                FLStore_1["default"].setTodayValue("_GameDataCenter.userTag_" + this.tag + "LastTag", 'videoAd');
                this.scheduleOnce(function () {
                    // 分享领取
                    _this.initDisplayCallbacks.map(function (fn) { return fn.runWith([undefined, { switchType: _this.switchType, displayType: 'share' }]); });
                }, 0.3);
            }
        }
        else {
            this.emitShare();
            if (!this.isSuccToChageSwitch) {
                FLStore_1["default"].setTodayValue("_GameDataCenter.userTag_" + this.tag + "LastTag", 'share');
                this.scheduleOnce(function () {
                    // 分享领取
                    _this.initDisplayCallbacks.map(function (fn) { return fn.runWith([undefined, { switchType: _this.switchType, displayType: 'video' }]); });
                }, 0.3);
            }
        }
    };
    // 生效
    MJRewardAdAndShareSwitch.prototype.onSuccessed = function (isLookAdVideo, err, res) {
        var _this = this;
        if (err === void 0) { err = {}; }
        if (res === void 0) { res = {}; }
        if (isLookAdVideo && FLWechatGameShare_1["default"].getHaveShareCount() > 0) {
            FLStore_1["default"].setTodayValue("_GameDataCenter.userTag_" + this.tag + "LastTag", 'videoAd');
            if (FLMath_1["default"].checkInArray(this.switchType, [4, 5, 7, 8]) || (this.switchType === 6 && (new Date().getHours()) > 9)) {
                this.initDisplayCallbacks.map(function (fn) { return fn.runWith([undefined, { switchType: _this.switchType, displayType: 'share' }]); });
            }
            else {
                this.initDisplayCallbacks.map(function (fn) { return fn.runWith([undefined, { switchType: _this.switchType, displayType: 'video' }]); });
            }
        }
        else if (FLWechatGameRewardVideoAd_1["default"].getPlayVideoCount() < FLWechatGameRewardVideoAd_1["default"].getPlayVideoCountTotal()) {
            FLStore_1["default"].setTodayValue("_GameDataCenter.userTag_" + this.tag + "LastTag", 'share');
            if (FLMath_1["default"].checkInArray(this.switchType, [4, 5, 7, 8]) || (this.switchType === 6 && (new Date().getHours()) > 9)) {
                this.initDisplayCallbacks.map(function (fn) { return fn.runWith([undefined, { switchType: _this.switchType, displayType: 'video' }]); });
            }
        }
        this.successedCallbacks.map(function (fn) { return fn.runWith([undefined, __assign(__assign({}, res), { isLookAdVideo: isLookAdVideo, switchType: _this.switchType, tag: _this.tag, switchConfigName: _this.switchConfigName, userData: _this.userData })]); });
        this.isSuccessed = true;
    };
    MJRewardAdAndShareSwitch.prototype.onFailed = function (isLookAdVideo, err, res) {
        var _this = this;
        if (err === void 0) { err = {}; }
        if (res === void 0) { res = {}; }
        this.successedCallbacks.map(function (fn) { return fn.runWith([__assign(__assign({}, err), { isLookAdVideo: isLookAdVideo, switchType: _this.switchType, tag: _this.tag, switchConfigName: _this.switchConfigName, userData: _this.userData })]); });
        this.isSuccessed = false;
    };
    // 视频播放结束回调
    MJRewardAdAndShareSwitch.prototype.onVideoPlayEnded = function (err, res) {
        if (err) {
            return this.onFailed(true, err, res);
        }
        this.onSuccessed(true, err, res);
    };
    // 分享回调
    MJRewardAdAndShareSwitch.prototype.onShareCallback = function (err, res) {
        if (err) {
            return this.onFailed(false, err, res);
        }
        this.onSuccessed(false, err, res);
    };
    return MJRewardAdAndShareSwitch;
}(FLBehavior_1["default"]));
exports["default"] = MJRewardAdAndShareSwitch;
