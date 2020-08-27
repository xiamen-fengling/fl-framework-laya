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
var FLAnalytics_1 = require("../../fl/Framework/Core/Base/FLAnalytics");
var GameBoxPanel_1 = require("../../fl/Common/RecommendSys/GameBoxPanel");
var GameConsts_1 = require("../common/GameConsts");
var FLBehavior_1 = require("../../fl/Framework/Core/FLBehavior");
var FLSystemEvent_1 = require("../../fl/Framework/Core/Base/FLSystemEvent");
var FLGloable_1 = require("../common/FLGloable");
var GameDataCenter_1 = require("../../fl/Config/GameDataCenter");
var FLGameConfig_1 = require("../../fl/Config/FLGameConfig");
var HomePage = /** @class */ (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop {name: btnGameStart, type: Node} */
        _this.btnGameStart = null;
        /** @prop {name: btnOtherGame, type: Node} */
        _this.btnOtherGame = null;
        /** @prop {name: btnExitGame, type: Node} */
        _this.btnExitGame = null;
        _this.logoClickNum = 0;
        return _this;
    }
    HomePage.prototype.onAwake = function () {
        // FLAnalytics.sendUserEvent('游戏启动-到达HomePage-' + ((new Date()).getTime() - (window as any).timeStart));
        var bg = new Laya.Sprite();
        bg.graphics.drawRect(0, 0, 800, 2000, '#000000');
        bg.alpha = 138 / 255;
        this.owner.addChildAt(bg, 0);
        this.btnGameStart.on(Laya.Event.CLICK, this, this.onClickGameStart);
        this.btnOtherGame.on(Laya.Event.CLICK, this, this.onClickOtherGame);
        this.btnExitGame.on(Laya.Event.CLICK, this, this.onOpenGameListPage);
        // this.btnMoreGame.on(Laya.Event.CLICK, this, this.onClickMoreGame);
        this.onTween();
        if (FLWechatMiniGame_1["default"].isHideUIByWXSceneTag()) {
            this.btnOtherGame.visible = false;
            this.btnExitGame.visible = false;
        }
        if (FLGameConfig_1["default"].serverConfig.SWITCH_BOX_PANEL === 3) {
            this.btnOtherGame.visible = false;
        }
        this.owner.height = Laya.stage.height;
        this.owner.width = Laya.stage.width;
        this.logo = this.owner.getChildByName('logo');
        this.logo.on(Laya.Event.CLICK, this, this.onClickLogo);
        this.logoClickNum = 0;
        //新用户统计
        if (GameDataCenter_1["default"].isNewPlayer) {
            FLAnalytics_1["default"].sendUserEvent('新用户_进入游戏首页');
        }
        FLAnalytics_1["default"].sendUserEvent('进入游戏首页');
    };
    HomePage.prototype.onClickLogo = function () {
        this.logoClickNum++;
        if (this.logoClickNum == 10) {
            Laya.Stat.show();
        }
        else if (this.logoClickNum == 20) {
            this.logoClickNum = 0;
            Laya.Stat.hide();
        }
    };
    HomePage.prototype.onEnable = function () {
        // GameDataCenter.inPage = '首页';
        FLAnalytics_1["default"].sendUserEvent('按钮');
        GameDataCenter_1["default"].prePositionTag = '按钮';
        GameBoxPanel_1["default"].onCloseCallback = function () {
            Laya.Scene.open(GameConsts_1.PageName.PAGE_HOME);
        };
    };
    HomePage.prototype.onDisable = function () {
        if (this.scene) {
            this.scene.visible = false;
        }
    };
    HomePage.prototype.onOpenGameListPage = function () {
        GameBoxPanel_1["default"].onCloseCallback = function () { Laya.Scene.open(GameConsts_1.PageName.PAGE_HOME); };
        Laya.Scene.open(GameConsts_1.PageName.PAGE_GAME_LIST, true);
        FLAnalytics_1["default"].sendUserEvent('UI点击_游戏首页_按钮');
    };
    HomePage.prototype.onTween = function () {
        var _this = this;
        Laya.Tween.clearAll(this.btnGameStart);
        Laya.Tween.to(this.btnGameStart, { scaleX: 1.2, scaleY: 1.2 }, 1000, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
            Laya.Tween.to(_this.btnGameStart, { scaleX: 1.0, scaleY: 1.0 }, 1000, Laya.Ease.linearNone, Laya.Handler.create(_this, _this.onTween));
        }));
    };
    HomePage.prototype.onClickGameStart = function () {
        Laya.Scene.closeAll();
        FLSystemEvent_1["default"].emit(GameConsts_1.EGameEventName.GAME_READY);
        FLAnalytics_1["default"].sendUserEvent('UI点击_游戏首页_开始游戏');
    };
    HomePage.prototype.onClickOtherGame = function () {
        GameBoxPanel_1["default"].onCloseCallback = function () { Laya.Scene.open(GameConsts_1.PageName.PAGE_HOME); };
        Laya.Scene.open(GameConsts_1.PageName.PAGE_GAME_BOX, true);
        GameDataCenter_1["default"].isGameEndIntoBoxPage = false;
        FLAnalytics_1["default"].sendUserEvent('UI点击_游戏首页');
    };
    HomePage.prototype.onClickMoreGame = function () {
        // console.log('UI点击_首页_互推墙');
        GameBoxPanel_1["default"].onCloseCallback = function () { Laya.Scene.open(GameConsts_1.PageName.PAGE_HOME); };
        FLAnalytics_1["default"].sendUserEvent('UI点击_游戏首页');
    };
    /**添加3d角色小人 */
    HomePage.prototype.add3DRole = function () {
        if (this.scene) {
            this.scene.visible = true;
            return;
        }
        this.scene = Laya.stage.addChild(new Laya.Scene3D());
        this.camera = this.scene.addChild(new Laya.Camera(0, 0.3, 1000));
        this.camera.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
        // this.camera.clearColor = new Laya.Vector4(255,255,255,22);
        this.camera.transform.translate(new Laya.Vector3(0, 0, 300));
        this.camera.normalizedViewport = new Laya.Viewport(0.3, 0.3, 0.4, 0.2); //(0.3, 0.3, 0.4, 0.2);
        this.camera.orthographic = true;
        //正交投影垂直矩阵尺寸
        this.camera.orthographicVerticalSize = 10;
        var directionLight = new Laya.DirectionLight();
        directionLight.intensity = 0.83;
        directionLight.transform.position = new Laya.Vector3(0, -5, 200);
        this.scene.addChild(directionLight);
        var resource = "unity_assets/Conventional/SampleScene.lh";
        // let sp = Laya.Loader.getRes(resource) as Laya.Sprite3D;
        // FLGloable.log(sp);
        Laya.Sprite3D.load(resource, Laya.Handler.create(this, function (sp) {
            sp.transform.setWorldLossyScale(new Laya.Vector3(0.03, 0.03, 0.03));
            this.scene.addChild(sp);
            sp.transform.translate(new Laya.Vector3(0, -5, 180));
            sp.transform.rotationEuler = new Laya.Vector3(0, 0, 0);
            var renwu = sp.getChildByName('renwu').getChildByName('ren');
            var material = renwu.skinnedMeshRenderer.material.clone();
            material.albedoColor = new Laya.Vector3(245 / 255, 186 / 255, 8 / 255);
            renwu.skinnedMeshRenderer.material = material;
            var animator = sp.getChildByName('renwu').getComponent(Laya.Animator);
            FLGloable_1.FLGloable.log(animator);
            animator.play('stand');
        }));
        this.scene.zOrder = 10;
    };
    HomePage.prototype.onDestroy = function () {
        Laya.Tween.clearAll(this.btnGameStart);
        this.camera = null;
        this.scene = null;
    };
    return HomePage;
}(FLBehavior_1["default"]));
exports["default"] = HomePage;
