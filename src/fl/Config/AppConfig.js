"use strict";
exports.__esModule = true;
var AppConfig = /** @class */ (function () {
    function AppConfig() {
    }
    Object.defineProperty(AppConfig, "APP_ID", {
        /** App ID 由对应的线上渠道分配 */
        get: function () {
            var result = 'wxf607dba4f864ef5a';
            // switch (cc.sys.platform) {
            //     case cc.sys.WECHAT_GAME:
            //         result = 'wx3fc74cc72434ee0f';
            //         break;
            //     case cc.sys.IPHONE:
            //         result = 'appMgt2ADcNtgnzCBWz';
            //         break;
            //     case cc.sys.ANDROID:
            //         result = 'wx454118f26df5e82d';
            //         break;
            //     default:
            //         break;
            // }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    /** 游戏名称 */
    AppConfig.GAME_NAME = '';
    /**
     * 版本号(版本号规则请参照https://www.cnblogs.com/scottx/p/5463447.html)
     * 主版本号.子版本号.阶段版本号.日期版本号
     */
    AppConfig.APP_VERSION = '1.0.0';
    /** 白名单列表 */
    AppConfig.navigateToMiniProgramAppIdList = [];
    return AppConfig;
}());
exports["default"] = AppConfig;
try {
    window.APP_ID = AppConfig.APP_ID;
    window.GAME_NAME = AppConfig.GAME_NAME;
    window.APP_VERSION = window.APP_VERSION || AppConfig.APP_VERSION;
    AppConfig.APP_VERSION = window.APP_VERSION;
    AppConfig.navigateToMiniProgramAppIdList = window.navigateToMiniProgramAppIdList || AppConfig.navigateToMiniProgramAppIdList;
}
catch (error) {
}
console.log('client-version:', AppConfig.APP_VERSION);
