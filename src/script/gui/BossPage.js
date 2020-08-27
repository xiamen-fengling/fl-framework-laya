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
var FLProgressBar_1 = require("../../fl/Framework/UI/FLProgressBar");
var FLWechatGameBannerAd2_1 = require("../../fl/Framework/Platform/WechatGame/FLWechatGameBannerAd2");
var FLSystemEvent_1 = require("../../fl/Framework/Core/Base/FLSystemEvent");
var FLWechatMiniGame_1 = require("../../fl/Framework/Platform/WechatGame/FLWechatMiniGame");
var FLAnalytics_1 = require("../../fl/Framework/Core/Base/FLAnalytics");
var FLBehavior_1 = require("../../fl/Framework/Core/FLBehavior");
var GameDataCenter_1 = require("../../fl/Config/GameDataCenter");
var GameConsts_1 = require("../common/GameConsts");
var FLGameConfig_1 = require("../../fl/Config/FLGameConfig");
var Game3D_1 = require("../Game3D/Game3D");
var FLAudio_1 = require("../../fl/Framework/Core/Base/FLAudio");
var FLGloable_1 = require("../common/FLGloable");
var BossPage = /** @class */ (function (_super) {
    __extends(BossPage, _super);
    function BossPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @prop {name: progressBar, type: Node} */
        _this.progressBar = null;
        /** @prop {name: btnHit, type: Node} */
        _this.btnHit = null;
        /** @prop {name: tip, type: Node} */
        _this.tip = null;
        /** @prop {name: whiteBar1,type: Node} */
        _this.whiteBar1 = null;
        /** @prop {name: whiteBar2,type: Node} */
        _this.whiteBar2 = null;
        /** @prop {name: bgFrame,type: Node} */
        _this.bgFrame = null;
        /** @prop {name: BossTitle,type: Node} */
        _this.BossTitle = null;
        /** 显示banner的阈值 */
        _this.showBannerRatio = 0.5;
        _this.banner = null;
        _this.skeleton = null;
        _this.aniName = '';
        //触发关闭、
        _this.touchClose = false;
        //点击频率
        _this.clickrate = 1;
        _this.isLoadedScene3D = false;
        _this.isTouchedBanner = false;
        _this.isTouchBannerShowGame = false;
        /**自身爆炸特效 */
        _this._selfBoomEffect = null;
        /**糖果特效 */
        _this.candy = null;
        /**特效节点 */
        _this._EffectObj = null;
        _this.isClick = false;
        return _this;
    }
    BossPage.prototype.onLoaded = function () {
        var _this = this;
        var bg = new Laya.Sprite();
        var bgColorData;
        if (GameDataCenter_1["default"].bgIndex === 1) {
            bgColorData = '#00FA9A';
        }
        else if (GameDataCenter_1["default"].bgIndex === 2) {
            bgColorData = '#34AFEF';
        }
        else {
            bgColorData = '#20B2AA';
        }
        bg.graphics.drawRect(0, 0, 800, 2000, bgColorData);
        this.owner.addChildAt(bg, 0);
        this.progressBar.visible = false;
        this.btnHit.visible = false;
        // this.owner.addChildAt(bg, 0);
        this.hitFLProgressBar = this.progressBar.getComponent(FLProgressBar_1["default"]);
        this.btnHit.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDownHit);
        this.btnHit.on(Laya.Event.MOUSE_UP, this, this.onClickHit);
        this.showBgFrame();
        this.onTweenTip1();
        if (Laya.stage.height / Laya.stage.width > 2) {
            this.progressBar.y = Laya.stage.height - 440;
        }
        else {
            this.progressBar.y = Laya.stage.height - 380;
        }
        this.btnHit.y = Laya.stage.height - 60 - 80;
        this.owner.height = Laya.stage.height;
        this.owner.width = Laya.stage.width;
        /**初始化boss场景 */
        Laya.Scene3D.load('unity_assets//Conventional/BossScene.ls', Laya.Handler.create(null, function (scene) { _this.onLoadFinish(scene); }));
        FLSystemEvent_1["default"].on(FLWechatMiniGame_1["default"].EEventName.WECHAT_MINI_GAME_TOUCH_BANNER_AD, this.onTouchBannerCallback, this);
        FLSystemEvent_1["default"].on('GOIN_3DSCENE', this.onGotoGame3d, this);
    };
    BossPage.prototype.onLoadFinish = function (_scene) {
        // Laya.Scene.open(PageName.PAGE_TOUCH_BANNER);
        this.scene3D = _scene;
        this.scene3D.zOrder = GameConsts_1.LayerName.UI_3D;
        this.owner.addChild(this.scene3D);
        this.camera3D = this.scene3D.getChildByName('Main Camera');
        this.camera3D.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
        this._EffectObj = this.scene3D.getChildByName('EffectObj');
        this.Boss = this.scene3D.getChildByName('Enemy');
        this.Boss.transform.localPositionY = 30;
        this.player = this.scene3D.getChildByName('Player');
        this.player.active = false;
        // this.Boss.active = false;
        this.fireNode = this.scene3D.getChildByName('b_tanhuang_tan');
        this.anima = this.fireNode.getComponent(Laya.Animator);
        this.anima.speed = 0;
        this.plane = this.scene3D.getChildByName('Plane');
        this.plane.active = false;
        this._selfBoomEffect = this.scene3D.getChildByName('bzxg');
        this._selfBoomEffect.active = false;
        this.cube = this.scene3D.getChildByName('Cube');
        this.cube.active = false;
        this.candy = this.scene3D.getChildByName('tg');
        this.candy.active = false;
        this.cube.active = false;
        this.scheduleOnce(function () {
            FLAudio_1.FLAudio.playSoundByPath('snd/landing.mp3');
        }, 1.5);
        this.copyPlayer();
        FLSystemEvent_1["default"].on('HIT_BOSS', this.changeProgress, this);
        FLSystemEvent_1["default"].on('FIRE_EFFECT', this.createEffect, this);
    };
    //复制出五个
    BossPage.prototype.copyPlayer = function () {
        for (var index = 0; index < 5; index++) {
            var x = void 0, y = void 0, z = void 0;
            x = -6 + index * 3;
            y = -0.7;
            if (index === 2) {
                z = -10;
            }
            else {
                z = -8.5;
            }
            var play = Laya.Sprite3D.instantiate(this.player, this.scene3D, false, new Laya.Vector3(x, y, z));
            play.active = true;
            var playerAnim = play.getChildByName('Player').getComponent(Laya.Animator);
            playerAnim.speed = 0;
        }
    };
    //准备发射
    BossPage.prototype.redeyFire = function () {
        if (this.scene3D === null) {
            return;
        }
        var play = Laya.Sprite3D.instantiate(this.player, this.scene3D, false, new Laya.Vector3(0, 0, 0));
        play.transform.localRotationEulerY = 180;
        play.active = true;
        this.fireNode.addChild(play);
        this.anima.speed = 2;
        this.anima.play(null, 0, 0);
        this.scheduleOnce(function () {
        }, 0.2);
    };
    //回收
    BossPage.prototype.onRecovery = function () {
        FLSystemEvent_1["default"].off('FIRE_EFFECT', this.createEffect, this);
        FLSystemEvent_1["default"].off('GOIN_3DSCENE', this.onGotoGame3d, this);
        this.unscheduleAllCallbacks();
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        this.hitFLProgressBar = null;
        this.showBannerRatio = 0.5;
        this.skeleton = null;
        this.banner.hide();
        if (this.scene3D) {
            this.scene3D.destroy(true);
            this.scene3D = null;
        }
        this.Boss = null;
        this.player = null;
        this.fireNode = null;
        this.anima = null;
        this.plane = null;
        this.cube = null;
        this._selfBoomEffect = null;
        this.candy = null;
        this._EffectObj = null;
        Laya.Resource.destroyUnusedResources();
    };
    BossPage.prototype.createEffect = function (effectType, pos) {
        if (!this._selfBoomEffect || !this._EffectObj) {
            return;
        }
        var effectObj;
        effectObj = Laya.Sprite3D.instantiate(this._selfBoomEffect, this._EffectObj);
        effectObj.active = false;
        effectObj.active = true;
        effectObj.transform.position = pos;
        effectObj.zOrder = GameConsts_1.LayerName.EFFECT;
        this.scheduleOnce(function () {
            effectObj.destroy(true);
        }, 1);
        FLAudio_1.FLAudio.playSoundByPath('snd/BOMB3.mp3');
        FLWechatMiniGame_1["default"].vibrateLong();
    };
    BossPage.prototype.onEnabled = function () {
        this.banner = this.owner.getComponent(FLWechatGameBannerAd2_1["default"]);
        this.hitFLProgressBar.progress = 1;
        this.clickrate = 1;
        this.showBannerRatio = 0.5;
        FLAnalytics_1["default"].sendUserEvent('进入Boss游戏页');
        if (GameDataCenter_1["default"].isNewPlayer) {
            FLAnalytics_1["default"].sendUserEvent('新用户_进入Boss游戏页');
        }
    };
    BossPage.prototype.onMouseDownHit = function () {
        this.btnHit.scale(1.2, 1.2, true);
    };
    BossPage.prototype.onClickHit = function () {
        var _this = this;
        if (!this.isClick) {
            this.isClick = true;
            FLAnalytics_1["default"].sendUserEvent('UI点击_Boss页_疯狂点击按钮');
        }
        // FLAnalytics.sendUserEvent('UI点击_Boss页_疯狂点击按钮');
        if (!this.hitFLProgressBar) {
            return;
        }
        // if (this.hitFLProgressBar.progress === 0) { return; }
        if (this.clickrate === 0) {
            return;
        }
        this.btnHit.scale(1.0, 1.0, true);
        this.clickrate -= 0.1;
        this.redeyFire();
        if (this.clickrate < this.showBannerRatio) {
            FLGloable_1.FLGloable.log('====show banner===', this.showBannerRatio);
            this.banner.show();
            switch (this.showBannerRatio) {
                case 0.5:
                    this.showBannerRatio = 0.25;
                    break;
                case 0.25:
                    this.showBannerRatio = 0.1;
                    break;
                case 0.1:
                    this.hitFLProgressBar.progress = 0;
                    FLSystemEvent_1["default"].emit('BOSS_DIE');
                    this.scheduleOnce(function () {
                        _this.onEndToNextPage();
                    }, 1);
                    // this.onEndToNextPage(true, false);
                    // this.onEndToNextPage();
                    break;
                default:
                    break;
            }
        }
    };
    //进度条变化
    BossPage.prototype.changeProgress = function () {
        if (!this.hitFLProgressBar) {
            return;
        }
        if (this.hitFLProgressBar.progress === 0) {
            return;
        }
        this.btnHit.scale(1.0, 1.0, true);
        this.hitFLProgressBar.progress -= 0.1;
    };
    BossPage.prototype.onTweenTip1 = function () {
        Laya.Tween.clearAll(this.tip);
        Laya.Tween.to(this.tip, { scaleX: 1.1, scaleY: 1.1 }, 1000, Laya.Ease.linearNone, Laya.Handler.create(this, this.onTweenTip2));
    };
    BossPage.prototype.onTweenTip2 = function () {
        Laya.Tween.clearAll(this.tip);
        Laya.Tween.to(this.tip, { scaleX: 1.0, scaleY: 1.0 }, 1000, Laya.Ease.linearNone, Laya.Handler.create(this, this.onTweenTip1));
    };
    BossPage.prototype.onUpdate = function () {
        // if (this.hitFLProgressBar.progress === 0) { return; }
        if (this.clickrate === 0) {
            return;
        }
        if (this.clickrate >= 1) {
            this.clickrate = 1;
        }
        else {
            this.clickrate += 0.003;
        }
        this.hitFLProgressBar.progress += 0.01;
        if (this.clickrate > this.showBannerRatio * 2 + 0.15) {
            this.banner.hide();
            FLWechatGameBannerAd2_1["default"].hideAllBannerAd();
        }
    };
    BossPage.prototype.onTouchBannerCallback = function () {
        var _this = this;
        if (this.isTouchedBanner) {
            return;
        }
        this.isTouchedBanner = true;
        this.isTouchBannerShowGame = false;
        var callback;
        callback = function () {
            _this.isTouchBannerShowGame = true;
            wx['offShow'](callback);
            _this.isLoadedScene3D && FLSystemEvent_1["default"].emit(GameConsts_1.EGameEventName.GAME_READY);
        };
        wx['onShow'](callback);
        this.onEndToNextPage(true, true);
    };
    /**
     *
     * @param _isGetSpeedUp 是否获得奖励
     * @param isTouchBanner 是否Boss
     */
    BossPage.prototype.onEndToNextPage = function (_isGetSpeedUp, isTouchBanner) {
        if (_isGetSpeedUp === void 0) { _isGetSpeedUp = true; }
        if (isTouchBanner === void 0) { isTouchBanner = false; }
        if (this.touchClose) {
            return;
        }
        this.touchClose = true;
        if (!isTouchBanner) {
            this.isTouchBannerShowGame = true;
        }
        var touchBannerTag = isTouchBanner;
        this.isLoadedScene3D = false;
        if (FLGameConfig_1["default"].serverConfig.GAMEBOX_SWITCH === 1 && FLGameConfig_1["default"].serverConfig.SWITCH_GAMEBOX_SHOW !== 3) {
            if (FLGameConfig_1["default"].serverConfig.SWITCH_CHANGE_BOX === 1) {
                Laya.Scene.open(GameConsts_1.PageName.PAGE_GAME_BOX2, true);
                this.onGotoGame3d(isTouchBanner);
            }
            else {
                Laya.Scene.open(GameConsts_1.PageName.PAGE_GAME_BOX3, false);
            }
        }
        else {
            this.onGotoGame3d(isTouchBanner);
        }
        this.isTouchBanner = isTouchBanner;
    };
    BossPage.prototype.onDisable = function () {
        this.onRecovery();
    };
    /**显示黄色框 */
    BossPage.prototype.showBgFrame = function () {
        var _this = this;
        Laya.Tween.clearAll(this.bgFrame);
        this.showBoosTitle();
        Laya.Tween.to(this.bgFrame, { x: 0 }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
            Laya.timer.frameOnce(40, _this, function () {
                _this.showWhiteBar();
            });
        }));
    };
    /**出现白条 */
    BossPage.prototype.showWhiteBar = function () {
        var _this = this;
        Laya.Tween.clearAll(this.whiteBar1);
        Laya.Tween.to(this.whiteBar1, { x: 0 }, 500, Laya.Ease.linearNone);
        Laya.Tween.to(this.whiteBar2, { x: 0 }, 500, Laya.Ease.linearNone);
        Laya.Tween.to(this.whiteBar1, { x: 750 }, 200, Laya.Ease.linearNone, null, 4500);
        Laya.Tween.to(this.whiteBar2, { x: -750 }, 200, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
            _this.showBtnAndPro();
        }), 4500);
    };
    /**出现boos标题 */
    BossPage.prototype.showBoosTitle = function () {
        var _this = this;
        Laya.Tween.clearAll(this.BossTitle);
        Laya.Tween.to(this.BossTitle, { y: 150 }, 800, Laya.Ease.elasticInOut, Laya.Handler.create(this, function () {
            Laya.Tween.to(_this.BossTitle, { y: -185 }, 200, Laya.Ease.backIn, Laya.Handler.create(_this, function () {
                Laya.Tween.to(_this.bgFrame, { x: -750 }, 200, Laya.Ease.linearNone);
            }), 4500);
        }));
    };
    BossPage.prototype.showBtnAndPro = function () {
        this.progressBar.visible = true;
        this.btnHit.visible = true;
    };
    BossPage.prototype.onGotoGame3d = function (touchBannerTag) {
        var _this = this;
        Laya.timer.clearAll(this);
        Laya.Scene.closeAll();
        var callback;
        callback = function () {
            FLSystemEvent_1["default"].off(GameConsts_1.EGameEventName.LOAD_SCENE3D_ENDED, callback, FLSystemEvent_1["default"]);
            _this.isLoadedScene3D = true;
            if (_this.isTouchBanner) {
                _this.isTouchBannerShowGame && FLSystemEvent_1["default"].emit(GameConsts_1.EGameEventName.GAME_READY);
            }
            else {
                FLSystemEvent_1["default"].emit(GameConsts_1.EGameEventName.GAME_READY);
            }
        };
        FLSystemEvent_1["default"].on(GameConsts_1.EGameEventName.LOAD_SCENE3D_ENDED, callback, FLSystemEvent_1["default"]);
        Game3D_1["default"].openGame3D();
    };
    return BossPage;
}(FLBehavior_1["default"]));
exports["default"] = BossPage;
