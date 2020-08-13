"use strict";
exports.__esModule = true;
var FLTween = /** @class */ (function () {
    function FLTween() {
        this._gid = 0;
        this._target = null;
        this._duration = 0;
        this._complete = null;
        this._delay = 0;
        this._props = null;
        this._usedTimer = null;
        this._startTimer = null;
        this._usedPool = null;
        this._delayParam = null;
        this.update = null;
    }
    FLTween.init = function () {
        if (FLTween.inited) {
            return;
        }
        FLTween.inited = true;
        Laya.timer.frameLoop(1, FLTween, FLTween.onUpdate);
        console.log('init FLTween');
    };
    FLTween.to = function (target, props, duration, ease, complete, delay, coverBefore, autoRecover) {
        if (ease === void 0) { ease = null; }
        if (complete === void 0) { complete = null; }
        if (delay === void 0) { delay = 0; }
        if (coverBefore === void 0) { coverBefore = false; }
        if (autoRecover === void 0) { autoRecover = true; }
        return new FLTween()._create(target, props, duration, ease, complete, delay);
    };
    FLTween.onUpdate = function () {
        var now = Laya.Browser.now();
        var dt = now - FLTween.now;
        for (var key in FLTween.tweenMap) {
            if (!FLTween.tweenMap[key]) {
                continue;
            }
            FLTween.tweenMap[key]._update(dt, now);
        }
    };
    FLTween.prototype._create = function (target, props, duration, ease, complete, delay) {
        if (ease === void 0) { ease = null; }
        if (complete === void 0) { complete = null; }
        if (delay === void 0) { delay = 0; }
        this._target = target;
        this._duration = duration;
        this._complete = complete || props.complete;
        this._delay = delay;
        this._props = [];
        this._usedTimer = 0;
        this._startTimer = Laya.Browser.now();
        this._usedPool = true;
        this._delayParam = null;
        this.update = props.update;
        var gid = (target.$_GID || (target.$_GID = FLTween._GID, FLTween._GID++));
        if (!FLTween.tweenMap[gid]) {
            FLTween.tweenMap[gid] = this;
        }
        this._initProps(target, props, true);
        return this;
    };
    FLTween.prototype._initProps = function (target, props, isTo) {
        for (var p in props) {
            if (typeof (target[p]) == 'number') {
                var start = isTo ? target[p] : props[p];
                var end = isTo ? props[p] : target[p];
                this._props.push([p, start, end - start]);
                if (!isTo)
                    target[p] = start;
            }
        }
    };
    FLTween.prototype._update = function (dt, now) {
        var _this = this;
        var time = now - this._startTimer;
        // 计算动作进行了多久
        if (this._delay > 0) {
            time -= this._delay;
        }
        // 还在延迟中
        if (time <= 0) {
            return;
        }
        // 结束
        if (time >= this._duration) {
            return this._onComplete();
        }
        this._props.map(function (info) {
            _this._target[info[0]] = info[1] + info[2] * time / _this._duration;
            // console.log('==>', this._target);
        });
    };
    FLTween.prototype._onComplete = function () {
        var _this = this;
        // 最终赋值校验
        this._props.map(function (info) {
            _this._target[info[0]] = info[1] + info[2];
        });
        this.clear();
        // 执行结束
        return this._complete && this._complete.runWith([]);
    };
    FLTween.prototype.clear = function () {
        if (this._target) {
            var gid = this._target.$_GID;
            FLTween.tweenMap[gid] = undefined;
        }
    };
    FLTween._GID = 1;
    FLTween.tweenMap = {};
    FLTween.now = Laya.Browser.now();
    FLTween.inited = false;
    return FLTween;
}());
exports["default"] = FLTween;
try {
    window.FLTween = FLTween;
}
catch (error) { }
