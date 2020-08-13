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
var GameDataCenter_1 = require("../../fl/Config/GameDataCenter");
var GameConsts_1 = require("../common/GameConsts");
var FLBehavior_1 = require("../../fl/Framework/Core/FLBehavior");
var Game3D_1 = require("../Game3D/Game3D");
var FLSystemEvent_1 = require("../../fl/Framework/Core/Base/FLSystemEvent");
var FLAnalytics_1 = require("../../fl/Framework/Core/Base/FLAnalytics");
var Banner_1 = require("../../fl/Framework/Platform/WechatGame/Banner");
var FLGameConfig_1 = require("../../fl/Config/FLGameConfig");
var ScorePage = /** @class */ (function (_super) {
    __extends(ScorePage, _super);
    function ScorePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.refreshBtn = null;
        _this.levelClip = null;
        _this.game3d = null;
        _this.banner = null;
        return _this;
    }
    ScorePage.prototype.onLoaded = function () {
        var root = this.owner.getChildByName('mainObj');
        this.refreshBtn = root.getChildByName('refreshBtn');
        var lvObj = this.owner.getChildByName('levelObj');
        this.levelClip = lvObj.getChildByName('levelClip');
        this.kingFried = this.owner.getChildByName('kingFried');
        this.Ace = this.owner.getChildByName('ACE');
        //显示当前关卡
        this.levelClip.value = (GameDataCenter_1["default"].level + 1).toString();
        // (this.owner as Laya.Sprite).zOrder = 20;
        this.banner = this.owner.getComponent(Banner_1["default"]);
        this.refreshBtn.on(Laya.Event.CLICK, this, this.onRefresh);
        if (FLGameConfig_1["default"].serverConfig.SWITCH_LEFT_TOP_BANNER === 3) {
            this.closeBanner();
        }
        else {
            FLSystemEvent_1["default"].on(GameConsts_1.EGameEventName.CLOSE_BANNER, this.closeBanner, this);
        }
        FLSystemEvent_1["default"].on('GAME_PASS', this.showExcitation, this);
    };
    ScorePage.prototype.onDestroy = function () {
        FLSystemEvent_1["default"].off('GAME_PASS', this.showExcitation, this);
    };
    //显示激励文字
    ScorePage.prototype.showExcitation = function (typeIndex) {
        if (typeIndex === 1) {
            this.Ace.visible = true;
            Laya.Tween.clearAll(this.Ace);
            this.Ace.scale(0, 0);
            Laya.Tween.to(this.Ace, { scaleX: 2, scaleY: 2 }, 300, Laya.Ease.backOut, null);
            Laya.Tween.to(this.Ace, { scaleX: 1.5, scaleY: 1.5 }, 200, Laya.Ease.sineOut, null, 320);
            // Laya.Tween.to(this.Ace, { scaleX: 1.5, scaleY: 1.5 }, 100, Laya.Ease.sineOut, null, 250);
            // Laya.Tween.to(this.Ace, { alpha: 0, }, 1000, Laya.Ease.linearNone, null, 350);
        }
        else {
            this.kingFried.visible = true;
            Laya.Tween.clearAll(this.kingFried);
            this.kingFried.scale(0, 0);
            Laya.Tween.to(this.kingFried, { scaleX: 2, scaleY: 2 }, 300, Laya.Ease.backOut, null);
            Laya.Tween.to(this.kingFried, { scaleX: 1.5, scaleY: 1.5 }, 200, Laya.Ease.sineOut, null, 320);
            // Laya.Tween.to(this.kingFried, { scaleX: 1.5, scaleY: 1.5 }, 100, Laya.Ease.sineOut, null, 250);
            // Laya.Tween.to(this.kingFried, { alpha: 0, }, 1000, Laya.Ease.linearNone, null, 350);
        }
    };
    ScorePage.prototype.closeBanner = function () {
        console.log('-closeBanner----');
        if (this.banner) {
            this.banner.hide();
        }
    };
    ScorePage.prototype.onRefresh = function (e) {
        //ole.log("-----onrefresh----");
        e.stopPropagation();
        Laya.Scene.closeAll();
        var callback = function () {
            FLSystemEvent_1["default"].emit(GameConsts_1.EGameEventName.GAME_READY);
            FLSystemEvent_1["default"].off(GameConsts_1.EGameEventName.LOAD_SCENE3D_ENDED, callback, FLSystemEvent_1["default"]);
        };
        FLSystemEvent_1["default"].on(GameConsts_1.EGameEventName.LOAD_SCENE3D_ENDED, callback, FLSystemEvent_1["default"]);
        Game3D_1["default"].openGame3D();
        FLAnalytics_1["default"].sendUserEvent('UI点击_游戏页_重玩按钮', { level: GameDataCenter_1["default"].level + 1 });
    };
    ScorePage.prototype.onDisable = function () {
        console.log("ScorePage -> onDestroy -> onDestroy");
        FLSystemEvent_1["default"].off(GameConsts_1.EGameEventName.CLOSE_BANNER, this.closeBanner, this);
        this.refreshBtn = null;
        this.levelClip = null;
        this.game3d = null;
    };
    return ScorePage;
}(FLBehavior_1["default"]));
exports["default"] = ScorePage;
