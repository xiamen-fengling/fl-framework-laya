"use strict";
exports.__esModule = true;
var FLStore_1 = require("../Framework/Core/Base/FLStore");
var FLSystemEvent_1 = require("../Framework/Core/Base/FLSystemEvent");
var GameDataCenter = /** @class */ (function () {
    function GameDataCenter() {
    }
    Object.defineProperty(GameDataCenter, "playToday", {
        get: function () {
            if (GameDataCenter._playToday === null) {
                GameDataCenter._playToday = FLStore_1["default"].getTodayValue("_playToday", 1);
            }
            return GameDataCenter._playToday;
        },
        set: function (v) {
            v = Math.round(v);
            GameDataCenter._playToday = v;
            FLStore_1["default"].setTodayValue("_playToday", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataCenter, "showGuide", {
        get: function () {
            if (GameDataCenter._showGuide === null) {
                GameDataCenter._showGuide = FLStore_1["default"].get("_showGuide", 1);
            }
            return GameDataCenter._showGuide;
        },
        set: function (v) {
            v = Math.round(v);
            GameDataCenter._showGuide = v;
            FLStore_1["default"].set("_showGuide", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataCenter, "level", {
        get: function () {
            if (GameDataCenter._level === null) {
                GameDataCenter._level = FLStore_1["default"].get("_level", 0);
            }
            return GameDataCenter._level;
        },
        /** 当前关卡 */
        set: function (v) {
            v = Math.round(v);
            GameDataCenter._level = v;
            FLStore_1["default"].set("_level", v);
            FLSystemEvent_1["default"].emit(GameDataCenter.EEventName.UPDATE_DATA_LEVEL, GameDataCenter._level);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataCenter, "coin", {
        get: function () {
            if (GameDataCenter._coin === null) {
                GameDataCenter._coin = FLStore_1["default"].get("_coin", 0);
            }
            return GameDataCenter._coin;
        },
        /** 拥有的金币 */
        set: function (v) {
            v = Math.round(v);
            GameDataCenter._coin = v;
            FLStore_1["default"].set("_coin", v);
            FLSystemEvent_1["default"].emit(GameDataCenter.EEventName.UPDATE_DATA_COIN, GameDataCenter._coin);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataCenter, "isNewPlayer", {
        /**是否新用户 */
        get: function () {
            var isNewPlayer = (GameDataCenter.first || FLStore_1["default"].get('isNotFirstEnterGame', 0) !== 1);
            if (isNewPlayer) {
                FLStore_1["default"].setTodayValue('isTodayNewPlayer', 1);
            }
            return isNewPlayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataCenter, "isTodayNewPlayer", {
        /**是否当天新用户 */
        get: function () {
            var isNewPlayer = GameDataCenter.isNewPlayer;
            if (isNewPlayer) {
                return true;
            }
            else {
                return FLStore_1["default"].getTodayValue('isTodayNewPlayer', 0);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataCenter, "nickname", {
        get: function () {
            return GameDataCenter._nickname;
        },
        /** 昵称 */
        set: function (v) {
            GameDataCenter._nickname = v;
            FLSystemEvent_1["default"].emit(GameDataCenter.EEventName.UPDATE_DATA_NICKNAME, GameDataCenter._nickname);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataCenter, "avatar", {
        get: function () {
            return GameDataCenter._avatar;
        },
        /** 头像 */
        set: function (v) {
            GameDataCenter._avatar = v;
            FLSystemEvent_1["default"].emit(GameDataCenter.EEventName.UPDATE_DATA_AVATAR, GameDataCenter._avatar);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataCenter, "gender", {
        get: function () {
            return GameDataCenter._gender;
        },
        /** 性别 */
        set: function (v) {
            GameDataCenter._gender = v;
            FLSystemEvent_1["default"].emit(GameDataCenter.EEventName.UPDATE_DATA_GENDER, GameDataCenter._gender);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataCenter, "openId", {
        get: function () {
            return GameDataCenter._openId;
        },
        /** openId */
        set: function (v) {
            GameDataCenter._openId = v;
            FLSystemEvent_1["default"].emit(GameDataCenter.EEventName.UPDATE_DATA_OPENID, GameDataCenter._openId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataCenter, "unionId", {
        get: function () {
            return GameDataCenter._unionId;
        },
        /** unionId */
        set: function (v) {
            GameDataCenter._unionId = v;
            FLSystemEvent_1["default"].emit(GameDataCenter.EEventName.UPDATE_DATA_UNIONID, GameDataCenter._unionId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataCenter, "userTag", {
        get: function () {
            return GameDataCenter._userTag;
        },
        /** 用户标识 */
        set: function (v) {
            GameDataCenter._userTag = v;
            FLSystemEvent_1["default"].emit(GameDataCenter.EEventName.UPDATE_DATA_USERTAG, GameDataCenter._userTag);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataCenter, "userId", {
        get: function () {
            return GameDataCenter._userId;
        },
        /** 用户Id */
        set: function (v) {
            GameDataCenter._userId = v;
            FLSystemEvent_1["default"].emit(GameDataCenter.EEventName.UPDATE_DATA_USERID, GameDataCenter._userId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataCenter, "token", {
        get: function () {
            return GameDataCenter._token;
        },
        /** 身份凭证 */
        set: function (v) {
            GameDataCenter._token = v;
            FLSystemEvent_1["default"].emit(GameDataCenter.EEventName.UPDATE_DATA_TOKEN, GameDataCenter._token);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataCenter, "etag", {
        get: function () {
            return GameDataCenter._etag;
        },
        /** 推广渠道标识 */
        set: function (v) {
            GameDataCenter._etag = v;
            FLSystemEvent_1["default"].emit(GameDataCenter.EEventName.UPDATE_DATA_ETAG, GameDataCenter._etag);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDataCenter, "euid", {
        get: function () {
            return GameDataCenter._euid;
        },
        /** 推广员UID */
        set: function (v) {
            GameDataCenter._euid = v;
            FLSystemEvent_1["default"].emit(GameDataCenter.EEventName.UPDATE_DATA_EUID, GameDataCenter._euid);
        },
        enumerable: true,
        configurable: true
    });
    /** 事件枚举 */
    GameDataCenter.EEventName = {
        UPDATE_DATA_NICKNAME: 'e10001',
        UPDATE_DATA_AVATAR: 'e10002',
        UPDATE_DATA_GENDER: 'e10003',
        UPDATE_DATA_OPENID: 'e10004',
        UPDATE_DATA_UNIONID: 'e10005',
        UPDATE_DATA_USERTAG: 'e10006',
        UPDATE_DATA_USERID: 'e10007',
        UPDATE_DATA_TOKEN: 'e10008',
        UPDATE_DATA_ETAG: 'e10009',
        UPDATE_DATA_EUID: 'e10010',
        UPDATE_DATA_STONE: 'UPDATE_DATA_STONE',
        UPDATE_BALL_TYPE: 'UPDATE_BALL_TYPE',
        UPDATE_BALL_SKIN: 'UPDATE_BALL_SKIN',
        UPDATE_KEY_SHOW: 'UPDATE_KEY_SHOW',
        UPDATE_PLAYER_POWER: 'UPDATE_PLAYER_POWER',
        UPDATE_COUNT_TIME: 'UPDATE_COUNT_TIME',
        UPDATE_DATA_LEVEL: 'UPDATE_DATA_LEVEL',
        UPDATE_DATA_COIN: 'UPDATE_DATA_COIN'
    };
    // 昵称
    GameDataCenter._nickname = '';
    // 头像
    GameDataCenter._avatar = '';
    // 性别
    GameDataCenter._gender = 0;
    GameDataCenter._openId = '';
    GameDataCenter._unionId = '';
    GameDataCenter._userTag = '';
    GameDataCenter._userId = '';
    // 身份凭证
    GameDataCenter._token = '';
    // 推广渠道标记
    GameDataCenter._etag = '';
    // 推广员UID
    GameDataCenter._euid = '';
    // 是否第一次进入游戏(刚注册)
    GameDataCenter.first = 0;
    // AB 测试标记
    GameDataCenter.abTestTag = 0;
    //是否今日注册
    GameDataCenter.todayReg = 0;
    /**是否是游戏结束跳转的全屏卖量页 */
    GameDataCenter.isGameEndIntoBoxPage = false;
    /**游戏结束跳转到全屏卖量页次数 */
    GameDataCenter.intoBoxPageNum = 0;
    /** 打开盒子页的前一个页面标记 */
    GameDataCenter.prePositionTag = '';
    //打开盒子页
    GameDataCenter.openBox = false;
    /**更换背景下标 */
    GameDataCenter.bgIndex = 1;
    /**是否是今天第一次进来 */
    GameDataCenter._playToday = null;
    //打开误触
    GameDataCenter.openTouch = false;
    GameDataCenter._showGuide = null;
    GameDataCenter._level = null;
    GameDataCenter._coin = null;
    /** 是否处于磁铁状态 */
    GameDataCenter.isMagnetState = false;
    return GameDataCenter;
}());
exports["default"] = GameDataCenter;
try {
    window.GameDataCenter = GameDataCenter;
}
catch (error) { }
