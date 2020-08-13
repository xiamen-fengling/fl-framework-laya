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
var Game3D_1 = require("../Game3D/Game3D");
var GameConsts_1 = require("../common/GameConsts");
var FLGloable_1 = require("../common/FLGloable");
var FLMath_1 = require("../../fl/Framework/Core/Base/FLMath");
var FLSystemEvent_1 = require("../../fl/Framework/Core/Base/FLSystemEvent");
var FLAudio_1 = require("../../fl/Framework/Core/Base/FLAudio");
var FLWechatMiniGame_1 = require("../../fl/Framework/Platform/WechatGame/FLWechatMiniGame");
var FLAnalytics_1 = require("../../fl/Framework/Core/Base/FLAnalytics");
var FLResource_1 = require("../../fl/Framework/Core/Base/FLResource");
var LoadingPage = /** @class */ (function (_super) {
    __extends(LoadingPage, _super);
    function LoadingPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._targetPro = 0;
        _this._moveTime = 0;
        return _this;
    }
    LoadingPage.prototype.onAddEvents = function () {
        this.registerEvent(GameConsts_1.EGameEventName.GAME_INIT_END, this.loadOver, this);
    };
    LoadingPage.prototype.onLoaded = function () {
        var _this = this;
        this.barPro = this.owner.getChildByName('barPro');
        this.logo = this.owner.getChildByName('logo');
        this.label = this.owner.getChildByName('labelTip');
        this.runRole = this.barPro.getChildByName('runRole');
        this.logoBg = this.owner.getChildByName('logoBg');
        this.logoBg.height = Laya.stage.height;
        this.owner.zOrder = 20;
        /**初始化场景名，必填项，全局只有一个场景 */
        FLResource_1["default"].unityAssetsPath = 'BooomMainScene';
        console.log('---FLResource----', FLResource_1["default"].unityAssetsPath);
        var arr = [
            FLResource_1["default"].unityAssetsPath + 'BooomMainScene.ls',
            'res/atlas/bonesAnima.atlas',
        ];
        this.owner.height = Laya.stage.height;
        this.owner.width = Laya.stage.width;
        // 游戏初始化完成
        FLWechatMiniGame_1["default"].loadSubpackage('snd', function () {
            FLWechatMiniGame_1["default"].loadSubpackage('unity_assets', function () {
                _this.setAssets(arr);
                FLGloable_1.FLGloable._isFenbaoLoadOver = true;
            });
            FLAudio_1.FLAudio.playMusicByPath('snd/wabgm.mp3');
            FLSystemEvent_1["default"].on(FLWechatMiniGame_1["default"].EEventName.WECHAT_MINI_GAME_SHOW, function () {
                FLAudio_1.FLAudio.enableMusic(true);
                try {
                    FLAudio_1.FLAudio.bgmAudioId && FLAudio_1.FLAudio.bgmAudioId.play();
                }
                catch (err) { }
                Laya.timer.once(500, Laya.timer, function () {
                    FLAudio_1.FLAudio.playMusicByPath('snd/wabgm.mp3', 1, true);
                });
                FLGloable_1.FLGloable.log('恢复背景音乐');
            }, FLSystemEvent_1["default"]);
        });
    };
    /**
     * 设置所需加载资源
     * @param arr
     */
    LoadingPage.prototype.setAssets = function (arr) {
        Laya.loader.create(arr, Laya.Handler.create(this, this.onLoadEnd), Laya.Handler.create(this, this.onLoadProgress));
    };
    LoadingPage.prototype.onLoadEnd = function () {
        if (FLGloable_1.FLGloable._isFenbaoLoadOver) {
            Game3D_1["default"].openGame3D();
            Laya.Scene.open(GameConsts_1.PageName.PAGE_HOME);
        }
        FLGloable_1.FLGloable._isResourceLoadOver = true;
    };
    LoadingPage.prototype.onLoadProgress = function (res) {
        FLGloable_1.FLGloable.log("===========onLoadProgress====", res);
        this.updateProgressShow(res);
    };
    LoadingPage.prototype.updateProgressShow = function (v) {
        if (!this.barPro)
            return;
        this._targetPro = v;
    };
    LoadingPage.prototype.onOpenGameListPage = function () {
    };
    /**界面打开 */
    LoadingPage.prototype.onEnabled = function (param) {
        if (param === void 0) { param = null; }
        this.barPro.value = 0.05;
        this._moveTime = 0;
        FLAnalytics_1["default"].sendUserEvent('进入Loading页');
    };
    LoadingPage.prototype.onUpdate = function () {
        var diff = Laya.timer.delta;
        var movespeed = 0.005;
        if (this.barPro) {
            var lerp = FLMath_1["default"].lerpNumber(this.barPro.value, this._targetPro, diff * movespeed);
            lerp = lerp > 1 ? 1 : lerp;
            this.barPro.value = lerp;
            FLGloable_1.FLGloable.log('-------lerp------', lerp);
            var width = 40 + lerp * 460;
            this.runRole.x = width;
        }
    };
    LoadingPage.prototype.onClose = function () {
    };
    //加载完
    LoadingPage.prototype.loadOver = function () {
        this.close();
    };
    LoadingPage.prototype.close = function () {
        this.scheduleOnce(function () {
            Laya.Scene.close(GameConsts_1.PageName.PAGE_LOAD);
        }, 1);
    };
    LoadingPage.prototype.onDestroy = function () {
        this.barPro = null;
        this.logo = null;
        this.label = null;
        this.runRole = null;
        this.logoBg = null;
        this._targetPro = null;
    };
    return LoadingPage;
}(FLBehavior_1["default"]));
exports["default"] = LoadingPage;
