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
exports.__esModule = true;
var FLBehavior_1 = require("../../Core/FLBehavior");
var FLDevice_1 = require("../../Core/Base/FLDevice");
var AppConfig_1 = require("../../../Config/AppConfig");
var FLDateTime_1 = require("../../Core/Base/FLDateTime");
var FLStore_1 = require("../../Core/Base/FLStore");
var FLAnalytics_1 = require("../../Core/Base/FLAnalytics");
var FLSystemEvent_1 = require("../../Core/Base/FLSystemEvent");
var FLNetHTTP_1 = require("../../Core/Network/FLNetHTTP");
var GameDataCenter_1 = require("../../../Config/GameDataCenter");
var FLGameConfig_1 = require("../../../Config/FLGameConfig");
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 微信小游戏登录
 * 登录成功后全局系统派发LOGIN_SUCCESSED登录成功事件
 * zengbinsi
 * 2018-10-29
 */
/** 微信小游戏启动参数 */
var FLWechatGameLaunchOptions = /** @class */ (function () {
    function FLWechatGameLaunchOptions() {
        // 场景值
        this.scene = undefined;
        // 启动参数
        this.query = undefined;
        // 当前小游戏是否被显示在聊天顶部
        this.isSticky = undefined;
        // 分享票据
        this.shareTicket = undefined;
        // 当场景为由从另一个小程序或公众号或App打开时，返回此字段
        this.referrerInfo = undefined;
    }
    return FLWechatGameLaunchOptions;
}());
exports.FLWechatGameLaunchOptions = FLWechatGameLaunchOptions;
var FLWechatGameLogin = /** @class */ (function (_super) {
    __extends(FLWechatGameLogin, _super);
    function FLWechatGameLogin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop { name: testToken, type: String, tips: '游戏登录模拟token'} */
        _this.testToken = '';
        /** @prop { name: testUserTag, type: String, tips: '游戏登录模拟userTag' }  */
        _this.testUserTag = '';
        return _this;
    }
    /** 注册事件 */
    FLWechatGameLogin.prototype.onAddEvents = function () {
        if (FLWechatGameLogin.isLogined) {
            return;
        }
        if (!FLDevice_1["default"].isWechatGame()) {
            GameDataCenter_1["default"].userTag = this.testUserTag;
            GameDataCenter_1["default"].token = this.testToken;
            GameDataCenter_1["default"].nickname = '';
            GameDataCenter_1["default"].gender = 0;
            // return this.loginCallback.map(fn => fn.emit([undefined, { msg: '客户端模拟登陆成功' }]));
            FLWechatGameLogin.isLogined = true;
            window.userData = window.userData || {};
            window.userData.token = GameDataCenter_1["default"].token || '';
            // 登录成功事件
            return FLSystemEvent_1["default"].emit('LOGIN_SUCCESSED');
        }
        wx.offShow(FLWechatGameLogin.onGameResume);
        wx.onShow(FLWechatGameLogin.onGameResume);
    };
    /** 取消事件注册 */
    FLWechatGameLogin.prototype.onRemoveEvents = function () {
    };
    /** 初始化配置 */
    FLWechatGameLogin.prototype.onLoadConfig = function () {
        if (FLWechatGameLogin.isLogined || !FLDevice_1["default"].isWechatGame()) {
            return;
        }
        // 获取启动参数
        var launchOptions = wx.getLaunchOptionsSync();
        FLWechatGameLogin.launchOptions = launchOptions;
    };
    /** onLoad结束的回调 */
    FLWechatGameLogin.prototype.onLoaded = function () {
        if (FLWechatGameLogin.isLogined) {
            return;
        }
        FLWechatGameLogin.login(this);
    };
    // 游戏唤醒
    FLWechatGameLogin.onGameResume = function (data) {
        if (data) {
            FLWechatGameLogin.launchOptions = data;
        }
    };
    /** 登录微信小游戏 */
    FLWechatGameLogin.login = function (wechatGameLogin) {
        if (!FLDevice_1["default"].isWechatGame()) {
            return;
        }
        wx.login({
            success: function (res) {
                console.log('code:', res);
                FLWechatGameLogin.loginCode = res.code;
                FLWechatGameLogin.loginByCode(res.code, wechatGameLogin);
            },
            fail: function (err) {
                try {
                    // if (wechatGameLogin && wechatGameLogin.loginCallback) {
                    //     wechatGameLogin.loginCallback.map(fn => fn.emit([err]));
                    // }
                }
                catch (error) {
                    console.error('获取Code失败 fail error', error);
                }
                try {
                    // 重写登录
                    setTimeout(function () { FLWechatGameLogin.login(wechatGameLogin); }, 100);
                }
                catch (error) {
                }
                console.error('获取Code失败', err);
            }
        });
    };
    // code登录
    FLWechatGameLogin.loginByCode = function (code, wechatGameLogin) {
        // FLAnalytics.sendUserEvent('游戏启动-到达loginByCode-' + ((new Date()).getTime() - (window as any).timeStart));
        var etag = '';
        var gdt_vid = '';
        var aid = '';
        if (FLWechatGameLogin.launchOptions && FLWechatGameLogin.launchOptions.query) {
            FLWechatGameLogin.launchOptions.query.etag && (etag = FLWechatGameLogin.launchOptions.query.etag);
            // 收集广告参数
            FLWechatGameLogin.launchOptions.query.gdt_vid && (gdt_vid = FLWechatGameLogin.launchOptions.query.gdt_vid);
            FLWechatGameLogin.launchOptions.query.weixinadinfo && (aid = FLWechatGameLogin.launchOptions.query.weixinadinfo.split('.')[0]);
            // 非广告跳转过来的，etag采取appId覆盖
            if (!!FLWechatGameLogin.launchOptions.query.channelType) {
                // 这里后面要做点什么
            }
            else if (!FLWechatGameLogin.launchOptions.query.gdt_vid && FLWechatGameLogin.launchOptions.referrerInfo && FLWechatGameLogin.launchOptions.referrerInfo.appId) {
                etag = FLWechatGameLogin.launchOptions.referrerInfo.appId || '';
            }
        }
        try {
            var loginParams = {
                gdt_vid: gdt_vid,
                aid: aid,
                code: code,
                etag: etag,
                invite_tag: FLWechatGameLogin.launchOptions.query.invite_tag,
                share_id: FLWechatGameLogin.launchOptions.query.share_id,
                type: FLWechatGameLogin.launchOptions.query.type,
                scene: FLWechatGameLogin.launchOptions.scene
            };
            console.log('login params:', loginParams);
            // FLAnalytics.sendUserEvent('游戏启动-请求登录接口-' + ((new Date()).getTime() - (window as any).timeStart));
            FLNetHTTP_1["default"].postAsync(FLGameConfig_1["default"].APP_SERVER_HOST + "/api/code-login", loginParams).then(function (res) {
                // FLAnalytics.sendUserEvent('游戏启动-请求登录接口成功-' + ((new Date()).getTime() - (window as any).timeStart));
                console.log('code login succ:', res);
                FLStore_1["default"].set('isNotFirstEnterGame', 1);
                GameDataCenter_1["default"].userId = res.user_id || '';
                GameDataCenter_1["default"].userTag = res.user_tag || '';
                GameDataCenter_1["default"].openId = res.openid || '';
                GameDataCenter_1["default"].avatar = res.avatar || res.avatarUrl || '';
                GameDataCenter_1["default"].nickname = res.nickname || res.nickName || '';
                GameDataCenter_1["default"].gender = res.gender || 0;
                GameDataCenter_1["default"].token = res.token || '';
                // etag来源标识
                GameDataCenter_1["default"].etag = res.etag || res.channel || '';
                GameDataCenter_1["default"].first = res.first || res.is_first || 0;
                GameDataCenter_1["default"].abTestTag = res.abTest || res.ab_test || 0;
                window.channelAldTag = res.channel || '';
                window.regtime = res.regtime || 0;
                window.isTodayReg = FLDateTime_1["default"].isToday(res.regtime);
                window.userData = window.userData || {};
                window.userData.openId = res.openId || '';
                window.userData.token = res.token || '';
                window.userData.gender = res.gender || 0;
                window.userData.isTodayReg = window.isTodayReg || false;
                window.userData.channelAldTag = res.channel || '';
                window.userData.first = res.first || res.is_first || 0;
                window.userData.etag = GameDataCenter_1["default"].etag;
                window.userData.share_id = FLWechatGameLogin.launchOptions.query.share_id;
                if (!FLStore_1["default"].get("first_" + GameDataCenter_1["default"].userTag, 0) && !window.userData.first) {
                    FLAnalytics_1["default"].sendUserEvent('游戏被删除后再次促活', { appId: AppConfig_1["default"].APP_ID, scene: FLWechatGameLogin.launchOptions.scene });
                }
                // 不管新用户老用户，全部打上标签
                FLStore_1["default"].set("first_" + GameDataCenter_1["default"].userTag, 1);
                if (wechatGameLogin) {
                    try {
                        // wechatGameLogin.loginCallback.map(fn => fn.emit([undefined, res]));
                    }
                    catch (error) { }
                }
                FLWechatGameLogin.isLogined = true;
                // 登录成功事件
                FLSystemEvent_1["default"].emit('LOGIN_SUCCESSED');
            })["catch"](function (error) {
                // FLAnalytics.sendUserEvent('游戏启动-请求登录接口失败-' + ((new Date()).getTime() - (window as any).timeStart));
                if (wechatGameLogin) {
                    try {
                        // wechatGameLogin.loginCallback.map(fn => fn.emit([error]));
                    }
                    catch (error) { }
                }
                console.log('登录失败：', error);
            });
        }
        catch (error) {
            if (wechatGameLogin) {
                try {
                    // wechatGameLogin.loginCallback.map(fn => fn.emit([error]));
                }
                catch (error) { }
            }
            console.log('登录失败：', error);
        }
    };
    // @property({ type: [cc.Component.EventHandler], tooltip: '登录回调。回调函数有两个参数，第一个参数err是登录失败的错误消息，第二个参数res是登录成功的返回信息' })
    // loginCallback: cc.Component.EventHandler[] = [];
    /** 游戏事件对象 */
    FLWechatGameLogin.EEventName = {
        // 在这里定义事件(key-value形式，key必须全大写下划线分隔，value必须是字符串)
        // 登录成功
        LOGIN_SUCCESSED: 'LOGIN_SUCCESSED'
    };
    /** 是否已经登录过 */
    FLWechatGameLogin.isLogined = false;
    /** 启动参数 */
    FLWechatGameLogin.launchOptions = new FLWechatGameLaunchOptions();
    /** 本次登录用的微信Code */
    FLWechatGameLogin.loginCode = null;
    return FLWechatGameLogin;
}(FLBehavior_1["default"]));
exports["default"] = FLWechatGameLogin;
try {
    window.FLWechatGameLogin = FLWechatGameLogin;
}
catch (error) { }
