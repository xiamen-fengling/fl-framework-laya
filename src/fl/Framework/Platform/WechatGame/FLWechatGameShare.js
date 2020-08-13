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
var FLSystemEvent_1 = require("../../Core/Base/FLSystemEvent");
var FLNetHTTP_1 = require("../../Core/Network/FLNetHTTP");
var FLGameConfig_1 = require("../../../Config/FLGameConfig");
var GameDataCenter_1 = require("../../../Config/GameDataCenter");
var FLWechatMiniGame_1 = require("./FLWechatMiniGame");
var FLDevice_1 = require("../../Core/Base/FLDevice");
var FLStore_1 = require("../../Core/Base/FLStore");
var AppConfig_1 = require("../../../Config/AppConfig");
var index_1 = require("../../index");
var FLAnalytics_1 = require("../../Core/Base/FLAnalytics");
var FLBehavior_1 = require("../../Core/FLBehavior");
/**
 * copyright (c) 2017-2019 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 微信小游戏分享
 * zengbinsi
 * 2018-10-26
 */
var FLWechatGameShare = /** @class */ (function (_super) {
    __extends(FLWechatGameShare, _super);
    function FLWechatGameShare() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop { name: shareTag, type: String, tips: '分享标记，用于客户端标识是哪个地方拉起分享的' } */
        _this.shareTag = '';
        /** @prop { name: shareType, type: Number tips: '分享标记，用于服务端标识是哪个地方拉起分享的(25:助力分享，99:其它)' } */
        _this.shareType = 99;
        /** @prop { name: isCumulativeShareCount, type: Bool, tips: '是否累计分享今日次数' } */
        _this.isCumulativeShareCount = true;
        /** @prop { name: shareParamsSource, type: Option, option: "SERVER,STATIC", default: "SERVER", tips: '分享参数来源: SERVER:从服务端获取,STATIC:组件绑定,' } */
        _this.shareParamsSource = 'SERVER';
        /** @prop { name: title, type: String, tips: '分享文案' } */
        _this.title = '';
        /** @prop { name: imgUrl, type: String, tips: '分享图URL' } */
        _this.imgUrl = '';
        /** @prop { name: query, type: String, tips: '分享query参数' } */
        _this.query = '';
        /** @prop { name: routePath, type: String, default: "/api/config/share-config", tips: '服务端获取分享参数的接口路由，不包含服务器主机地址' } */
        _this.routePath = '/api/config/share-config';
        // /** @prop { name: shareCallbacks, type: [cc.Component.EventHandler], tips: '分享回调。回调函数包含两个参数，第一个参数是error错误信息，第二个参数是result显示成功的信息' } */
        _this.shareCallbacks = [];
        return _this;
    }
    FLWechatGameShare.prototype.onLoaded = function () {
        console.log('000000');
        FLSystemEvent_1["default"].on('LOGIN_SUCCESSED', this.initShareParams, this);
        try {
            this.initShareParams();
        }
        catch (error) { }
        this.owner['FLWechatGameShare'];
    };
    FLWechatGameShare.prototype.onDestroy = function () {
        FLSystemEvent_1["default"].off('LOGIN_SUCCESSED', this.initShareParams, this);
    };
    // 初始化分享参数
    FLWechatGameShare.prototype.initShareParams = function () {
        if (this.shareParamsSource !== 'SERVER' || FLWechatGameShare.shareTitle.trim() !== '') {
            return;
        }
        this.getShareParamsFromServer();
    };
    /**
     * 获取分享参数
     */
    FLWechatGameShare.prototype.getShareParamsFromServer = function () {
        try {
            FLNetHTTP_1["default"].getAsync("" + FLGameConfig_1["default"].APP_SERVER_HOST + this.routePath, {
                'x-access-token': GameDataCenter_1["default"].token,
                'client-ver': AppConfig_1["default"].APP_VERSION
            }).then(function (res) {
                // 设置分享参数
                FLWechatGameShare.shareId = res.share_id;
                FLWechatGameShare.shareTitle = res.share_title;
                FLWechatGameShare.shareImgUrl = res.share_img;
                if (res.logo_status !== 1 && res.client_logo && res.client_logo !== '') {
                    FLWechatGameShare.shareImgUrl = res.client_logo;
                }
                FLWechatMiniGame_1["default"].setShareAppMessage(FLWechatGameShare.shareTitle, FLWechatGameShare.shareImgUrl, FLWechatGameShare.shareQuery);
                if (res.activity_id !== null && res.activity_id !== undefined && FLDevice_1["default"].isWechatGame()) {
                    wx.updateShareMenu({
                        isUpdatableMessage: true,
                        activityId: res.activity_id,
                        templateInfo: {
                            parameterList: [
                                {
                                    name: 'member_count',
                                    value: "" + (res.member_count || 3124123)
                                }, {
                                    name: 'room_limit',
                                    value: "" + (res.room_limit || 4312412)
                                }
                            ]
                        }
                    });
                }
            })["catch"](function (err) { });
        }
        catch (error) {
        }
    };
    /**
     * 拉起分享
     * @param query 分享参数
     */
    FLWechatGameShare.prototype.share = function (query) {
        var _this = this;
        if (!FLDevice_1["default"].isWechatGame()) {
            return this.shareCallbacks.map(function (fn) { return fn.runWith([undefined, { msg: '操作成功', query: query }]); });
        }
        var serverConfig = window.serverConfig || { SHARE_MAX: 30 };
        if (this.isCumulativeShareCount && FLStore_1["default"].getTodayValue("todayShareCount", 0) >= serverConfig.SHARE_MAX) {
            return FLWechatMiniGame_1["default"].showToast('今日分享次数已达上限', 1.5);
        }
        // 分享参数处理
        var title, img;
        if (FLWechatGameShare.shareTitle !== '') {
            title = FLWechatGameShare.shareTitle || this.title;
        }
        if (FLWechatGameShare.shareImgUrl !== '') {
            img = FLWechatGameShare.shareImgUrl || this.imgUrl;
        }
        if (!query && FLWechatGameShare.shareQuery !== '') {
            query = FLWechatGameShare.shareQuery;
        }
        if (FLWechatGameShare.shareId !== '') {
            query = query + "&share_id=" + FLWechatGameShare.shareId;
        }
        if (this.shareType !== undefined && this.shareType !== null) {
            query = query + "&type=" + this.shareType;
        }
        query = query + "&share_tag=" + this.shareTag + "&invite_tag=" + GameDataCenter_1["default"].userTag;
        // 分享成功的判定
        var isCancelled = false;
        if (true) {
            var callShareTimeStamp_1 = this.getTimeStamp();
            var shareId_1 = FLWechatGameShare.shareId;
            this.onShareResume = function () {
                FLSystemEvent_1["default"].off(index_1["default"].EEventName.EVENT_GAME_SHOW, _this.onShareResume, _this);
                if (FLGameConfig_1["default"].serverConfig.shareModel === 1) {
                    console.log('进入cancel模式');
                    setTimeout(function () {
                        // 分享被取消
                        if (isCancelled) {
                            return console.log('随机分享被取消概率30%', isCancelled, FLGameConfig_1["default"].serverConfig.shareModel);
                        }
                        else {
                            console.log('随机分享成功概率70%', isCancelled, FLGameConfig_1["default"].serverConfig.shareModel);
                            return _this.shareSuccessed(title, img, query);
                        }
                    }, 100);
                    return;
                }
                // 延时模式
                if (_this.getTimeStamp() - callShareTimeStamp_1 > (FLGameConfig_1["default"].serverConfig.shareSuccessDelayTime || FLWechatGameShare.shareSuccessDelayTime)) {
                    window.ALDStatistics && window.ALDStatistics.sendUserEvent('分享成功', { posTag: _this.shareTag, share_id: shareId_1 });
                    _this.shareSuccessed(title, img, query);
                }
                else {
                    window.ALDStatistics && window.ALDStatistics.sendUserEvent('分享失败', { posTag: _this.shareTag, share_id: shareId_1 });
                    _this.shareFailed(title, img, query);
                }
            };
            FLSystemEvent_1["default"].on(index_1["default"].EEventName.EVENT_GAME_SHOW, this.onShareResume, this);
        }
        window.ALDStatistics && window.ALDStatistics.sendUserEvent('拉起分享', { posTag: this.shareTag, share_id: FLWechatGameShare.shareId });
        // 拉起分享
        FLWechatGameShare.shareAppMessage(title, img, true, query, function (err, res) {
            // console.log('FLWechatGameShare callback', err, res, FLGameConfig.serverConfig.shareModel);
            if (FLGameConfig_1["default"].serverConfig.shareModel === 0) {
                isCancelled = false;
                return;
            }
            if (err) {
                isCancelled = true;
                return _this.shareFailed(title, img, query);
            }
            _this.shareSuccessed(title, img, query);
        });
        FLAnalytics_1["default"].sendUserEvent('触发分享');
    };
    // 分享成功处理
    FLWechatGameShare.prototype.shareSuccessed = function (title, img, query) {
        this.shareCallbacks.map(function (fn) { return fn.runWith([undefined, { msg: '操作成功', title: title, img: img, query: query }]); });
        if (this.isCumulativeShareCount) {
            var count = FLStore_1["default"].getTodayValue("todayShareCount", 0);
            FLStore_1["default"].setTodayValue("todayShareCount", count + 1);
        }
        this.getShareParamsFromServer();
        FLAnalytics_1["default"].sendUserEvent('分享成功');
    };
    // 分享失败处理
    FLWechatGameShare.prototype.shareFailed = function (title, img, query) {
        this.shareCallbacks.map(function (fn) { return fn.runWith([{ msg: '请分享到不同的群里', title: title, img: img, query: query }]); });
        FLAnalytics_1["default"].sendUserEvent('分享失败');
    };
    /**
     * 主动转发
     * 游戏内可通过 wx.shareAppMessage()接口直接调起转发界面，与被动转发类似，可以自定义转发卡片内容。
     * 关于分享票据，详询 https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/share.html?t=2018323
     *
     * @static
     * @param {string} title 转发面板标题
     * @param {string} imageUrl 转发面板分享图
     * @param {string} withShareTicket 是否启用分享票据
     * @param {string} query 查询串，必须是 key1=val1&key2=val2 的格式, 和网页URL带参数一样
     * @param {string} callback 成功回调
     * @memberof FLWechat
     */
    FLWechatGameShare.shareAppMessage = function (title, imageUrl, withShareTicket, query, callback) {
        if (!FLDevice_1["default"].isWechatGame()) {
            return;
        }
        try {
            if (wx && wx.aldShareAppMessage) {
                return wx.aldShareAppMessage({
                    imageUrl: imageUrl,
                    title: title,
                    query: query,
                    ald_desc: ""
                });
            }
        }
        catch (error) { }
        wx.shareAppMessage({
            title: title,
            imageUrl: imageUrl,
            withShareTicket: withShareTicket,
            query: query,
            success: function (res) {
                callback && callback(undefined, res);
            },
            fail: function (err) {
                callback && callback(err, undefined);
            },
            complete: function (res) { },
            cancel: function (err) {
                console.log('fl cancelled');
                callback && callback(__assign(__assign({}, err), { msg: '请分享给其它群' }), undefined);
                try {
                    window.ALDStatistics && window.ALDStatistics.sendUserEvent("\u5206\u4EAB-\u53D6\u6D88", wx.getSystemInfoSync().model);
                }
                catch (error) {
                }
            }
        });
    };
    /** 获取今日剩余分享次数 */
    FLWechatGameShare.getHaveShareCount = function () {
        var serverConfig = window.serverConfig || { SHARE_MAX: 30 };
        var count = serverConfig.SHARE_MAX - FLStore_1["default"].getTodayValue("todayShareCount", 0);
        return count < 0 ? 0 : count;
    };
    // 游戏唤醒
    FLWechatGameShare.prototype.onShareResume = function (data) {
    };
    /**
    * 获取时间戳（秒）
    * @param isMillisecond 是否返回毫秒时间戳
    */
    FLWechatGameShare.prototype.getTimeStamp = function (isMillisecond) {
        if (isMillisecond) {
            return (new Date()).getTime();
        }
        else {
            return Math.floor((new Date()).getTime() / 1000);
        }
    };
    FLWechatGameShare.shareSuccessDelayTime = 3.2;
    FLWechatGameShare.shareId = '';
    FLWechatGameShare.shareTitle = '';
    FLWechatGameShare.shareImgUrl = '';
    FLWechatGameShare.shareQuery = '';
    return FLWechatGameShare;
}(FLBehavior_1["default"]));
exports["default"] = FLWechatGameShare;
