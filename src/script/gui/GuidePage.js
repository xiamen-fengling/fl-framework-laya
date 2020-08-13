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
var FLBehavior_1 = require("../../fl/Framework/Core/FLBehavior");
var GuidePage = /** @class */ (function (_super) {
    __extends(GuidePage, _super);
    function GuidePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuidePage.prototype.onAwake = function () {
        var anParent = this.owner.getChildByName('spEnd');
        this.ani = anParent.getChildByName('ani1');
        this.ani.interval = 40;
        // this.setHandTween();
        var bg = new Laya.Sprite();
        this.owner.parent;
        bg.alpha = 0.3;
        bg.graphics.drawRect(-285, 120, 750, 260, '#000000');
        anParent.addChildAt(bg, 0);
    };
    GuidePage.prototype.setHandTween = function () {
        var _this = this;
        Laya.Tween.clearAll(this.hand);
        this.hand.load('bonesAnima/1.sk', Laya.Handler.create(this, function () {
            _this.hand.play("yindao", false, true, 0, 1400);
        }));
        this.hand.pos(600, 950);
        Laya.Tween.to(this.hand, { y: 730 }, 1500, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
            _this.hand.play("yindao", false, true, 1400);
            _this.scheduleOnce(_this.setHandTween, 1);
        }));
    };
    return GuidePage;
}(FLBehavior_1["default"]));
exports["default"] = GuidePage;
