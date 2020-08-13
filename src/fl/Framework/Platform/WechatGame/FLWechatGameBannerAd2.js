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
var FLWechatMiniGame_1 = require("./FLWechatMiniGame");
var FLGameConfig_1 = require("../../../Config/FLGameConfig");
var FLNetHTTP_1 = require("../../Core/Network/FLNetHTTP");
var FLDevice_1 = require("../../Core/Base/FLDevice");
var index_1 = require("../../index");
var FLAnalytics_1 = require("../../Core/Base/FLAnalytics");
var FLStore_1 = require("../../Core/Base/FLStore");
var AppConfig_1 = require("../../../Config/AppConfig");
/**
 * copyright (c) 2017-2019 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 微信小游戏Banner广告组件
 * zengbinsi
 * 2019-05-23
 */
var EBannerStyleType;
(function (EBannerStyleType) {
    EBannerStyleType[EBannerStyleType["NONE"] = 0] = "NONE";
    EBannerStyleType[EBannerStyleType["LANDSCAPE"] = 1] = "LANDSCAPE";
    EBannerStyleType[EBannerStyleType["LANDSCAPE_CENTER"] = 2] = "LANDSCAPE_CENTER";
})(EBannerStyleType || (EBannerStyleType = {}));
var FLWechatGameBannerAd2 = /** @class */ (function (_super) {
    __extends(FLWechatGameBannerAd2, _super);
    function FLWechatGameBannerAd2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // =======================================
        // 编辑器属性定义(以@property修饰)
        // =======================================
        /** @prop { name: dynamicId, type: Bool, default: true, tips: '是否动态广告ID，动态广告id会从window.adBannerConfigs里面随机一个广告ID使用' } */
        _this.dynamicId = true;
        /** @prop { name: adUnitId, type: String, tips: 'Banner广告单元ID，由微信官方提供' } */
        _this.adUnitId = '';
        /** @prop { name: adConfigKey, type: String, tips: '广告单元ID预埋Key，用于从服务端获取的配置中读取广告单元，服务端获取广告配置后要设置到FLWechatGameBannerAd组件的adConfig属性上。该配置会覆盖默认的adUnitId属性' } */
        _this.adConfigKey = '';
        /** @prop { name: resident, type: Bool, default: false, tips: '是否驻留，驻留的Banner会在其它广告被移除时自动显示' } */
        _this.resident = false;
        /** @prop { name: showOnStart, type: Bool, default: true, tips: '是否在组件运行时自动显示' } */
        _this.showOnStart = true;
        /** @prop { name: isTouchByMistake, type: Bool, default: false, tips: '是否属于误触类型' } */
        _this.isTouchByMistake = false;
        /** @prop { name: isAutoUpdate, type: Bool, default: true, tips: '是否自动刷新' } */
        _this.isAutoUpdate = true;
        /** @prop { name: isQuickUpdate, type: Bool, default: false, tips: '是否快速刷新'} */
        _this.isQuickUpdate = false;
        /** @prop { name: positionTag, type: String, tips: '位置标识，用于统计' } */
        _this.positionTag = '';
        /** @prop { name: styleType, type: Option, default: 'NONE', option: "NONE,LANDSCAPE,LANDSCAPE_CENTER", tips: '是否横屏' } */
        _this.styleType = 'NONE';
        /** @prop { name: width, type: Number, default: 300, tips: 'Banner广告的宽度（广告高度会根据宽度进行缩放适配）' } */
        _this.width = 300;
        /** @prop { name: top, type: Number, default: 0, tips: 'Banner广告的位置Top' } */
        _this.top = 0;
        /** @prop { name: left, type: Number, default: 0, tips: 'Banner广告的位置Left' } */
        _this.left = 0;
        // =======================================
        // 外部/内部属性定义(以public/private修饰)
        // =======================================
        // 数据对象缓存
        // private data = null;
        // private datas = [];
        // 广告加载次数
        _this.loadCount = 0;
        // 广告加载失败次数
        _this.loadErrorCount = 0;
        // 更新时间缓存
        _this.autoUpdateTimeCache = 0;
        // 自动更新banner时间间隔
        _this.updateBannerInterval = 60;
        // banner拉取成功次数
        _this.loadBannerMaxCount = 20;
        /** 快速刷新广告次数 */
        _this.quickUpdateCount = 0;
        return _this;
    }
    // =======================================
    // 生命周期(模板方法，以on开头)
    // =======================================
    FLWechatGameBannerAd2.prototype.onEnabled = function () {
        var _this = this;
        // 更新banner的自动刷新间隔
        try {
            this.updateBannerInterval = window.serverConfig ? window.serverConfig.BANNER_UPDATE_INTERVAL : 60;
            this.loadBannerMaxCount = window.serverConfig ? window.serverConfig.BANNER_LOAD_MAX : 20;
        }
        catch (error) {
            this.updateBannerInterval = 60;
            this.loadBannerMaxCount = 20;
        }
        this.positionTag === '' && (this.positionTag = this.adConfigKey.trim());
        // 如果清理为0，每次进入该面板都会快速刷新，太浪费了点
        // this.quickUpdateCount = 0;
        FLWechatGameBannerAd2.hideAllBannerAd();
        this.scheduleOnce(function () {
            _this.createBanner();
            _this.showOnStart && _this.show();
        }, 0.05);
    };
    FLWechatGameBannerAd2.prototype.onDisabled = function () {
        this.hide();
        FLWechatGameBannerAd2.hideAllBannerAd();
        FLSystemEvent_1["default"].emit(FLWechatGameBannerAd2.EEventName.SHOW_RESIDENT_BANNER_AD, {
            adUnitId: this.adUnitId,
            adConfigKey: this.adConfigKey,
            positionTag: this.positionTag
        });
    };
    /** 注册事件 */
    FLWechatGameBannerAd2.prototype.onAddEvents = function () {
        FLSystemEvent_1["default"].on('update_ad_config', this.createBanner, this);
        FLSystemEvent_1["default"].on(FLWechatMiniGame_1["default"].EEventName.WECHAT_MINI_GAME_TOUCH_BANNER_AD, this.onTouchBannerAd, this);
        this.resident && FLSystemEvent_1["default"].on(FLWechatGameBannerAd2.EEventName.SHOW_RESIDENT_BANNER_AD, this.onShowResidentBannerAd, this);
    };
    /** 取消事件注册 */
    FLWechatGameBannerAd2.prototype.onRemoveEvents = function () {
        FLSystemEvent_1["default"].off('update_ad_config', this.createBanner, this);
        FLSystemEvent_1["default"].off(FLWechatMiniGame_1["default"].EEventName.WECHAT_MINI_GAME_TOUCH_BANNER_AD, this.onTouchBannerAd, this);
        FLSystemEvent_1["default"].off(FLWechatGameBannerAd2.EEventName.SHOW_RESIDENT_BANNER_AD, this.onShowResidentBannerAd, this);
    };
    /** 初始化配置 */
    // onLoadConfig() {
    // }
    /** onLoad结束的回调 */
    // onLoaded() {
    // }
    /** 在组件第一次update前调用，做一些初始化逻辑 */
    FLWechatGameBannerAd2.prototype.onStart = function () {
    };
    /**
     * 场景动画更新前回调
     * @param dt 游戏帧时长
     */
    FLWechatGameBannerAd2.prototype.onUpdate = function () {
        var dt = Laya.timer.delta / 1000;
        if (!this.isAutoUpdate || FLWechatGameBannerAd2.loadSuccCount > this.loadBannerMaxCount) {
            this.onUpdate = function () { };
            return;
        }
        this.autoUpdateTimeCache += dt;
        if (this.autoUpdateTimeCache < 1 || FLGameConfig_1["default"].serverConfig.reviewSwitch) {
            return;
        }
        // 每隔1s进来一次
        this.autoUpdateTimeCache -= 1;
        try {
            var cache = FLWechatGameBannerAd2.banners[this.adUnitId];
            if (cache && cache.view && cache.view.show && cache.isShow) {
                cache.showTime += 1;
                if (this.updateBannerInterval < cache.showTime || this.checkQuickUpdate(cache)) {
                    this.updateBanner();
                }
            }
        }
        catch (error) { }
    };
    /** 场景动画更新后回调 */
    // onLateUpdate() {
    // }
    /** 销毁组件 */
    FLWechatGameBannerAd2.prototype.onDestroyed = function () {
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
    // 广告被点击
    FLWechatGameBannerAd2.prototype.onTouchBannerAd = function (data) {
        var adUnitId = this.adUnitId;
        var cache = FLWechatGameBannerAd2.banners[adUnitId];
        if (!cache || !cache.isShow) {
            return;
        }
        if (FLWechatGameBannerAd2.loadSuccCount < this.loadBannerMaxCount) {
            this.destroyBanner();
            try {
                this.createBanner();
                this.show();
            }
            catch (error) { }
        }
        var clienttime = Math.floor(Date.now() / 1000);
        FLAnalytics_1["default"].sendUserEvent('点击banner成功', {
            adId: adUnitId,
            posTag: this.positionTag,
            loadCount: this.loadCount,
            adType: data ? data.adType : '未知广告'
        });
        try {
            FLNetHTTP_1["default"].post(FLGameConfig_1["default"].APP_SERVER_HOST + "/api/user/banner-click-log", {
                banner_id: adUnitId,
                runtime: index_1["default"].getRunTime(),
                clienttime: clienttime
            }, {
                'x-access-token': window.userData ? window.userData.token : '',
                'client-ver': window.APP_VERSION
            }, function (err, res) {
                if (err) {
                    return console.error(err);
                }
            });
        }
        catch (error) { }
    };
    /** 显示驻留广告 */
    FLWechatGameBannerAd2.prototype.onShowResidentBannerAd = function (data) {
        if (!this.owner.active || !this.owner.activeInHierarchy || !this.enabled) {
            return;
        }
        if (data.adConfigKey !== '' && data.adConfigKey === this.adConfigKey) {
            return;
        }
        if (data.positionTag !== '' && data.positionTag === this.positionTag) {
            return;
        }
        this.createBanner(true);
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
    /** 初始化广告id */
    FLWechatGameBannerAd2.prototype.initBannerId = function () {
        if (this.isTouchByMistake) {
            var ids = [];
            var cache = void 0;
            // 筛选已创建并加载成功的广告id
            for (var key in FLWechatGameBannerAd2.banners) {
                cache = FLWechatGameBannerAd2.banners[key];
                cache && cache.isLoaded && ids.push(cache.adUnitId || key);
            }
            if (ids[0]) {
                // 随机一个id
                this.adUnitId = ids[Math.floor(Math.random() * ids.length)];
                return;
            }
        }
        var adBannerConfigs = window.adBannerConfigs;
        if (this.dynamicId && adBannerConfigs && adBannerConfigs[0]) {
            // 从全局随机一个广告id
            this.adUnitId = adBannerConfigs[Math.floor(Math.random() * adBannerConfigs.length)];
        }
        else if (this.adConfigKey.trim() !== '' && window.adConfigs) {
            // 固定id
            this.adUnitId = window.adConfigs[this.adConfigKey] || this.adUnitId;
        }
    };
    /** 创建广告 */
    FLWechatGameBannerAd2.prototype.createBanner = function (isShow) {
        if (isShow === void 0) { isShow = false; }
        if (!FLDevice_1["default"].isWechatGame()) {
            return;
        }
        this.hide();
        this.initBannerId();
        if (!this.adUnitId || this.adUnitId === '') {
            return;
        }
        var adUnitId = this.adUnitId;
        var cache = FLWechatGameBannerAd2.banners[adUnitId];
        if (cache && cache.view && cache.view.show) {
            this.bindADViewEvents(cache.view, cache, adUnitId, isShow);
            if (isShow) {
                cache.view.show();
                cache.isShow = true;
            }
            return;
        }
        var frameSize = index_1["default"].getFrameSize();
        var width = frameSize.width;
        var left = 0;
        var top = FLWechatGameBannerAd2.getBannerTop();
        switch (this.styleType) {
            case "LANDSCAPE":
                width = this.width;
                left = FLWechatGameBannerAd2.getBannerLeft(this.left);
                top = this.top * frameSize.height / (index_1["default"].getVisibleSize().height / 2);
                break;
            case "LANDSCAPE_CENTER":
                width = this.width;
                left = (index_1["default"].getFrameSize().width - this.width) / 2;
                top = this.top * frameSize.height / (index_1["default"].getVisibleSize().height / 2);
                break;
            default:
                break;
        }
        var view = wx.createBannerAd({ adUnitId: adUnitId, style: { left: left, top: top, width: width } });
        // 更新banner的自动刷新间隔
        try {
            this.updateBannerInterval = window.serverConfig ? window.serverConfig.BANNER_UPDATE_INTERVAL : 180;
            this.loadBannerMaxCount = window.serverConfig ? window.serverConfig.BANNER_LOAD_MAX : 20;
        }
        catch (error) {
            this.updateBannerInterval = 60;
            this.loadBannerMaxCount = 20;
        }
        cache = { view: view, adUnitId: adUnitId, showTime: 0 };
        FLWechatGameBannerAd2.banners[adUnitId] = cache;
        ++this.loadCount;
        this.bindADViewEvents(view, cache, adUnitId, isShow);
        if (cache && isShow) {
            cache.view.show();
            cache.isShow = true;
        }
    };
    /** 绑定广告事件 */
    FLWechatGameBannerAd2.prototype.bindADViewEvents = function (view, cache, adUnitId, isShow) {
        var _this = this;
        view.onLoad(function () {
            cache && (cache.isLoaded = true);
            FLSystemEvent_1["default"].emit(FLWechatGameBannerAd2.EEventName.LOAD_SUCCESSED_BANNER_AD, {
                adKey: _this.adConfigKey,
                adId: _this.adUnitId,
                posTag: _this.positionTag,
                loadCount: _this.loadCount
            });
            FLAnalytics_1["default"].sendUserEvent('拉取banner成功', {
                adKey: _this.adConfigKey,
                adId: _this.adUnitId,
                posTag: _this.positionTag,
                loadCount: _this.loadCount
            });
            FLWechatGameBannerAd2.loadSuccCount += 1;
        });
        view.onError(function (err) {
            cache && (cache.isLoaded = false);
            ++_this.loadErrorCount;
            if (_this.loadErrorCount > 5) {
                FLAnalytics_1["default"].sendUserEvent('拉取banner失败', __assign({ adKey: _this.adConfigKey, adId: _this.adUnitId, posTag: _this.positionTag, loadErrCount: _this.loadErrorCount }, err));
            }
            else {
                FLAnalytics_1["default"].sendUserEvent('加载banner错误', __assign({ adKey: _this.adConfigKey, adId: _this.adUnitId, posTag: _this.positionTag, loadErrCount: _this.loadErrorCount }, err));
                try {
                    view.hide();
                    view.offLoad();
                    view.offError();
                    view.destroy();
                }
                catch (error) {
                }
                try {
                    FLWechatGameBannerAd2.banners[adUnitId] = undefined;
                    // this && this.scheduleOnce(this.createBanner.bind(this, isShow), 0.3);
                    _this.onErrorVideoAd(err);
                }
                catch (error) { }
            }
        });
    };
    /** 刷新banner */
    FLWechatGameBannerAd2.prototype.updateBanner = function () {
        ++this.quickUpdateCount;
        this.destroyBanner();
        try {
            this.createBanner();
            this.show();
        }
        catch (error) { }
    };
    // 验证是否快速刷新
    FLWechatGameBannerAd2.prototype.checkQuickUpdate = function (cache) {
        if (!this.isQuickUpdate || FLGameConfig_1["default"].serverConfig.QUICK_UPDATE_BANNER_INTERVAL > cache.showTime) {
            return false;
        }
        if (this.quickUpdateCount > FLGameConfig_1["default"].serverConfig.QUICK_UPDATE_BANNER_COUNT) {
            return false;
        }
        if (FLGameConfig_1["default"].serverConfig.SWITCH_QUICK_UPDATE_BANNER === 3 || FLGameConfig_1["default"].serverConfig.SWITCH_QUICK_UPDATE_BANNER === 0) {
            return false;
        }
        return true;
    };
    /**
     * 显示Banner广告
     *
     * 如果广告未创建，则临时创建并强制显示
     */
    FLWechatGameBannerAd2.prototype.show = function () {
        var cache = FLWechatGameBannerAd2.banners[this.adUnitId];
        if (!cache || !cache.view || !cache.view.show) {
            return this.createBanner(true);
        }
        cache.view.show();
        cache.isShow = true;
    };
    /**
     * 隐藏Banner广告
     */
    FLWechatGameBannerAd2.prototype.hide = function () {
        this.unscheduleAllCallbacks();
        try {
            var cache = FLWechatGameBannerAd2.banners[this.adUnitId];
            if (cache && cache.view) {
                cache.view.hide();
                cache.isShow = false;
                cache.view.offLoad();
                cache.view.offError();
            }
        }
        catch (error) { }
    };
    FLWechatGameBannerAd2.prototype.destroyBanner = function () {
        this.unscheduleAllCallbacks();
        var adUnitId = this.adUnitId;
        try {
            var cache = FLWechatGameBannerAd2.banners[adUnitId];
            if (cache && cache.view) {
                cache.view.hide();
                cache.view.offLoad();
                cache.view.offError();
                cache.view.destroy();
            }
        }
        catch (error) { }
        FLWechatGameBannerAd2.banners[adUnitId] = undefined;
        return adUnitId;
    };
    /** 隐藏所有广告，包括驻留广告 */
    FLWechatGameBannerAd2.hideAllBannerAd = function () {
        var cache;
        for (var key in FLWechatGameBannerAd2.banners) {
            cache = FLWechatGameBannerAd2.banners[key];
            if (!cache || !cache.view || !cache.view.hide) {
                FLWechatGameBannerAd2.banners[key] = undefined;
                continue;
            }
            cache.view.hide();
            cache.isShow = false;
        }
    };
    /** 获取Banner的Top */
    FLWechatGameBannerAd2.getBannerTop = function () {
        var visibleSize = index_1["default"].getVisibleSize();
        var top = visibleSize.height - 255;
        if (visibleSize.height / visibleSize.width >= 2) {
            top = visibleSize.height - 305;
        }
        top *= index_1["default"].getFrameSize().width / visibleSize.width;
        // 全面屏-305
        // 非全面瓶-255
        return top;
    };
    /** 获取Banner的Left */
    FLWechatGameBannerAd2.getBannerLeft = function (left) {
        if (left === void 0) { left = 0; }
        var visibleSize = index_1["default"].getVisibleSize();
        var result = 0;
        if (visibleSize.width / visibleSize.height >= 2) {
            result = 40;
        }
        result *= index_1["default"].getFrameSize().width / visibleSize.width;
        // 全面屏-305
        // 非全面瓶-255
        return left + result;
    };
    // 广告错误
    FLWechatGameBannerAd2.prototype.onErrorVideoAd = function (res) {
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
    FLWechatGameBannerAd2.prototype.sendWarning = function (code) {
        code = code || '-1000';
        var isSend = 0;
        var BannerSendWaring = FLStore_1["default"].getTodayValue('BannerSendWaring', 0);
        if (BannerSendWaring) {
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
        if (isSend === 1 && BannerSendWaring === 0) {
            FLStore_1["default"].setTodayValue('BannerSendWaring', 1);
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
    // =======================================
    // 静态属性定义(以static修饰)
    // =======================================
    /** 游戏事件对象 */
    FLWechatGameBannerAd2.EEventName = {
        // 在这里定义事件(key-value形式，key必须全大写下划线分隔，value必须是字符串)
        // 隐藏所有的Banner广告
        HIDE_ALL_BANNER_AD: 'HIDE_ALL_BANNER_AD',
        // 显示驻留Banner广告
        SHOW_RESIDENT_BANNER_AD: 'SHOW_RESIDENT_BANNER_AD',
        // 加载Banner成功
        LOAD_SUCCESSED_BANNER_AD: 'LOAD_SUCCESSED_BANNER_AD'
    };
    /** 广告benner集合对象缓存 */
    FLWechatGameBannerAd2.banners = {};
    /** 加载广告成功的次数 */
    FLWechatGameBannerAd2.loadSuccCount = 0;
    return FLWechatGameBannerAd2;
}(FLBehavior_1["default"]));
exports["default"] = FLWechatGameBannerAd2;
try {
    window.FLWechatGameBannerAd2 = FLWechatGameBannerAd2;
}
catch (error) { }
