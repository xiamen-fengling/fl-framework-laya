"use strict";
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 设备信息
 * 曾彬思
 * 2020-03-05
 */
exports.__esModule = true;
var FLDevice = /** @class */ (function () {
    function FLDevice() {
    }
    FLDevice.init = function () {
        try {
            FLDevice.os = Laya.Browser.window.conchConfig.getOS().indexOf('ios') !== -1 ? FLDevice.OS_IOS : FLDevice.OS_ANDROID;
        }
        catch (error) {
            FLDevice.os = 'unknow';
        }
        if (Laya.Browser.onMiniGame || navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1) {
            FLDevice.platform = FLDevice.WECHAT_GAME;
        }
        else {
            FLDevice.platform = FLDevice.BROWSER;
        }
    };
    /**
     * 是否微信小游戏的ios环境
     */
    FLDevice.isIosEvivorment = function () {
        return FLDevice.isWechatGame() && FLDevice.getSystemInfoSync().system.indexOf('iOS') !== -1;
    };
    /**
     * 是否原生iOS环境
     */
    FLDevice.isNativeIOS = function () {
        return FLDevice.isNative && FLDevice.OS_IOS === FLDevice.os;
    };
    /**
     * 是否原生android OS环境
     */
    FLDevice.isNativeAndroid = function () {
        return FLDevice.isNative && FLDevice.OS_ANDROID === FLDevice.os;
    };
    /**
     * 是否iOS浏览器环境
     */
    FLDevice.isBrowserIOS = function () {
        return FLDevice.isBrowser && FLDevice.OS_IOS === FLDevice.os;
        ;
    };
    /**
     * 是否android浏览器环境
     */
    FLDevice.isBrowserAndroid = function () {
        return FLDevice.isBrowser && FLDevice.OS_ANDROID === FLDevice.os;
    };
    /**
     * 是否是微信浏览器环境
     */
    FLDevice.isBrowserWeChat = function () {
        var ua = window.navigator.userAgent.toLowerCase();
        // console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
        var tag = ua.match(/MicroMessenger/i);
        if (tag && tag.toString() == 'micromessenger') {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 是否是微信小游戏环境
     */
    FLDevice.isWechatGame = function () {
        return FLDevice.platform === FLDevice.WECHAT_GAME;
    };
    /**
     * 是否是QQ玩一玩
     */
    FLDevice.isQQPlay = function () {
        return FLDevice.platform === FLDevice.QQ_PLAY;
    };
    /**
     * 是否是移动设备原生环境
     */
    FLDevice.isMobileNative = function () {
        return FLDevice.isMobile && FLDevice.isNative;
    };
    /**
     * 是否是移动设备浏览器环境
     */
    FLDevice.isMobileBrowser = function () {
        return FLDevice.isMobile && FLDevice.isBrowser;
    };
    /**
     * 获取操作系统名称
     */
    FLDevice.getOSName = function () {
        return FLDevice.os;
    };
    /**
     * 获取系统版本号
     */
    FLDevice.getOSVersion = function () {
        return FLDevice.osVersion;
    };
    ;
    /**
     * 获取系统版本号
     */
    FLDevice.getOSMainVersion = function () {
        return FLDevice.osMainVersion;
    };
    ;
    /**
     * 获取浏览器版本号
     */
    FLDevice.getBrowerVersion = function () {
        return FLDevice.browserVersion;
    };
    ;
    /**
     * 获取浏览器类型
     */
    FLDevice.getBrowserType = function () {
        return FLDevice.browserType;
    };
    ;
    /**
     * 获取运行环境字符串
     *
     * @static
     * @returns {string}
     * @memberof FLDevice
     */
    FLDevice.getEnvString = function () {
        if (FLDevice.isWechatGame()) {
            return 'wx_game';
        }
        else if (FLDevice.isBrowserWeChat()) {
            return 'wx_browser';
        }
        else if (FLDevice.isNativeIOS()) {
            return 'ios_native';
        }
        else if (FLDevice.isNativeAndroid()) {
            return 'and_native';
        }
        else if (FLDevice.isBrowserIOS()) {
            return 'ios_browser';
        }
        else if (FLDevice.isBrowserAndroid()) {
            return 'and_browser';
        }
        else {
            return 'browser';
        }
    };
    /**
     * 获取语言简称
     */
    FLDevice.getLanguage = function () {
        return FLDevice.language;
    };
    /**
     * 是否是英语
     */
    FLDevice.isLanguageEnglish = function () {
        return FLDevice.language === FLDevice.LANGUAGE_ENGLISH;
    };
    /**
     * 是否是中文
     */
    FLDevice.isLanguageChinese = function () {
        return FLDevice.language === FLDevice.LANGUAGE_CHINESE;
    };
    /**
     * 获取网络类型
     * 网络类型无法获取，默认将返回 FLDevice.NetworkType.LAN
     */
    FLDevice.getNetworkType = function () {
        var type = FLDevice.getNetworkType();
        return type;
    };
    /**
     * 获取电量
     * 如果电量无法获取，默认将返回 1
     */
    FLDevice.getBatteryLevel = function () {
        return FLDevice.getBatteryLevel();
    };
    /**
     * 从浏览器打开url
     */
    FLDevice.openURL = function (url) {
        FLDevice.openURL(url);
    };
    /**
     * 通过微信接口 获取系统信息
     */
    FLDevice.getSystemInfoSync = function () {
        if (!FLDevice.isWechatGame()) {
            return null;
        }
        // {
        //     /** 手机品牌 */
        //     brand,
        //         /** 手机型号 */
        //         model,
        //         /** 设备像素比 */
        //         pixelRatio,
        //         /** 屏幕宽度 */
        //         screenWidth,
        //         /** 屏幕高度 */
        //         screenHeight,
        //         /** 可使用窗口宽度 */
        //         windowWidth,
        //         /** 可使用窗口高度 */
        //         windowHeight,
        //         /** 微信设置的语言 */
        //         language,
        //         /** 微信版本号 */
        //         version,
        //         /** 操作系统版本 */
        //         system,
        //         /** 客户端平台 */
        //         platform,
        //         /** 用户字体大小设置 */
        //         fontSizeSetting
        //     /** 客户端基础库版本 */,
        //         SDKVersion,
        //         /** 性能等级 */
        //         benchmarkLevel,
        //         /** 电量，范围 1 - 100	 */
        //         battery,
        //         /** wifi 信号强度，范围 0 - 4 */
        //         wifiSignal,
        // }
        var system = wx.getSystemInfoSync();
        return system;
    };
    /** 系统 */
    FLDevice.os = 'iOS';
    /** 平台 */
    FLDevice.platform = 'wechatgame';
    /** 浏览器类型 */
    FLDevice.browserType = 'chrome';
    /** 系统版本 */
    FLDevice.osVersion = '1.0';
    /** 系统主版本 */
    FLDevice.osMainVersion = 1;
    /** 浏览器版本 */
    FLDevice.browserVersion = '1.0';
    /** 是否是原生App平台 */
    FLDevice.isNative = false;
    /** 是否是浏览器平台 */
    FLDevice.isBrowser = false;
    /** 是否是移动设备 */
    FLDevice.isMobile = false;
    /** 设备语言 */
    FLDevice.language = 'zh';
    FLDevice.OS_IOS = 'iOS';
    FLDevice.OS_ANDROID = 'android';
    FLDevice.WECHAT_GAME = 'wechatgame';
    FLDevice.IPHONE = 'iPhone';
    FLDevice.ANDROID = 'android';
    FLDevice.QQ_PLAY = 'qqplay';
    FLDevice.BROWSER = 'browser';
    FLDevice.LANGUAGE_ENGLISH = 'en';
    FLDevice.LANGUAGE_CHINESE = 'zh';
    return FLDevice;
}());
exports["default"] = FLDevice;
FLDevice.init();
