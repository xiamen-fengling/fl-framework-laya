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
var FLGloable_1 = require("../common/FLGloable");
var FLAnalytics_1 = require("../../fl/Framework/Core/Base/FLAnalytics");
var GameDataCenter_1 = require("../../fl/Config/GameDataCenter");
var FLGameConfig_1 = require("../../fl/Config/FLGameConfig");
var FLWechatMiniGame_1 = require("../../fl/Framework/Platform/WechatGame/FLWechatMiniGame");
var GameConsts_1 = require("../common/GameConsts");
var ScorePage = /** @class */ (function (_super) {
    __extends(ScorePage, _super);
    function ScorePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sucessObj = null;
        _this.failObj = null;
        _this.continueBtn = null;
        _this.light = null;
        return _this;
    }
    ScorePage.prototype.onAwake = function () {
        var bg = new Laya.Sprite();
        bg.graphics.drawRect(0, 0, 800, 2000, '#000000');
        bg.alpha = 138 / 255;
        this.owner.addChildAt(bg, 0);
        bg.zOrder = -1;
        this.continueBtn = this.owner.getChildByName('continue');
        this.continueBtn.on(Laya.Event.CLICK, this, function () {
            window.onGameEnterToNextPage && window.onGameEnterToNextPage();
            FLAnalytics_1["default"].sendUserEvent('UI点击_结算页_继续游戏');
        });
        var btnBomb = this.owner.getChildByName('btnLIqu');
        if (FLGameConfig_1["default"].serverConfig.SWITCH_SHOW_NEWBOX_BTN !== 3) {
            btnBomb.visible = true;
        }
        else {
            btnBomb.visible = false;
        }
        btnBomb.on(Laya.Event.CLICK, this, function () {
            Laya.Scene.open(GameConsts_1.PageName.PAGE_GAME_BOX2, false);
            // (window as any).onGameEnterToNextPage && (window as any).onGameEnterToNextPage();
            FLAnalytics_1["default"].sendUserEvent('UI点击_结算页_领取炸弹');
        });
    };
    ScorePage.prototype.onEnable = function () {
        this.sucessObj = this.owner.getChildByName('SucessObj');
        this.failObj = this.owner.getChildByName('FailObj');
        this.light = this.sucessObj.getChildByName('light');
        Laya.Tween.clearAll(this.light);
        Laya.Tween.to(this.light, { rotation: 360 * 100000 }, 1000 * 1000000);
        this.sucessObj.visible = FLGloable_1.FLGloable.iswin;
        this.failObj.visible = !FLGloable_1.FLGloable.iswin;
        this.owner.zOrder = 100;
        this.hideHotGame();
        FLAnalytics_1["default"].sendUserEvent('进入游戏结算页');
        GameDataCenter_1["default"].prePositionTag = '结算页_继续游戏';
        if (FLGloable_1.FLGloable.iswin) {
            FLAnalytics_1["default"].sendUserEvent('进入胜利结算页');
        }
        else {
            FLAnalytics_1["default"].sendUserEvent('进入失败结算页');
        }
        if (GameDataCenter_1["default"].isNewPlayer) {
            FLAnalytics_1["default"].sendUserEvent('新用户_进入结算页');
        }
    };
    //隐藏卖量
    ScorePage.prototype.hideHotGame = function () {
        if (FLGameConfig_1["default"].serverConfig.reviewSwitch === 1 || FLWechatMiniGame_1["default"].isHideUIByWXSceneTag()) {
            this.owner.getChildByName('PrecisionPush').visible = false;
        }
    };
    ScorePage.prototype.onDisable = function () {
        this.sucessObj = null;
        this.failObj = null;
        this.continueBtn = null;
        this.light = null;
    };
    return ScorePage;
}(FLBehavior_1["default"]));
exports["default"] = ScorePage;
