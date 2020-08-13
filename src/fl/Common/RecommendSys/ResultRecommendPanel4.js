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
var FLBehavior_1 = require("../../Framework/Core/FLBehavior");
var RecommendIcon_1 = require("./RecommendIcon");
var AppConfig_1 = require("../../Config/AppConfig");
var FLNetHTTP_1 = require("../../Framework/Core/Network/FLNetHTTP");
var FLGameConfig_1 = require("../../Config/FLGameConfig");
var FLWechatMiniGame_1 = require("../../Framework/Platform/WechatGame/FLWechatMiniGame");
var index_1 = require("../../Framework/index");
var ResultRecommendPanel4 = /** @class */ (function (_super) {
    __extends(ResultRecommendPanel4, _super);
    function ResultRecommendPanel4() {
        // =======================================
        // 编辑器属性定义(以@property修饰)
        // =======================================
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop { name: positionTag, type: String, tips: '位置标识' } */
        _this.positionTag = '';
        /** @prop { name: scaleBySceneRatio, default: false, type: Bool, tips: '根据屏幕适配缩放'} */
        _this.scaleBySceneRatio = false;
        /** @prop { name: icons, type: Nodes, tips: '图标'} */
        _this.icons = [];
        // =======================================
        // 静态属性定义(以static修饰)
        // =======================================
        /** 游戏事件对象 */
        // public static EEventName = {
        //     // 在这里定义事件(key-value形式，key必须全大写下划线分隔，value必须是字符串)
        // };
        // =======================================
        // 外部/内部属性定义(以public/private修饰)
        // =======================================
        // 数据对象缓存
        // private data = null;
        /** 开始显示的索引 */
        _this.showIndex = 0;
        return _this;
    }
    // =======================================
    // 生命周期(模板方法，以on开头)
    // =======================================
    ResultRecommendPanel4.prototype.onEnabled = function () {
        FLWechatMiniGame_1["default"].isHideUIByWXSceneTag() && (this.owner.visible = false);
        this.getDataFromServer();
    };
    // onDisabled() {
    // }
    /** 注册事件 */
    ResultRecommendPanel4.prototype.onAddEvents = function () {
    };
    /** 取消事件注册 */
    ResultRecommendPanel4.prototype.onRemoveEvents = function () {
    };
    /** 初始化配置 */
    // onLoadConfig() {
    // }
    /** onLoad结束的回调 */
    // onLoaded() {
    // }
    /** 在组件第一次update前调用，做一些初始化逻辑 */
    ResultRecommendPanel4.prototype.onStarted = function () {
        if (this.scaleBySceneRatio) {
            this.owner.scaleX = this.owner.scaleY = index_1["default"].getVisibleSize().height / 1334;
        }
        // this.icons.map((icon: Laya.Sprite) => { icon.visible = false; });
        FLWechatMiniGame_1["default"].isHideUIByWXSceneTag() && (this.owner.visible = false);
    };
    /**
     * 场景动画更新前回调
     * @param dt 游戏帧时长
     */
    // onUpdate(dt: number) {
    // }
    /** 场景动画更新后回调 */
    // onLateUpdate(dt: number) {
    // }
    /** 销毁组件 */
    ResultRecommendPanel4.prototype.onDestroyed = function () {
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
    ResultRecommendPanel4.prototype.getDataFromServer = function () {
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
    ResultRecommendPanel4.prototype.initItem = function (datas) {
        var _this = this;
        var i = this.showIndex, recommendIcon;
        this.icons.map(function (icon, j) {
            if (datas[i]) {
                recommendIcon = icon.getComponent(RecommendIcon_1["default"]);
                recommendIcon.setData(datas[i], _this.positionTag);
                _this.onShake(recommendIcon.shakeNode, j);
                recommendIcon.callbacks.push(_this.changeItem.bind(_this));
            }
            i = (++_this.showIndex % datas.length);
            _this.showIndex = i;
        });
    };
    ResultRecommendPanel4.prototype.onShake = function (_shakeNode, index) {
        var _this = this;
        Laya.Tween.clearAll(_shakeNode);
        Laya.timer.once(1000, this, function () {
            Laya.Tween.to(_shakeNode, { rotation: 15 }, 200, Laya.Ease.linearNone, Laya.Handler.create(_this, function () {
                Laya.Tween.clearAll(_shakeNode);
                Laya.Tween.to(_shakeNode, { rotation: -15 }, 400, Laya.Ease.linearNone, Laya.Handler.create(_this, function () {
                    Laya.Tween.clearAll(_shakeNode);
                    Laya.Tween.to(_shakeNode, { rotation: 15 }, 400, Laya.Ease.linearNone, Laya.Handler.create(_this, function () {
                        Laya.Tween.clearAll(_shakeNode);
                        Laya.Tween.to(_shakeNode, { rotation: -15 }, 400, Laya.Ease.linearNone, Laya.Handler.create(_this, function () {
                            Laya.Tween.clearAll(_shakeNode);
                            Laya.Tween.to(_shakeNode, { rotation: 0 }, 200, Laya.Ease.linearNone, Laya.Handler.create(_this, function () {
                                Laya.Tween.clearAll(_shakeNode);
                                index === 0 && Laya.timer.once(1000, _this, function () {
                                    //更换卖量
                                    _this.initItem(window.recommendDatas);
                                });
                            }));
                        }));
                    }));
                }));
            }));
        });
    };
    ResultRecommendPanel4.prototype.changeItem = function (err, res) {
        if (!window.recommendDatas || window.recommendDatas.length < 1 || !res || !res.recommendIcon) {
            return;
        }
        var data = window.recommendDatas[this.showIndex];
        this.showIndex = ++this.showIndex % window.recommendDatas.length;
        res.recommendIcon.setData(data, this.positionTag);
    };
    return ResultRecommendPanel4;
}(FLBehavior_1["default"]));
exports["default"] = ResultRecommendPanel4;
