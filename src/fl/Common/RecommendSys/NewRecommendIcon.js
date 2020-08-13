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
var FLBehavior_1 = require("../../Framework/Core/FLBehavior");
var FLWechatMiniGame_1 = require("../../Framework/Platform/WechatGame/FLWechatMiniGame");
var FLNetHTTP_1 = require("../../Framework/Core/Network/FLNetHTTP");
var FLGameConfig_1 = require("../../Config/FLGameConfig");
var GameDataCenter_1 = require("../../Config/GameDataCenter");
var AppConfig_1 = require("../../Config/AppConfig");
var FLAnalytics_1 = require("../../Framework/Core/Base/FLAnalytics");
var NewRecommendIcon = /** @class */ (function (_super) {
    __extends(NewRecommendIcon, _super);
    function NewRecommendIcon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // =======================================
        // 编辑器属性定义(以@property修饰)
        // =======================================
        /** @prop { name: icon, type: Node, tips: "游戏图标" }  */
        _this.icon = null;
        /** @prop { name: labName, type: Node, tips: "游戏名称" }  */
        _this.labName = null;
        /** @prop { name: labPlayCount, type: Node, tips: "在玩人数" }  */
        _this.labPlayCount = null;
        /** @prop { name: labRank, type: Node, tips: "在玩人数" }  */
        _this.labRank = null;
        /** @prop { name: shakeNode, type: Node, tips: "摇晃节点" }  */
        _this.shakeNode = null;
        /** @prop { name: positionTag, default: '首页', type: Option, option: '首页,游戏页,复活页,结果页,结算页,爆款游戏页,全屏卖量页,小程序页,误触页,互推墙页', tips: "页面位置标识，用于统计" }  */
        _this.positionTag = '首页';
        /** @prop { name: styleType, default: '左右两边卖量位', type: Option, option: '全屏卖量页,小程序页,左右两边卖量位,滚动卖量条,猜你喜欢,4格卖量位,新品热推,互推墙,积分墙', tips: '样式类型，用于统计'} */
        _this.styleType = '左右两边卖量位';
        /** @prop { name: cancellOpenGameBox, default: true, type: Bool, tips: '卖量弹窗取消时打开全屏卖量页'} */
        _this.cancellOpenGameBox = true;
        /** 点击图标后的回调 */
        _this.callbacks = [];
        // =======================================
        // 外部/内部属性定义(以public/private修饰)
        // =======================================
        // 数据对象缓存
        _this.data = null;
        return _this;
    }
    // =======================================
    // 生命周期(模板方法，以on开头)
    // =======================================
    /** 注册事件 */
    // onAddEvents() {
    // }
    /** 取消事件注册 */
    // onRemoveEvents() {
    // }
    /** 初始化配置 */
    // onLoadConfig() {
    // }
    /** onLoad结束的回调 */
    // onLoaded() {
    // }
    /** 在组件第一次update前调用，做一些初始化逻辑 */
    NewRecommendIcon.prototype.onStarted = function () {
        // (this.owner as Laya.Sprite).size(120, 120);
        this.playTipAnimation();
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
    // onDestroyed() {
    // }
    // =======================================
    // 引擎事件回调(以on开头)
    // =======================================
    /** touch事件回调 */
    NewRecommendIcon.prototype.onTouchStart = function (event) {
        this.onPlay();
    };
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
    // =======================================
    // 服务端接口调用(以submitXXXToServer、getXXXXFromServer命名)
    // =======================================
    // 从服务端获取数据
    // private async getDataFromeServer() {
    // }
    // =======================================
    // 游戏逻辑方法(内部调用的用private修饰，外部调用和编辑器绑定的public修饰，废弃的方法不加修饰符方便后期移除)
    // =======================================
    // 播放提示动画
    NewRecommendIcon.prototype.playTipAnimation = function () {
        // const time = 0.1;
        // const ang = 10;
        // const node = this.shakeNode || this.node;
        // node.runAction(cc.sequence(
        //     cc.delayTime(1),
        //     cc.rotateBy(time, ang),
        //     cc.rotateBy(time * 2, -2 * ang),
        //     cc.rotateBy(time, ang),
        //     cc.rotateBy(time, ang),
        //     cc.rotateBy(time * 2, -2 * ang),
        //     cc.rotateBy(time, ang),
        //     cc.rotateBy(time, ang),
        //     cc.rotateBy(time * 2, -2 * ang),
        //     cc.rotateBy(time, ang),
        //     cc.delayTime(3),
        // ).repeatForever());
    };
    NewRecommendIcon.prototype.setData = function (data, positionTag, rank) {
        this.data = data;
        this.positionTag = positionTag;
        this.initItem(data, rank);
    };
    NewRecommendIcon.prototype.initItem = function (data, rank) {
        if (!this.labName) {
            this.labName = this.owner.getChildByName('labName');
        }
        try {
            this.labName.text = data.name.length > 6 ? data.name.substr(0, 6) : data.name;
        }
        catch (error) {
            this.labName.text = data.name;
        }
        if (!this.labPlayCount) {
            this.labPlayCount = this.owner.getChildByName('labPlayCount');
        }
        this.labPlayCount.text = data.people_play;
        if (!this.labRank) {
            this.labRank = this.owner.getChildByName('labRank');
        }
        this.labRank.text = rank + 1;
        if (!this.icon) {
            this.icon = this.owner.getChildByName('icon');
        }
        if (data.logo_status === 1) {
            this.displayIconServer(data);
        }
        else {
            this.icon.loadImage(data.client_logo);
        }
    };
    NewRecommendIcon.prototype.displayIconServer = function (data) {
        var _this = this;
        FLWechatMiniGame_1["default"].loadRemoteCacheFile({ url: data.logo, type: 'png' }, function (err, texture) {
            if (err || !_this || !_this.icon) {
                return;
            }
            try {
                _this.icon.texture = texture;
            }
            catch (error) { }
        });
    };
    NewRecommendIcon.prototype.onPlay = function () {
        var _this = this;
        try {
            FLWechatMiniGame_1["default"].navigateToMiniProgram(this.data.appid, this.data.path, this.data.extraData, function (err, res) {
                if (err) {
                    try {
                        _this.callbacks.map(function (fn) { return fn(err); });
                    }
                    catch (error) { }
                    // FLUIManager.open(GameManager.openGameBoxName() || 'GameBoxPanel');
                    // if (this.positionTag === '盒子页' || this.positionTag === '全屏卖量页') { return; }
                    // if (this.cancellOpenGameBox) {
                    //     try {
                    //         (window as any).onCloseCallback = () => {
                    //             switch (this.positionTag) {
                    //                 case '首页':
                    //                     Laya.Scene.open(PageName.PAGE_HOME);
                    //                     break;
                    //                 case '结算页':
                    //                     if ((window as any).onGameEnterToNextPage) {
                    //                         (window as any).onGameEnterToNextPage(true);
                    //                     } else {
                    //                         Laya.Scene.open(PageName.PAGE_SCORE);
                    //                     }
                    //                     break;
                    //                 case '爆款游戏页':
                    //                     Laya.Scene.open(PageName.PAGE_RESULT);
                    //                     break;
                    //                 default:
                    //                     break;
                    //             }
                    //         };
                    //         if (GameDataCenter.openBox) {
                    //             return;
                    //         }
                    //         GameDataCenter.openBox = true;
                    //         GameDataCenter.prePositionTag = '卖量弹窗取消跳转';
                    //         Laya.Scene.open(PageName.PAGE_GAME_BOX);
                    //     } catch (error) { console.log(this.owner, error); }
                    // }
                    // FLAnalytics.sendEvent('进入小程序页',{channel:'卖量位取消跳转'});
                    return console.log('取消');
                }
                if (!window.serverConfig || !window.serverConfig.touchNaviStat) {
                    _this.statistics();
                }
                try {
                    _this.callbacks.map(function (fn) { return fn(err, __assign({ recommendIcon: _this }, res)); });
                }
                catch (error) { }
            });
            if (window.serverConfig && window.serverConfig.touchNaviStat) {
                this.statistics();
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    NewRecommendIcon.prototype.statistics = function () {
        // 提交统计
        try {
            FLNetHTTP_1["default"].postAsync(FLGameConfig_1["default"].APP_SERVER_HOST + "/api/channel/channel-statistics", {
                channel_id: this.data.id,
                locaiton: 5
            }, { 'x-access-token': GameDataCenter_1["default"].token, 'client-ver': AppConfig_1["default"].APP_VERSION });
        }
        catch (error) { }
        var key;
        // if (this.styleType === '全屏卖量页') {
        //     let str: string = '';
        //     // console.log(GameDataCenter.isGameEndIntoBoxPage, 'GameDataCenter.isGameEndIntoBoxPage', GameDataCenter.intoBoxPageNum);
        //     if (GameDataCenter.isGameEndIntoBoxPage) {
        //         if (GameDataCenter.intoBoxPageNum == 1) {
        //             str = '卖量_第一次进入全的屏卖量页_游戏页结束后进入的';
        //         }
        //         else if (GameDataCenter.intoBoxPageNum == 2) {
        //             str = '卖量_第二次进入全屏卖量页_游戏页结束后进入的';
        //         }
        //         else if (GameDataCenter.intoBoxPageNum == 3) {
        //             str = '卖量_第三次进入全屏卖量页_游戏页结束后进入的';
        //         }
        //         if (str && str.length > 0) {
        //             FLAnalytics.sendUserEvent(str);
        //         }
        //         FLAnalytics.sendUserEvent('卖量_全屏卖量页(游戏页结束后进入的)');
        //     }
        //     key = `卖量_${this.styleType}_${GameDataCenter.prePositionTag}`;
        // }
        // else if (this.styleType === '小程序页' || this.styleType === '互推墙' || this.styleType === '积分墙') {
        //     key = `卖量_${this.styleType}`;
        // } else {
        //     key = `卖量_${this.positionTag}_${this.styleType}`;
        // }
        // console.log(this.styleType, key, '????');
        FLAnalytics_1["default"].sendUserEvent(this.positionTag);
    };
    // =======================================
    // 静态属性定义(以static修饰)
    // =======================================
    /** 游戏事件对象 */
    NewRecommendIcon.EEventName = {
    // 在这里定义事件(key-value形式，key必须全大写下划线分隔，value必须是字符串)
    };
    return NewRecommendIcon;
}(FLBehavior_1["default"]));
exports["default"] = NewRecommendIcon;
