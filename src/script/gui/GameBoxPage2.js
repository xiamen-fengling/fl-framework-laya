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
var FLAnalytics_1 = require("../../fl/Framework/Core/Base/FLAnalytics");
var FLBehavior_1 = require("../../fl/Framework/Core/FLBehavior");
var FLGameConfig_1 = require("../../fl/Config/FLGameConfig");
var GameDataCenter_1 = require("../../fl/Config/GameDataCenter");
var GameConsts_1 = require("../common/GameConsts");
var GameBoxPage2 = /** @class */ (function (_super) {
    __extends(GameBoxPage2, _super);
    function GameBoxPage2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop {name: btnExitGame, type: Node} */
        _this.btnExitGame = null;
        return _this;
    }
    GameBoxPage2.prototype.onAwake = function () {
        var _this = this;
        this.btnExitGame.visible = false;
        this.scheduleOnce(function () {
            _this.btnExitGame.visible = true;
        }, FLGameConfig_1["default"].serverConfig.SHOW_BOX2_TIME);
        this.btnExitGame.on(Laya.Event.MOUSE_DOWN, this, this.onClose);
        this.owner.zOrder = 101;
    };
    GameBoxPage2.prototype.onEnable = function () {
        FLAnalytics_1["default"].sendUserEvent("\u8FDB\u5165\u5168\u5C4F\u5356\u91CF\u98752_\u4ECE" + GameDataCenter_1["default"].prePositionTag + "\u8FDB\u5165");
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.stopTouch);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.stopTouch);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.stopTouch);
    };
    GameBoxPage2.prototype.stopTouch = function (e) {
        e.stopPropagation();
    };
    GameBoxPage2.prototype.onClose = function (e) {
        e.stopPropagation();
        Laya.Scene.close(GameConsts_1.PageName.PAGE_GAME_BOX2);
        FLAnalytics_1["default"].sendUserEvent('UI点击_继续游戏');
    };
    return GameBoxPage2;
}(FLBehavior_1["default"]));
exports["default"] = GameBoxPage2;
