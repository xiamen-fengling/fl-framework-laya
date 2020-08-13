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
exports.__esModule = true;
var FLBehavior_1 = require("../Framework/Core/FLBehavior");
var GameDataCenter_1 = require("../Config/GameDataCenter");
var FLNetHTTP_1 = require("../Framework/Core/Network/FLNetHTTP");
var FLGameConfig_1 = require("../Config/FLGameConfig");
var AppConfig_1 = require("../Config/AppConfig");
var FLLayout_1 = require("../Framework/UI/FLLayout");
var NewRecommendIcon_1 = require("./RecommendSys/NewRecommendIcon");
var FLSystemEvent_1 = require("../Framework/Core/Base/FLSystemEvent");
var GameConsts_1 = require("../../script/common/GameConsts");
var NewGameBoxPanel = /** @class */ (function (_super) {
    __extends(NewGameBoxPanel, _super);
    function NewGameBoxPanel() {
        // =======================================
        // 编辑器属性定义(以@property修饰)
        // =======================================
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop { name: positionTag, type: String, tips: '位置标识' } */
        _this.positionTag = '';
        /** @prop { name: iconPrefab, type: Prefab, tips: '卖量图标预制体' } */
        _this.iconPrefab = null;
        /** @prop { name: content, type: Node, tips: '卖量图标父容器' } */
        _this.content = null;
        /** @prop { name: btnGameBox, type: Node, tips: '关闭按钮'} */
        _this.btnGameBox = null;
        /** @prop { name: isAutoScroll, default: false, type: Bool, tips: '是否自动滚动'} */
        _this.isAutoScroll = false;
        /** @prop { name: isFullScreen, default: true, type: Bool, tips: '是否全屏'} */
        _this.isFullScreen = true;
        // =======================================
        // 外部/内部属性定义(以public/private修饰)
        // =======================================
        // 数据对象缓存
        // private data = null;
        /** 卖量图标组件 */
        _this.icons = [];
        _this._scorllDirect = 0;
        _this._nextDirect = 0;
        _this._changeDirectTime = 0;
        _this._isStartScorll = false;
        return _this;
    }
    // =======================================
    // 生命周期(模板方法，以on开头)
    // =======================================
    NewGameBoxPanel.prototype.onEnabled = function () {
        // if (FLWechatMiniGame.isHideUIByWXSceneTag()) {
        //     GameApp.app.uiRoot.closePage('GameBoxPage.scene');
        // }
        this.getDataFromServer();
        // FLWechatGameBannerAd2.hideAllBannerAd();
    };
    NewGameBoxPanel.prototype.onDisabled = function () {
        // NewGameBoxPanel.onCloseCallback && NewGameBoxPanel.onCloseCallback();
        // (window as any).onCloseCallback && (window as any).onCloseCallback();
        // NewGameBoxPanel.onCloseCallback = null;
        // (window as any).onCloseCallback = null;
        // GameDataCenter.openBox = false;
    };
    /** 注册事件 */
    NewGameBoxPanel.prototype.onAddEvents = function () {
    };
    /** 取消事件注册 */
    NewGameBoxPanel.prototype.onRemoveEvents = function () {
    };
    /** 初始化配置 */
    // onLoadConfig() {
    // }
    /** onLoad结束的回调 */
    // onLoaded() {
    // }
    NewGameBoxPanel.prototype.onAwake = function () {
        var _this = this;
        this.btnGameBox.visible = false;
        this.scheduleOnce(function () {
            _this.btnGameBox.visible = true;
        }, FLGameConfig_1["default"].serverConfig.GAMEBOX_BTN_SHOW_TIME);
        this.btnGameBox.on(Laya.Event.CLICK, this, this.onClickClose);
    };
    /** 在组件第一次update前调用，做一些初始化逻辑 */
    NewGameBoxPanel.prototype.onStarted = function () {
        this.content.parent.parent.vScrollBarSkin = '';
        if (this.isFullScreen) {
            this.owner.width = Laya.stage.width;
            this.owner.height = Laya.stage.height;
        }
    };
    NewGameBoxPanel.prototype.onUpdate = function () {
        if (!this.isAutoScroll || !this._isStartScorll)
            return;
        var diff = Laya.timer.delta;
        var panel = this.content.parent.parent;
        if (!panel || !panel.vScrollBar)
            return;
        var curScorllV = panel.vScrollBar.value;
        panel.vScrollBar.max = 3100;
        // console.log(curScorllV, panel.vScrollBar, '???', this.content, panel.vScrollBar.max);
        if (this._scorllDirect == 1) { //向下滚
            curScorllV += diff * 0.2;
            if (curScorllV >= panel.vScrollBar.max) {
                curScorllV = panel.vScrollBar.max;
                this._scorllDirect = 0;
                this._nextDirect = 2;
                this._changeDirectTime = 0;
            }
            panel.vScrollBar.value = curScorllV;
        }
        else if (this._scorllDirect == 2) { //向上滚
            curScorllV -= diff * 0.2;
            if (curScorllV <= panel.vScrollBar.min) {
                curScorllV = panel.vScrollBar.min;
                this._scorllDirect = 0;
                this._nextDirect = 1;
                this._changeDirectTime = 0;
            }
            panel.vScrollBar.value = curScorllV;
        }
        else {
            this._changeDirectTime += diff;
            if (this._changeDirectTime >= 500) {
                this._changeDirectTime = 0;
                this._scorllDirect = this._nextDirect;
            }
        }
        // console.log(panel.vScrollBar, 'panel.vScrollBar.max', panel, panel.vScrollBar.max);
    };
    /** 场景动画更新后回调 */
    // onLateUpdate(dt: number) {
    // }
    /** 销毁组件 */
    NewGameBoxPanel.prototype.onDestroyed = function () {
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
    // =======================================
    // 服务端接口调用(以submitXXXToServer、getXXXXFromServer命名)
    // =======================================
    // 从服务端获取数据
    NewGameBoxPanel.prototype.getDataFromServer = function () {
        var _this = this;
        if (window.recommendDatas) {
            // 数据已经存在，不实时刷新
            return this.initItem(window.recommendDatas);
        }
        try {
            FLNetHTTP_1["default"].postAsync(FLGameConfig_1["default"].APP_SERVER_HOST + "/api/channel/config", { locaiton: 5, appids: AppConfig_1["default"].navigateToMiniProgramAppIdList }, { 'client-ver': AppConfig_1["default"].APP_VERSION }).then(function (res) {
                var datas = [];
                if (AppConfig_1["default"].navigateToMiniProgramAppIdList && AppConfig_1["default"].navigateToMiniProgramAppIdList[0]) {
                    res.map(function (data) {
                        if (AppConfig_1["default"].navigateToMiniProgramAppIdList.indexOf(data.appid) !== -1) {
                            datas.push(data);
                        }
                    });
                }
                else {
                    datas = res;
                }
                window.recommendDatas = datas;
                _this.initItem(datas);
            })["catch"](function (err) { });
        }
        catch (error) {
        }
    };
    // =======================================
    // 游戏逻辑方法(内部调用的用private修饰，外部调用和编辑器绑定的public修饰，废弃的方法不加修饰符方便后期移除)
    // =======================================
    // setData(data) {
    //     this.data = data;
    //     // init TODO:
    // }
    NewGameBoxPanel.prototype.initItem = function (datas) {
        var _this = this;
        // 清空列表
        this.content.removeChildren();
        this.icons = [];
        var node, recommendIcon;
        var index = 0;
        datas.map(function (data, index) {
            index++;
            if (index < 3) {
                return;
            }
            node = _this.iconPrefab.create();
            _this.content.addChild(node);
            recommendIcon = node.getComponent(NewRecommendIcon_1["default"]);
            //卖量打点
            var str = _this.positionTag;
            recommendIcon.setData(data, str, index);
            _this.icons.push(recommendIcon);
        });
        this.content.getComponent(FLLayout_1["default"])._doLayout();
        // 开启自动滚动
        var panel = this.content.parent.parent;
        panel.vScrollBar && (panel.vScrollBar.value = 0);
        this._isStartScorll = true;
        this._scorllDirect = 1;
        //全屏卖量页是否自动显示跳转
        // if (FLGameConfig.serverConfig["GAMEBOX_AUTO_SHOW_GOTO"] !== 0 && FLGameConfig.serverConfig["GAMEBOX_AUTO_SHOW_GOTO"] !== 3 && this.icons.length) {
        //     let autoIcon: NewRecommendIcon = this.icons[FLMath.randomNumber(0, this.icons.length - 1)];
        //     if (autoIcon) autoIcon.onPlay();
        // }
    };
    NewGameBoxPanel.prototype.onClickClose = function () {
        // let show = false;
        if (GameDataCenter_1["default"].openTouch) {
            FLSystemEvent_1["default"].emit('GOIN_3DSCENE');
        }
        else {
            FLSystemEvent_1["default"].emit(GameConsts_1.EGameEventName.OPEN_GAME3D);
        }
        Laya.Scene.close(GameConsts_1.PageName.PAGE_GAME_BOX3);
        console.log('关闭==');
    };
    // =======================================
    // 静态属性定义(以static修饰)
    // =======================================
    /** 游戏事件对象 */
    // public static EEventName = {
    //     // 在这里定义事件(key-value形式，key必须全大写下划线分隔，value必须是字符串)
    // };
    /** 关闭全屏卖量页的回调 */
    NewGameBoxPanel.onCloseCallback = null;
    /** 打开盒子页的前一个页面标记 */
    NewGameBoxPanel.prePositionTag = '';
    return NewGameBoxPanel;
}(FLBehavior_1["default"]));
exports["default"] = NewGameBoxPanel;
