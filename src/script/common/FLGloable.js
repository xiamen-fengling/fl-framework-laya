"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var FLGloable = /** @class */ (function () {
    function FLGloable() {
    }
    FLGloable.log = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (FLGloable.isOpenLog) {
            console.log.apply(console, __spreadArrays([message], optionalParams));
        }
    };
    FLGloable.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (FLGloable.isOpenLog) {
            console.error.apply(console, __spreadArrays([message], optionalParams));
        }
    };
    /**------------------- 游戏内相关 -------------------------  */
    FLGloable.currentLevel = 0;
    /**是否有人到达终点 */
    FLGloable.isGameEnded = false;
    /**玩家是否胜利通关 */
    FLGloable.iswin = false;
    /*当前关卡的全部距离 */
    FLGloable._FLGloableDistance = 0;
    /**是否在处于重生状态 */
    FLGloable.isRoleReborn = false;
    /**是否打开重生开关 */
    FLGloable.isOpenResborn = true;
    /**玩家是否自动跑（开挂） */
    FLGloable.isAutoRun = false;
    /**是否正在显示 向上引导 */
    FLGloable.isShowUpGuide = false;
    /**是否正在显示 向下引导 */
    FLGloable.isShowDownGuide = false;
    /**是否正在显示 向左引导 */
    FLGloable.isShowLeftGuide = false;
    /**是否正在显示 向右引导 */
    FLGloable.isShowRightGuide = false;
    /**是否开启关卡调试 */
    FLGloable.isOpenLevelDebug = false;
    /**调试关卡 */
    FLGloable.levelDebugNum = 0;
    /**是否覆盖本地gamedatecenter关卡数据 true- 调试关卡=本地关卡 */
    FLGloable.isWriteOverLevel = true;
    /**loading资源是否加载完成 */
    FLGloable._isResourceLoadOver = false;
    /**分包是否加载完成 */
    FLGloable._isFenbaoLoadOver = false;
    /**------------------------------------------------  */
    /**--------------------全局-------------------------- */
    /**是否开启控制台打印 */
    FLGloable.isOpenLog = false;
    /**是否第一次加载资源 */
    FLGloable.isFirstLoadingRes = true;
    /**是否第一次进游戏 */
    FLGloable.isFrstEnter = true;
    return FLGloable;
}());
exports.FLGloable = FLGloable;
