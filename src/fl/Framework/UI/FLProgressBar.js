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
var FLProgressBar = /** @class */ (function (_super) {
    __extends(FLProgressBar, _super);
    function FLProgressBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // =======================================
        // 编辑器属性定义(以@property修饰)
        // =======================================
        /** @prop { name: progressType, type: Option, option: "HORIZONTAL,VERTICAL", default: 'HORIZONTAL', tips: '进度条类型'} */
        _this.progressType = 'HORIZONTAL';
        /** @prop { name: bar, type: Node, tips: '进度条' } */
        _this.bar = null;
        /** @prop { name: totalLength, default: 100, type: Number, tips: '整体长度'} */
        _this.totalLength = 100;
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
        _this._progress = 1;
        return _this;
    }
    Object.defineProperty(FLProgressBar.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        /** @prop { name: progress, type: Number, tips: '当前进度', min: 0, max: 1, default: 1} */
        set: function (v) {
            if (v > 1) {
                v = 1;
            }
            else if (v < 0) {
                v = 0;
            }
            this._progress = v;
            this.changeBarDisplay();
        },
        enumerable: true,
        configurable: true
    });
    // =======================================
    // 生命周期(模板方法，以on开头)
    // =======================================
    FLProgressBar.prototype.onEnabled = function () {
        try {
            this.changeBarDisplay();
        }
        catch (error) { }
    };
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
    FLProgressBar.prototype.onStarted = function () {
        this.changeBarDisplay();
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
    FLProgressBar.prototype.onDestroyed = function () {
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
    FLProgressBar.prototype.changeBarDisplay = function () {
        if (!this.bar) {
            return;
        }
        switch (this.progressType) {
            case 'HORIZONTAL':
                this.bar.width = this.totalLength * this._progress;
                break;
            case 'VERTICAL':
                this.bar.height = this.totalLength * this._progress;
                break;
            default:
                break;
        }
    };
    return FLProgressBar;
}(FLBehavior_1["default"]));
exports["default"] = FLProgressBar;
