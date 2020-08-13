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
var REG = Laya.ClassUtils.regClass;
var ui;
(function (ui) {
    var Game3DUI = /** @class */ (function (_super) {
        __extends(Game3DUI, _super);
        function Game3DUI() {
            return _super.call(this) || this;
        }
        Game3DUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("Game3D");
        };
        return Game3DUI;
    }(Laya.Scene));
    ui.Game3DUI = Game3DUI;
    REG("ui.Game3DUI", Game3DUI);
    var GameBoxPageUI = /** @class */ (function (_super) {
        __extends(GameBoxPageUI, _super);
        function GameBoxPageUI() {
            return _super.call(this) || this;
        }
        GameBoxPageUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("GameBoxPage");
        };
        return GameBoxPageUI;
    }(Laya.Scene));
    ui.GameBoxPageUI = GameBoxPageUI;
    REG("ui.GameBoxPageUI", GameBoxPageUI);
    var GameListPageUI = /** @class */ (function (_super) {
        __extends(GameListPageUI, _super);
        function GameListPageUI() {
            return _super.call(this) || this;
        }
        GameListPageUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("GameListPage");
        };
        return GameListPageUI;
    }(Laya.Scene));
    ui.GameListPageUI = GameListPageUI;
    REG("ui.GameListPageUI", GameListPageUI);
    var GameUIPageUI = /** @class */ (function (_super) {
        __extends(GameUIPageUI, _super);
        function GameUIPageUI() {
            return _super.call(this) || this;
        }
        GameUIPageUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("GameUIPage");
        };
        return GameUIPageUI;
    }(Laya.Scene));
    ui.GameUIPageUI = GameUIPageUI;
    REG("ui.GameUIPageUI", GameUIPageUI);
    var LoadPageUI = /** @class */ (function (_super) {
        __extends(LoadPageUI, _super);
        function LoadPageUI() {
            return _super.call(this) || this;
        }
        LoadPageUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("LoadPage");
        };
        return LoadPageUI;
    }(Laya.Scene));
    ui.LoadPageUI = LoadPageUI;
    REG("ui.LoadPageUI", LoadPageUI);
    var ResultPageUI = /** @class */ (function (_super) {
        __extends(ResultPageUI, _super);
        function ResultPageUI() {
            return _super.call(this) || this;
        }
        ResultPageUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("ResultPage");
        };
        return ResultPageUI;
    }(Laya.Scene));
    ui.ResultPageUI = ResultPageUI;
    REG("ui.ResultPageUI", ResultPageUI);
    var TouchBannerPageUI = /** @class */ (function (_super) {
        __extends(TouchBannerPageUI, _super);
        function TouchBannerPageUI() {
            return _super.call(this) || this;
        }
        TouchBannerPageUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("TouchBannerPage");
        };
        return TouchBannerPageUI;
    }(Laya.Scene));
    ui.TouchBannerPageUI = TouchBannerPageUI;
    REG("ui.TouchBannerPageUI", TouchBannerPageUI);
})(ui = exports.ui || (exports.ui = {}));
