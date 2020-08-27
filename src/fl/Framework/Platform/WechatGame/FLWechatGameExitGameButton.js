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
var FLBehavior_1 = require("../../Core/FLBehavior");
var FLWechatMiniGame_1 = require("./FLWechatMiniGame");
var FLDevice_1 = require("../../Core/Base/FLDevice");
var index_1 = require("../../index");
var FLGameConfig_1 = require("../../../Config/FLGameConfig");
var FLSystemEvent_1 = require("../../Core/Base/FLSystemEvent");
/**
 * copyright (c) 2017-2019厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 退出登录按钮
 * xubinjiemac.local
 * 2019-9-21 16:53:54
 */
var FLWechatGameExitGameButton = /** @class */ (function (_super) {
    __extends(FLWechatGameExitGameButton, _super);
    function FLWechatGameExitGameButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // =======================================
    // 编辑器属性定义(以@property修饰)
    // =======================================
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
    // private datas = [];
    // =======================================
    // 生命周期(模板方法，以on开头)
    // =======================================
    // onEnabled() {
    // }
    // onDesabled() {
    // }
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
    FLWechatGameExitGameButton.prototype.onLoaded = function () {
        this.setBtnExitGame();
    };
    /** 在组件第一次update前调用，做一些初始化逻辑 */
    FLWechatGameExitGameButton.prototype.onStart = function () {
        FLSystemEvent_1["default"].on('update_server_config', this.onUpdateServerConfig, this);
        this.onUpdateServerConfig();
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
    FLWechatGameExitGameButton.prototype.onDestroyed = function () {
        FLSystemEvent_1["default"].off('update_server_config', this.onUpdateServerConfig, this);
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
    FLWechatGameExitGameButton.prototype.onUpdateServerConfig = function () {
        if (FLWechatMiniGame_1["default"].isHideUIByWXSceneTag() || window.reviewSwitch || FLGameConfig_1["default"].serverConfig.UI_SWITCH_BUTTON_GAME_EXIT === 3) {
            this.owner.visible = false;
        }
    };
    // =======================================
    // 服务端接口调用(以submitXXXToServer、getXXXXFromServer命名)
    // =======================================
    // 从服务端获取数据
    // private getDataFromServer() {
    // }
    // =======================================
    // 游戏逻辑方法(内部调用的用private修饰，外部调用和编辑器绑定的public修饰，废弃的方法不加修饰符方便后期移除)
    // =======================================
    // setData(data) {
    //     this.data = data;
    //     // init TODO:
    // }
    //视频按钮大小和位置
    FLWechatGameExitGameButton.prototype.setBtnExitGame = function () {
        if (!FLDevice_1["default"].isWechatGame()) {
            return;
        }
        // let sdkver = FLSystem.getSystemInfoSync().SDKVersion;
        // let result = fl.compareVersion(sdkver, '2.1.0');
        // if (result === -1) {return;}
        var FrameSize = index_1["default"].getFrameSize();
        var visibleSize = index_1["default"].getVisibleSize();
        var rot = visibleSize.width / FrameSize.width;
        rot = rot.toFixed(2);
        var rect = wx.getMenuButtonBoundingClientRect();
        if (!rect) {
            return;
        }
        for (var key in rect) {
            if (rect.hasOwnProperty(key)) {
                rect[key] = rect[key] * rot;
            }
        }
        var x = rect.width / 2 + rect.left;
        var y = rect.height / 2 + rect.top;
        y = y + rect.height;
        this.owner.width = rect.width;
        this.owner.height = rect.height;
        this.owner.x = x;
        this.owner.y = y;
    };
    return FLWechatGameExitGameButton;
}(FLBehavior_1["default"]));
exports["default"] = FLWechatGameExitGameButton;
