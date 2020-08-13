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
var FLWechatMiniGame_1 = require("../../fl/Framework/Platform/WechatGame/FLWechatMiniGame");
var GameBoxPanel_1 = require("../../fl/Common/RecommendSys/GameBoxPanel");
var FLAnalytics_1 = require("../../fl/Framework/Core/Base/FLAnalytics");
var GameDataCenter_1 = require("../../fl/Config/GameDataCenter");
var GameConsts_1 = require("../common/GameConsts");
var FLBehavior_1 = require("../../fl/Framework/Core/FLBehavior");
var Game3D_1 = require("../Game3D/Game3D");
var FLSystemEvent_1 = require("../../fl/Framework/Core/Base/FLSystemEvent");
var ResultPage = /** @class */ (function (_super) {
    __extends(ResultPage, _super);
    function ResultPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop {name: btnAgian, type: Node} */
        _this.btnAgian = null;
        /** @prop {name: btnExitGame, type: Node} */
        _this.btnExitGame = null;
        _this.labLabel = null;
        return _this;
    }
    ResultPage.prototype.onLoaded = function () {
        var bg = new Laya.Sprite();
        bg.graphics.drawRect(0, 0, 800, 2000, '#000000');
        bg.alpha = 138 / 255;
        this.owner.addChildAt(bg, 0);
        this.btnAgian.on(Laya.Event.CLICK, this, this.onClose);
        this.btnExitGame.on(Laya.Event.CLICK, this, this.onOpenGameListPage);
        FLWechatMiniGame_1["default"].isHideUIByWXSceneTag() && (this.btnExitGame.visible = false);
        this.labLabel = this.owner.getChildByName('levelObj').getChildByName('labLevel');
        this.labLabel.value = "\u7B2C" + (GameDataCenter_1["default"].level + 1) + "\u5173";
        //默认隐藏假退出按钮
        this.btnExitGame.visible = false;
    };
    ResultPage.prototype.onOpenGameListPage = function () {
        GameBoxPanel_1["default"].onCloseCallback = function () { Laya.Scene.open(GameConsts_1.PageName.PAGE_RESULT); };
        FLAnalytics_1["default"].sendUserEvent('UI点击_爆款游戏页_假退出按钮', { level: GameDataCenter_1["default"].level });
    };
    /**界面打开 */
    ResultPage.prototype.onEnabled = function (param) {
        if (param === void 0) { param = null; }
        if (1) {
            GameDataCenter_1["default"].coin += 100;
        }
        else {
            // Laya.SoundManager.playSound(PathConst.MUSIC_URL+"fail.mp3");
        }
        FLAnalytics_1["default"].sendUserEvent('进入爆款游戏页');
        GameDataCenter_1["default"].prePositionTag = '爆款游戏页';
    };
    ResultPage.prototype.onClose = function () {
        Laya.Scene.closeAll();
        Game3D_1["default"].openGame3D();
        this.scheduleOnce(function () { FLSystemEvent_1["default"].emit(GameConsts_1.EGameEventName.GAME_READY); }, 1);
        FLAnalytics_1["default"].sendUserEvent('UI点击_爆款游戏页_继续游戏');
    };
    ResultPage.prototype.onDestroy = function () {
        this.labLabel = null;
    };
    return ResultPage;
}(FLBehavior_1["default"]));
exports["default"] = ResultPage;
