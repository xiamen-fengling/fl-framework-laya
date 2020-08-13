"use strict";
exports.__esModule = true;
var FLDevice_1 = require("../Framework/Core/Base/FLDevice");
var FLGameConfig = /** @class */ (function () {
    function FLGameConfig() {
    }
    Object.defineProperty(FLGameConfig, "APP_SERVER_HOST", {
        /** 游戏服务器主机地址 */
        get: function () {
            var result = 'https://game-api.feigo.fun';
            switch (FLDevice_1["default"].platform) {
                case FLDevice_1["default"].WECHAT_GAME:
                    result = 'https://game-api.feigo.fun';
                    break;
                case FLDevice_1["default"].IPHONE:
                case FLDevice_1["default"].ANDROID:
                    result = 'https://app-api.feigo.fun';
                    break;
                default:
                    break;
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    FLGameConfig.isShowTouchByMistake = function (tag) {
        if (window.reviewSwitch || FLGameConfig.serverConfig.reviewSwitch || FLGameConfig.serverConfig["TOUCH_BANNER_SWITCH_" + tag] === 3) {
            return false;
        }
        // 次数上限限制
        window["TOUCH_BANNER_COUNT_" + tag] = window["TOUCH_BANNER_COUNT_" + tag] || 0;
        if (window["TOUCH_BANNER_COUNT_" + tag] >= FLGameConfig.serverConfig["TOUCH_BANNER_MAX_" + tag]) {
            return false;
        }
        window.gameCount = window.gameCount || 0;
        if (FLGameConfig.serverConfig["TOUCH_BANNER_INTERVAL_" + tag] < 0) {
            FLGameConfig.serverConfig["TOUCH_BANNER_INTERVAL_" + tag] = 0;
        }
        // 计算间隔和偏移
        if ((window.gameCount - FLGameConfig.serverConfig["TOUCH_BANNER_OFFSET_" + tag]) % (FLGameConfig.serverConfig["TOUCH_BANNER_INTERVAL_" + tag] + 1) === 0) {
            ++window["TOUCH_BANNER_COUNT_" + tag];
            return true;
        }
        else {
            return false;
        }
    };
    /** 来自服务端的配置 */
    FLGameConfig.serverConfig = {
        // 线上版本号
        proVersion: '0.0.0.0',
        // 分享总开关
        shareSwitch: 1,
        // 重置开关
        reviewSwitch: 1,
        // 根据系统屏蔽
        hideOnSystem: 'none',
        isEnabledWXSceneHide: 1,
        // 可观看视频的次数上限
        PLAY_VIDEO_MAX: 15,
        // 分享模式
        shareModel: 0,
        // 分享领取奖励的次数上限
        SHARE_MAX: 30,
        // 分享成功的判定时间
        shareSuccessDelayTime: 2.6,
        // 切换轮播状态
        mjSuccToChageSwitch: 1,
        // 拉取广告次数上限
        BANNER_LOAD_MAX: 15,
        // Banner自动刷新间隔
        BANNER_UPDATE_INTERVAL: 10,
        // 是否启用快速刷新Banner
        SWITCH_QUICK_UPDATE_BANNER: 15,
        // 快速刷新Banner次数
        QUICK_UPDATE_BANNER_COUNT: 15,
        // 快速刷新Banner时间间隔
        QUICK_UPDATE_BANNER_INTERVAL: 15,
        // 是否自动弹出跳转
        GAMEBOX_AUTO_SHOW_GOTO: 3,
        // 开关
        SWITCH_XXXXXXXXXXX: 3,
        // UI开关
        UI_SWITCH_XXXXXXXXX: 1,
        // 是否显示退出按钮
        UI_SWITCH_BUTTON_GAME_EXIT: 3,
        // 视频广告key
        AD_VIDEO_XXXXXXXXXXX: '',
        // Banner广告key
        AD_BANNER_HOME_PAGE: '',
        AD_BANNER_GAMEUI_PAGE: '',
        AD_BANNER_TOUCH_SYS_PAGE: '',
        AD_BANNER_RESULT_PAGE: '',
        AD_BANNER_RANK_PAGE: '',
        //新手引导开关
        SWITH_GUIDE: 0,
        //角色撞障碍物多次后会重生功能
        SWITCH_REBORN: 0,
        //阿拉丁数据打点
        SWITCH_ALADDIN: 1,
        //盒子页是否显示banner
        SWITCH_SHOW_GAME_BOX_BANNER: 3,
        //盒子页显示banner时间
        GAMEBOX_BANNER_TIME: 2,
        //左上角banner开关
        SWITCH_LEFT_TOP_BANNER: 3,
        LEFT_BANNER_UPDATE_TIME: 3,
        LEFT_BANNER_UPDATE_COUNT: 3,
        //结算页显示领取炸弹
        SWITCH_SHOW_NEWBOX_BTN: 3,
        //全屏卖量2显示继续游戏时间
        SHOW_BOX2_TIME: 3,
        //全屏卖量3显示继续游戏时间
        GAMEBOX_BTN_SHOW_TIME: 3,
        //盒⼦⻚3是否显示的开关
        GAMEBOX_SWITCH: 2,
        //盒⼦⻚3是否显示的开关
        SWITCH_GAMEBOX_SHOW: 3,
        //盒⼦⻚
        SWITCH_BOX_PANEL: 3,
        //卖量页开关
        SWITCH_CHANGE_BOX: 1
    };
    return FLGameConfig;
}());
exports["default"] = FLGameConfig;
