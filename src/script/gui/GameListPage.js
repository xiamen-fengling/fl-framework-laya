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
var GameConsts_1 = require("../common/GameConsts");
var GameListPage = /** @class */ (function (_super) {
    __extends(GameListPage, _super);
    function GameListPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop {name: btnExitGame, type: Node} */
        _this.btnExitGame = null;
        return _this;
    }
    GameListPage.prototype.onAwake = function () {
        this.btnExitGame.on(Laya.Event.CLICK, this, this.onClose);
    };
    GameListPage.prototype.onEnable = function () {
        FLAnalytics_1["default"].sendUserEvent("\u8FDB\u5165\u5C0F\u7A0B\u5E8F\u9875");
    };
    GameListPage.prototype.onClose = function () {
        Laya.Scene.close(GameConsts_1.PageName.PAGE_GAME_LIST);
        FLAnalytics_1["default"].sendUserEvent('UI点击_关闭按钮');
    };
    return GameListPage;
}(FLBehavior_1["default"]));
exports["default"] = GameListPage;
