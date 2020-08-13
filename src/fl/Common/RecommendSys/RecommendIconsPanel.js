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
var FLNetHTTP_1 = require("../../Framework/Core/Network/FLNetHTTP");
var FLGameConfig_1 = require("../../Config/FLGameConfig");
var AppConfig_1 = require("../../Config/AppConfig");
var RecommendIcon_1 = require("./RecommendIcon");
var FLWechatMiniGame_1 = require("../../Framework/Platform/WechatGame/FLWechatMiniGame");
var RecommendIconsPanel = /** @class */ (function (_super) {
    __extends(RecommendIconsPanel, _super);
    function RecommendIconsPanel() {
        // =======================================
        // 编辑器属性定义(以@property修饰)
        // =======================================
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop { name: positionTag, type: String, tips: '位置标识' } */
        _this.positionTag = '';
        /** @prop { name: icons, type: Nodes, tips: '图标'} */
        _this.icons = [];
        return _this;
    }
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
    // =======================================
    // 生命周期(模板方法，以on开头)
    // =======================================
    RecommendIconsPanel.prototype.onEnabled = function () {
        FLWechatMiniGame_1["default"].isHideUIByWXSceneTag() && (this.owner.visible = false);
    };
    // onDisabled() {
    // }
    /** 注册事件 */
    RecommendIconsPanel.prototype.onAddEvents = function () {
    };
    /** 取消事件注册 */
    RecommendIconsPanel.prototype.onRemoveEvents = function () {
    };
    /** 初始化配置 */
    // onLoadConfig() {
    // }
    /** onLoad结束的回调 */
    // onLoaded() {
    // }
    /** 在组件第一次update前调用，做一些初始化逻辑 */
    RecommendIconsPanel.prototype.onStarted = function () {
        this.icons.map(function (icon) { icon.visible = false; });
        FLWechatMiniGame_1["default"].isHideUIByWXSceneTag() && (this.owner.visible = false, console.log('sss', '隐藏IconsPanel'));
        this.getDataFromServer();
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
    RecommendIconsPanel.prototype.onDestroyed = function () {
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
    RecommendIconsPanel.prototype.getDataFromServer = function () {
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
    RecommendIconsPanel.prototype.initItem = function (datas) {
        var _this = this;
        this.icons.map(function (icon, i) {
            if (datas[i]) {
                icon.visible = true;
                icon.getComponent(RecommendIcon_1["default"]).setData(datas[i], _this.positionTag);
            }
            else {
                icon.visible = false;
            }
        });
    };
    return RecommendIconsPanel;
}(FLBehavior_1["default"]));
exports["default"] = RecommendIconsPanel;
