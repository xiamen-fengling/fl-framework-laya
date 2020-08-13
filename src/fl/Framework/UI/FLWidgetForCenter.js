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
var FLBehavior_1 = require("../Core/FLBehavior");
var index_1 = require("../index");
var FLWidgetForCenter = /** @class */ (function (_super) {
    __extends(FLWidgetForCenter, _super);
    function FLWidgetForCenter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // =======================================
        // 编辑器属性定义(以@property修饰)
        // =======================================
        /** @prop { name: autoSwitch, default: false, type: Bool, tips: '是否只在全面屏时进行适配' } */
        _this.autoSwitch = false;
        /** @prop { name: offsetX, default: 0, type: Number, tips: '与父节点中心点偏移量' } */
        _this.offsetX = 0;
        /** @prop { name: offsetY, default: 0, type: Number, tips: '与父节点中心点偏移量' } */
        _this.offsetY = 0;
        /** @prop { name: changeParentAnchorPoint, default: true, type: Bool, tips: '设置父节点锚点' } */
        _this.changeParentAnchorPoint = true;
        /** @prop { name: parentAnchorX, default: 0.5, type: Number, tips: '父节点锚点，当changeParentAnchorPoint为true时有效' } */
        _this.parentAnchorX = 0.5;
        /** @prop { name: parentAnchorY, default: 0.5, type: Number, tips: '父节点锚点，当changeParentAnchorPoint为true时有效' } */
        _this.parentAnchorY = 0.5;
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
    // onEnabled() {
    // }
    // onDisabled() {
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
    // onLoaded() {
    // }
    /** 在组件第一次update前调用，做一些初始化逻辑 */
    FLWidgetForCenter.prototype.onStarted = function () {
        if (this.autoSwitch) {
            var size = index_1["default"].getVisibleSize();
            (size.height / size.width >= 2 || size.width / size.height >= 2) && this.updateWidget();
        }
        else {
            this.updateWidget();
        }
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
    FLWidgetForCenter.prototype.onDestroyed = function () {
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
    // private getDataFromServer() {
    // }
    // =======================================
    // 游戏逻辑方法(内部调用的用private修饰，外部调用和编辑器绑定的public修饰，废弃的方法不加修饰符方便后期移除)
    // =======================================
    // setData(data) {
    //     this.data = data;
    //     // init TODO:
    // }
    FLWidgetForCenter.prototype.updateWidget = function () {
        var w = this.owner.parent.width;
        var h = this.owner.parent.height;
        var cx = w * (this.changeParentAnchorPoint ? this.parentAnchorX : (this.owner.parent.anchorX || 0));
        var cy = h * (this.changeParentAnchorPoint ? this.parentAnchorY : (this.owner.parent.anchorY || 0));
        this.owner.x = cx + this.offsetX;
        this.owner.y = cy + this.offsetY;
    };
    return FLWidgetForCenter;
}(FLBehavior_1["default"]));
exports["default"] = FLWidgetForCenter;
