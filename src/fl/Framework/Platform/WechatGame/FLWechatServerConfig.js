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
var FLSystemEvent_1 = require("../../Core/Base/FLSystemEvent");
var FLGameConfig_1 = require("../../../Config/FLGameConfig");
var FLNetHTTP_1 = require("../../Core/Network/FLNetHTTP");
var GameDataCenter_1 = require("../../../Config/GameDataCenter");
var AppConfig_1 = require("../../../Config/AppConfig");
var FLDevice_1 = require("../../Core/Base/FLDevice");
var FLWechatMiniGame_1 = require("./FLWechatMiniGame");
var FLAnalytics_1 = require("../../Core/Base/FLAnalytics");
/**
 * copyright (c) 2017-2019 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 服务端配置
 * zengbinsi
 * 2019-02-21
 */
var FLWechatServerConfig = /** @class */ (function (_super) {
    __extends(FLWechatServerConfig, _super);
    function FLWechatServerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // =======================================
        // 编辑器属性定义(以@property修饰)
        // =======================================
        /** @prop { name: isUpdateDatas, default: false, type: Bool, tips: "是否每次刷新" } */
        _this.isUpdateDatas = false;
        /** @prop { name: isUpdateOnLoad, default: false, type: Bool, tips: '是否立即刷新配置' } */
        _this.isUpdateOnLoad = false;
        return _this;
        // =======================================
        // 游戏逻辑方法(内部调用的用private修饰，外部调用和编辑器绑定的public修饰，废弃的方法不加修饰符方便后期移除)
        // =======================================
        // setData(data) {
        //     this.data = data;
        //     // init TODO:
        // }
    }
    // =======================================
    // 生命周期(模板方法，以on开头)
    // =======================================
    /** 注册事件 */
    FLWechatServerConfig.prototype.onAddEvents = function () {
        FLSystemEvent_1["default"].on('LOGIN_SUCCESSED', this.onLoginSuccessed, this);
    };
    /** 取消事件注册 */
    FLWechatServerConfig.prototype.onRemoveEvents = function () {
        FLSystemEvent_1["default"].off('LOGIN_SUCCESSED', this.onLoginSuccessed, this);
    };
    /** 初始化配置 */
    // onLoadConfig() {
    // }
    /** onLoad结束的回调 */
    FLWechatServerConfig.prototype.onLoaded = function () {
        this.isUpdateOnLoad && this.getDataFromServer();
    };
    /** 在组件第一次update前调用，做一些初始化逻辑 */
    FLWechatServerConfig.prototype.onStart = function () {
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
    FLWechatServerConfig.prototype.onDestroyed = function () {
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
    FLWechatServerConfig.prototype.onLoginSuccessed = function (err, res) {
        if (err) {
            return;
        }
        this.getDataFromServer();
    };
    // =======================================
    // 服务端接口调用(以submitXXXToServer、getXXXXFromServer命名)
    // =======================================
    // 从服务端获取数据
    FLWechatServerConfig.prototype.getDataFromServer = function () {
        if (FLWechatServerConfig.isUpdatedDatas && !this.isUpdateDatas) {
            // 已经刷新过数据，且不再获取刷新
            return console.log('已经刷新过数据，且不再获取刷新', FLWechatServerConfig.isUpdatedDatas, this.isUpdateDatas);
            ;
        }
        this.getServerConfigsFromServer().then(function (res) {
            FLWechatServerConfig.isUpdatedDatas = FLWechatServerConfig.isUpdatedServerConfigs && FLWechatServerConfig.isUpdatedAdConfigs;
            FLWechatServerConfig.isUpdatedDatas && console.log(FLGameConfig_1["default"].serverConfig);
        });
        this.getAdConfigsFromServer().then(function (res) {
            FLWechatServerConfig.isUpdatedDatas = FLWechatServerConfig.isUpdatedServerConfigs && FLWechatServerConfig.isUpdatedAdConfigs;
            FLWechatServerConfig.isUpdatedDatas && console.log(FLGameConfig_1["default"].serverConfig);
        });
    };
    // 获取服务端游戏配置
    FLWechatServerConfig.prototype.getServerConfigsFromServer = function () {
        if (FLWechatServerConfig.isUpdatedServerConfigs) {
            return;
        }
        try {
            var launchOptions = FLDevice_1["default"].isWechatGame() ? wx.getLaunchOptionsSync() : { scene: 1001 };
            return FLNetHTTP_1["default"].getAsync(FLGameConfig_1["default"].APP_SERVER_HOST + "/api/config/config", {
                'x-access-token': GameDataCenter_1["default"].token,
                'client-ver': AppConfig_1["default"].APP_VERSION,
                'client-os': FLDevice_1["default"].os,
                scene: launchOptions.scene,
                is_first: window.userData.first || 0
            }).then(function (res) {
                // 合并服务端和本地配置，服务端覆盖本地配置
                FLGameConfig_1["default"].serverConfig = __assign(__assign({}, FLGameConfig_1["default"].serverConfig), res);
                FLGameConfig_1["default"].serverConfig.reviewSwitch = res.reviewSwitch || 0;
                window.serverConfig = FLGameConfig_1["default"].serverConfig;
                window.PLAY_VIDEO_MAX = res.PLAY_VIDEO_MAX || 20;
                // 是否强制更新版本
                window.flForceUpdateVersion = !!res.flForceUpdateVersion || false;
                if (window.flForceUpdateVersion) {
                    FLWechatMiniGame_1["default"].checkUpdateVersion();
                }
                if (!!res.isDebug) {
                    // cc.debug.setDisplayStats(true);
                }
                FLWechatServerConfig.isUpdatedServerConfigs = true;
                FLSystemEvent_1["default"].emit('update_server_config', FLGameConfig_1["default"].serverConfig['reviewSwitch']);
                // 统计
                if (FLDevice_1["default"].isWechatGame() && res.reviewSwitch && FLWechatServerConfig.compareVersion(AppConfig_1["default"].APP_VERSION, res.proVersion) > 0) {
                    // 获取启动参数
                    var launchOptions_1 = wx.getLaunchOptionsSync();
                    FLAnalytics_1["default"].sendUserEvent('进入审核版本', { scene: launchOptions_1.scene, userTag: GameDataCenter_1["default"].userTag });
                }
            })["catch"](function (error) {
                console.log('update server config error', error);
            });
        }
        catch (error) {
            console.log('update server config error', error);
        }
    };
    FLWechatServerConfig.prototype.getAdConfigsFromServer = function () {
        if (FLWechatServerConfig.isUpdatedAdConfigs) {
            return;
        }
        try {
            return FLNetHTTP_1["default"].getAsync(FLGameConfig_1["default"].APP_SERVER_HOST + "/api/config/banner-value", {
                'x-access-token': GameDataCenter_1["default"].token,
                'client-ver': AppConfig_1["default"].APP_VERSION,
                'client-os': FLDevice_1["default"].os
            }).then(function (res) {
                var adBannerConfigs = [];
                var adVideoConfigs = [];
                var adInterstitialConfigs = [];
                var adConfigs = {};
                res.map(function (conf) {
                    FLGameConfig_1["default"].serverConfig[conf.key] = conf.value;
                    adConfigs[conf.key] = conf.value;
                    switch (conf.type) {
                        case 1:
                            adBannerConfigs.push(conf.value);
                            break;
                        case 2:
                            adVideoConfigs.push(conf.value);
                            break;
                        case 3:
                            adInterstitialConfigs.push(conf.value);
                            break;
                        default: break;
                    }
                });
                window.adBannerConfigs = adBannerConfigs;
                window.adVideoConfigs = adVideoConfigs;
                window.adInterstitialConfigs = adInterstitialConfigs;
                window.adConfigs = adConfigs;
                FLSystemEvent_1["default"].emit('update_ad_config', adConfigs);
                FLWechatServerConfig.isUpdatedAdConfigs = !0;
            })["catch"](function (error) {
                console.log('update ad config error', error);
            });
        }
        catch (error) {
            console.log('update ad config error', error);
        }
    };
    // =======================================
    // 静态属性定义(以static修饰)
    // =======================================
    /** 游戏事件对象 */
    FLWechatServerConfig.EEventName = {
        // 在这里定义事件(key-value形式，key必须全大写下划线分隔，value必须是字符串)
        // 获取更新广告配置成功
        UPDATE_AD_CONFIG: 'update_ad_config',
        // 获取更新服务端配置成功
        UPDATE_SERVER_CONFIG: 'update_server_config'
    };
    // =======================================
    // 外部/内部属性定义(以public/private修饰)
    // =======================================
    // 数据对象缓存
    // private data = null;
    // private datas = [];
    /** 是否已经刷新过数据 */
    FLWechatServerConfig.isUpdatedDatas = false;
    /** 是否已经获得广告配置 */
    FLWechatServerConfig.isUpdatedAdConfigs = false;
    /** 是否已经获得游戏配置 */
    FLWechatServerConfig.isUpdatedServerConfigs = false;
    return FLWechatServerConfig;
}(FLBehavior_1["default"]));
exports["default"] = FLWechatServerConfig;
