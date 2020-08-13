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
var GameDataCenter_1 = require("../../Config/GameDataCenter");
var CoinFrame = /** @class */ (function (_super) {
    __extends(CoinFrame, _super);
    function CoinFrame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // =======================================
        // 编辑器属性定义(以@property修饰)
        // =======================================
        /** @prop {name: labCoin, type: Node, tips: '显示金币的标签'} */
        _this.labCoin = null;
        return _this;
    }
    // =======================================
    // 生命周期(模板方法，以on开头)
    // =======================================
    CoinFrame.prototype.onEnabled = function () {
        this.setData();
    };
    CoinFrame.prototype.onDisabled = function () {
    };
    /** 注册事件 */
    CoinFrame.prototype.onAddEvents = function () {
        this.registerEvent(CoinFrame.EEventName.UPDATE_DATA_COIN, this.setData, this);
    };
    /** 取消事件注册 */
    CoinFrame.prototype.onRemoveEvents = function () {
    };
    /** 初始化配置 */
    // onLoadConfig() {
    // }
    /** onLoad结束的回调 */
    // onLoaded() {
    // }
    /** 在组件第一次update前调用，做一些初始化逻辑 */
    CoinFrame.prototype.onStarted = function () {
        this.setData();
    };
    /**
     * 场景动画更新前回调
     * @param dt 游戏帧时长
     */
    // onUpdate() {
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
    // private getDataFromServer() {
    // }
    // =======================================
    // 游戏逻辑方法(内部调用的用private修饰，外部调用和编辑器绑定的public修饰，废弃的方法不加修饰符方便后期移除)
    // =======================================
    CoinFrame.prototype.setData = function (data) {
        this.labCoin.text = data || "" + GameDataCenter_1["default"].coin;
    };
    // =======================================
    // 静态属性定义(以static修饰)
    // =======================================
    /** 游戏事件对象 */
    CoinFrame.EEventName = {
        // 在这里定义事件(key-value形式，key必须全大写下划线分隔，value必须是字符串)
        UPDATE_DATA_COIN: 'UPDATE_DATA_COIN'
    };
    return CoinFrame;
}(FLBehavior_1["default"]));
exports["default"] = CoinFrame;
