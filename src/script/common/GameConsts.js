"use strict";
exports.__esModule = true;
// 页面定义
exports.PageName = {
    /**hud界面 */
    PAGE_HUD: "",
    /**游戏结束界面 */
    PAGE_GAMEOVER: "",
    /**加载界面 */
    PAGE_LOAD: "LoadPage.scene",
    /** 首页 */
    PAGE_HOME: "HomePage.scene",
    /** 游戏页UI */
    PAGE_GAME_UI: "GameUIPage.scene",
    /** 游戏结束排行 */
    PAGE_ROLE_RANK: "RoleRankPage.scene",
    /** 3D场景 */
    GAME: "Game3D.scene",
    /** 旗帜页 */
    PAGE_TOUCH_BANNER: "TouchBannerPage.scene",
    /** 小程序页 */
    PAGE_GAME_LIST: "GameListPage.scene",
    /** 结算页 */
    PAGE_RESULT: "ResultPage.scene",
    /** 常驻节点 */
    PAGE_GAME_MGR: "GameMgrPage.scene",
    /**好玩热玩 */
    PAGE_FRIEND_HOT: "FriendHotPage.scene",
    /**胜利页 */
    PAGE_SCORE: "ScorePage.scene",
    /** 游戏内关卡显示 */
    PAGE_SHOW_RANK: "ShowRankPage.scene",
    /**误触boss页 */
    BOSS_SCENE: ""
};
/**
 * UI 页面层级 zOrder
 */
var LayerName;
(function (LayerName) {
    LayerName[LayerName["BACKGROUND"] = -1] = "BACKGROUND";
    LayerName[LayerName["UI"] = 0] = "UI";
    LayerName[LayerName["UI_3D"] = 15] = "UI_3D";
    LayerName[LayerName["EFFECT"] = 20] = "EFFECT";
    LayerName[LayerName["POPUP"] = 25] = "POPUP";
    LayerName[LayerName["LOADING"] = 30] = "LOADING";
})(LayerName = exports.LayerName || (exports.LayerName = {}));
/** 游戏事件 */
var EGameEventName;
(function (EGameEventName) {
    // 游戏准备
    EGameEventName["GAME_READY"] = "GAME_READY";
    // 游戏开始
    EGameEventName["GAME_STARTED"] = "GAME_STARTED";
    // 游戏结束
    EGameEventName["GAME_ENDED"] = "GAME_ENDED";
    // 旋转相机
    EGameEventName["TURN_CAMERA"] = "TURN_CAMERA";
    //场景初始化完毕
    EGameEventName["GAME_INIT_END"] = "GAME_INIT_END";
    //更新游戏进度条
    EGameEventName["UPDATE_RANK"] = "UPDATE_RANK";
    //倒计时等待游戏结束
    EGameEventName["WAITING_GAMEEND"] = "WAITING_GAMEEND";
    //特效创建
    EGameEventName["EFFECT_CREATE"] = "EFFECT_CREATE";
    //敌人被炸飞
    EGameEventName["BOOM_ENEMY"] = "BOOM_ENEMY";
    EGameEventName["LOAD_SCENE3D_ENDED"] = "LOAD_SCENE3D_ENDED";
    //显示bomb特效
    EGameEventName["SHOW_BOMG"] = "SHOW_BOMG";
    //打开游戏场景
    EGameEventName["OPEN_GAME3D"] = "OPEN_GAME3D";
    //关闭banner
    EGameEventName["CLOSE_BANNER"] = "CLOSE_BANNER";
})(EGameEventName = exports.EGameEventName || (exports.EGameEventName = {}));
var EPoolKey;
(function (EPoolKey) {
    EPoolKey["SELF_BOOM"] = "SELF_BOOM";
    EPoolKey["WOOD_BOOM"] = "WOOD_BOOM";
    EPoolKey["CADDY_BOOM"] = "CADDY_BOOM";
    EPoolKey["TANHUANG"] = "TANHUANG";
    EPoolKey["BAD_BOOM"] = "BAD_BOOM";
})(EPoolKey = exports.EPoolKey || (exports.EPoolKey = {}));
/** 角色状态 */
var ERoleState;
(function (ERoleState) {
    /**站立 */
    ERoleState[ERoleState["STAND"] = 0] = "STAND";
    /**跳跃 */
    ERoleState[ERoleState["JUMP"] = 1] = "JUMP";
    /**飞出去 */
    ERoleState[ERoleState["FLYOUT"] = 2] = "FLYOUT";
    /**飞的过程 */
    ERoleState[ERoleState["FLYING"] = 3] = "FLYING";
    /**跳跃下落 */
    ERoleState[ERoleState["FALL"] = 4] = "FALL";
    /**跑步 */
    ERoleState[ERoleState["RUN"] = 5] = "RUN";
    /**接触弹簧 */
    ERoleState[ERoleState["FLY_ALREADY"] = 6] = "FLY_ALREADY";
    /**空中扑腾 */
    ERoleState[ERoleState["FLY_GOGOGO"] = 7] = "FLY_GOGOGO";
})(ERoleState = exports.ERoleState || (exports.ERoleState = {}));
var EEffectType;
(function (EEffectType) {
    //自爆-主角，油桶
    EEffectType[EEffectType["SELF_BOOM"] = 0] = "SELF_BOOM";
    //糖果
    EEffectType[EEffectType["CANDDY"] = 1] = "CANDDY";
    //木箱
    EEffectType[EEffectType["WOOD_BOOM"] = 2] = "WOOD_BOOM";
    //坏箱子
    EEffectType[EEffectType["BAD_BOOM"] = 3] = "BAD_BOOM";
    //弹簧
    EEffectType[EEffectType["TANHUANG"] = 4] = "TANHUANG";
})(EEffectType = exports.EEffectType || (exports.EEffectType = {}));
/** 角色跑道 */
var ERoleWayIndex;
(function (ERoleWayIndex) {
    ERoleWayIndex[ERoleWayIndex["LEFT"] = 0] = "LEFT";
    ERoleWayIndex[ERoleWayIndex["CENTER"] = 1] = "CENTER";
    ERoleWayIndex[ERoleWayIndex["RIGHT"] = 2] = "RIGHT";
})(ERoleWayIndex = exports.ERoleWayIndex || (exports.ERoleWayIndex = {}));
var EDrection;
(function (EDrection) {
    EDrection["LEFT"] = "LEFT";
    EDrection["RIGHT"] = "RIGHT";
    EDrection["FORWARD"] = "FORWARD";
    EDrection["BACKWARD"] = "BACKWARD";
    EDrection["UP"] = "UP";
    EDrection["BOTTOM"] = "BOTTOM";
    EDrection["CENTER"] = "CENTER";
    EDrection["HORIZONTAL"] = "HORIZONTAL";
    EDrection["VERTICAL"] = "VERTICAL";
})(EDrection = exports.EDrection || (exports.EDrection = {}));
