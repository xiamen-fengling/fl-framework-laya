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
var FLWechatGameBannerAd2_1 = require("../../fl/Framework/Platform/WechatGame/FLWechatGameBannerAd2");
var GameDataCenter_1 = require("../../fl/Config/GameDataCenter");
var GameBoxPage = /** @class */ (function (_super) {
    __extends(GameBoxPage, _super);
    function GameBoxPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop {name: btnExitGame, type: Node} */
        _this.btnExitGame = null;
        return _this;
    }
    GameBoxPage.prototype.onAwake = function () {
        this.btnExitGame.on(Laya.Event.CLICK, this, this.onClose);
    };
    GameBoxPage.prototype.onEnable = function () {
        var _this = this;
        FLAnalytics_1["default"].sendUserEvent("\u8FDB\u5165\u5168\u5C4F\u5356\u91CF\u9875_" + GameDataCenter_1["default"].prePositionTag);
        if (GameDataCenter_1["default"].isNewPlayer) {
            FLAnalytics_1["default"].sendUserEvent('新用户_进入');
        }
        if (FLGameConfig_1["default"].serverConfig.SWITCH_SHOW_GAME_BOX_BANNER !== 3 || window.reviewSwitch !== 1) {
            this.owner.getChildByName('bannerNode').active = true;
            this.scheduleOnce(function () {
                _this.owner.getChildByName('bannerNode').active = false;
            }, FLGameConfig_1["default"].serverConfig.GAMEBOX_BANNER_TIME);
        }
        else {
            FLWechatGameBannerAd2_1["default"].hideAllBannerAd();
            this.owner.getChildByName('bannerNode').active = false;
        }
    };
    GameBoxPage.prototype.onClose = function () {
        // Laya.Scene.close(PageName.PAGE_GAME_BOX);
        this.owner.close();
        FLAnalytics_1["default"].sendUserEvent('UI点击_继续游戏');
    };
    return GameBoxPage;
}(FLBehavior_1["default"]));
exports["default"] = GameBoxPage;
