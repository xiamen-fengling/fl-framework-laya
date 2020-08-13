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
var FLSystemEvent_1 = require("./Base/FLSystemEvent");
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 行为，组件脚本的基类
 * zengbinsi
 * 2020-03-06
 */
var FLBehavior = /** @class */ (function (_super) {
    __extends(FLBehavior, _super);
    function FLBehavior() {
        /** 是否启用全局单点 */
        // static isEnabledGlobalTouch = true;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.allEvents = {};
        /** 所有的调度器 */
        _this.allTimer = [];
        return _this;
    }
    FLBehavior.prototype.onAwake = function () {
        this['onAddEvents'] && this['onAddEvents']();
        this['onLoadConfig'] && this['onLoadConfig']();
        this['onLoaded'] && this['onLoaded']();
    };
    FLBehavior.prototype.onEnable = function () {
        this.onBindEvents && this.onBindEvents();
        var events;
        for (var key in this.allEvents) {
            events = this.allEvents[key];
            events && events.map(function (eventInfo) {
                if (eventInfo.isRegisted) {
                    return;
                }
                FLSystemEvent_1["default"].on(eventInfo.eventName, eventInfo.callback, eventInfo.target);
                eventInfo.isRegisted = !0;
            });
        }
        this['onEnabled'] && this['onEnabled']();
    };
    FLBehavior.prototype.onStart = function () {
        this['onStarted'] && this['onStarted']();
    };
    // onUpdate() {
    // }
    // onLateUpdate() {
    // }
    FLBehavior.prototype.onDisable = function () {
        this.onUnbindEvents && this.onUnbindEvents();
        var events;
        for (var key in this.allEvents) {
            events = this.allEvents[key];
            events && events.map(function (eventInfo) {
                if (!eventInfo.isRegisted || eventInfo.isResident) {
                    return;
                }
                FLSystemEvent_1["default"].off(eventInfo.eventName, eventInfo.callback, eventInfo.target);
                eventInfo.isRegisted = !1;
            });
        }
        this['onDisabled'] && this['onDisabled']();
    };
    FLBehavior.prototype.onDestroy = function () {
        if (!0) {
            // 注销驻留的函数
            var events = void 0;
            for (var key in this.allEvents) {
                events = this.allEvents[key];
                events && events.map(function (eventInfo) {
                    if (!eventInfo.isRegisted) {
                        return;
                    }
                    FLSystemEvent_1["default"].off(eventInfo.eventName, eventInfo.callback, eventInfo.target);
                    eventInfo.isRegisted = !1;
                });
            }
        }
        this['onRemoveEvents'] && this['onRemoveEvents']();
        this['onDestroyed'] && this['onDestroyed']();
    };
    // =======================================
    // 模板方法
    // =======================================
    FLBehavior.prototype.onBindEvents = function () {
        // toucu事件
        if (this['onTouchStart'] || this['onTouchEnded']) {
            this.owner.on(Laya.Event.MOUSE_DOWN, this, this._onTouchStart);
            this.owner.on(Laya.Event.MOUSE_UP, this, this._onTouchEnded);
            // this.owner.on(Laya.Event.MOUSE_OVER, this, this._onTouchCancelled);
        }
        if (this['onTouchMoved']) {
            this.owner.on(Laya.Event.MOUSE_MOVE, this, this._onTouchMoved);
        }
    };
    FLBehavior.prototype.onUnbindEvents = function () {
        // toucu事件
        if (this['onTouchStart'] || this['onTouchEnded']) {
            this.owner.off(Laya.Event.MOUSE_DOWN, this, this._onTouchStart);
            this.owner.off(Laya.Event.MOUSE_UP, this, this._onTouchEnded);
            // this.owner.off(Laya.Event.MOUSE_OVER, this, this._onTouchCancelled);
        }
        if (this['onTouchMoved']) {
            this.owner.off(Laya.Event.MOUSE_MOVE, this, this._onTouchMoved);
        }
    };
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
    /** 在组件第一次onUpdate前调用，做一些初始化逻辑 */
    // onStarted() {
    // }
    /**
     * 场景动画更新前回调
     * @param dt 游戏帧时长
     */
    // onUpdated(dt) {
    // }
    /** 场景动画更新后回调 */
    // onLateUpdated(dt) {
    // }
    /** 销毁组件 */
    // onDestroyed() {
    // }
    // =======================================
    // 功能方法
    // =======================================
    FLBehavior.prototype._onTouchStart = function (event) {
        // if (FLBehavior.isEnabledGlobalTouch && this._getTouchId(event) > 0) { return; }
        this['onTouchStart'] && this['onTouchStart'](event);
    };
    FLBehavior.prototype._onTouchMoved = function (event) {
        // if (FLBehavior.isEnabledGlobalTouch && this._getTouchId(event) > 0) { return; }
        this['onTouchMoved'] && this['onTouchMoved'](event);
    };
    FLBehavior.prototype._onTouchEnded = function (event) {
        // if (FLBehavior.isEnabledGlobalTouch && this._getTouchId(event) > 0) { return; }
        this['onTouchEnded'] && this['onTouchEnded'](event);
    };
    FLBehavior.prototype._onTouchCancelled = function (event) {
        // if (FLBehavior.isEnabledGlobalTouch && this._getTouchId(event) > 0) { return; }
        if (this['onTouchCancelled']) {
            this['onTouchCancelled'](event);
        }
        else if (this['onTouchEnded']) {
            this['onTouchEnded'](event);
        }
    };
    FLBehavior.prototype._getTouchId = function (event) {
        // const touchs = event.getTouches();
        // return touchs.indexOf(event.touch);
        return event.touchId;
    };
    // =======================================
    // 功能方法
    // =======================================
    /** 注册事件 */
    FLBehavior.prototype.registerEvent = function (eventName, callback, target, isResident) {
        isResident = !!isResident;
        this.allEvents[eventName] = this.allEvents[eventName] || [];
        var isRegisted = !1;
        // 如果节点已启用，直接注册事件
        if (this.enabled) {
            FLSystemEvent_1["default"].on(eventName, callback, target);
            isRegisted = !0;
        }
        this.allEvents[eventName].push({ eventName: eventName, callback: callback, target: target, isResident: isResident, isRegisted: isRegisted });
    };
    /**
     * 设置是否启用单点
     * @param {*} isEnabled
     */
    FLBehavior.prototype.setEnableTouchOneByOne = function (isEnabled) {
        // FLBehavior.isEnabledGlobalTouch = !!isEnabled;
        Laya.MouseManager.multiTouchEnabled = !isEnabled;
    };
    /**
     * 判断变量是否为空，如果是返回默认值，否则返回原值
     * @param value 变量
     * @param defaultValue 默认值
     */
    FLBehavior.prototype.ifnull = function (value, defaultValue) {
        if (value === undefined || value === null) {
            return defaultValue;
        }
        return value;
    };
    /**
     * 判断变量是否为空
     * @param value 变量
     */
    FLBehavior.prototype.isEmpty = function (value) {
        return value === undefined || value === null;
    };
    /**
     * 判断字符串是否为空或者空字符串
     * @param value 字符串
     */
    FLBehavior.prototype.isEmptyString = function (value) {
        return value === undefined || value === null || value === '';
    };
    // =======================================
    // 兼容处理
    // =======================================
    /**
     * 启动调度器，延迟调用方法
     * @param callback 回调方法
     * @param delayTime 延迟时间
     */
    FLBehavior.prototype.schedule = function (callback, delayTime) {
        this.allTimer.push({ callback: callback, delayTime: delayTime });
        return Laya.timer.loop(delayTime * 1000, this, callback);
    };
    /**
     * 启动调度器，延迟调用方法
     * @param callback 回调方法
     * @param delayTime 延迟时间
     */
    FLBehavior.prototype.scheduleOnce = function (callback, delayTime) {
        this.allTimer.push({ callback: callback, delayTime: delayTime });
        return Laya.timer.once(delayTime * 1000, this, callback);
    };
    /** 停止所有调度 */
    FLBehavior.prototype.unscheduleAllCallbacks = function () {
        var _this = this;
        this.allTimer.map(function (item) {
            Laya.timer.clear(_this, item.callback);
        });
        this.allTimer = [];
    };
    /**
     * 版本号比较，v1大于v2返回1，v1小于v2返回-1，相等返回0
     * @param v1 版本号1
     * @param v2 版本号2
     */
    FLBehavior.compareVersion = function (v1, v2) {
        var v1s = v1.split('.') || [];
        var v2s = v2.split('.') || [];
        var maxLen = v1s.length > v2s.length ? v1s.length : v2s.length;
        var _v1, _v2;
        for (var i = 0; i < maxLen; i++) {
            _v1 = Number(v1s[i] || '0');
            _v2 = Number(v2s[i] || '0');
            if (_v1 > _v2) {
                return 1;
            }
            else if (_v1 < _v2) {
                return -1;
            }
        }
        return 0;
    };
    return FLBehavior;
}(Laya.Script));
exports["default"] = FLBehavior;
// 关闭多点
Laya.MouseManager.multiTouchEnabled = false;
