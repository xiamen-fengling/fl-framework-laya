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
var FLResource_1 = require("../../fl/Framework/Core/Base/FLResource");
var FLBehavior_1 = require("../../fl/Framework/Core/FLBehavior");
var index_1 = require("../../fl/Framework/index");
var FLSystemEvent_1 = require("../../fl/Framework/Core/Base/FLSystemEvent");
var GameConsts_1 = require("../common/GameConsts");
var FLWechatMiniGame_1 = require("../../fl/Framework/Platform/WechatGame/FLWechatMiniGame");
var GameBoxPanel_1 = require("../../fl/Common/RecommendSys/GameBoxPanel");
var FLGameConfig_1 = require("../../fl/Config/FLGameConfig");
var FLAudio_1 = require("../../fl/Framework/Core/Base/FLAudio");
var GameDataCenter_1 = require("../../fl/Config/GameDataCenter");
var FLGloable_1 = require("../common/FLGloable");
var FLAnalytics_1 = require("../../fl/Framework/Core/Base/FLAnalytics");
var FLStore_1 = require("../../fl/Framework/Core/Base/FLStore");
var BezierPath_1 = require("../../fl/Framework/Tools/BezierPath");
var FLWechatGameBannerAd2_1 = require("../../fl/Framework/Platform/WechatGame/FLWechatGameBannerAd2");
var FLDevice_1 = require("../../fl/Framework/Core/Base/FLDevice");
var Game3D = /** @class */ (function (_super) {
    __extends(Game3D, _super);
    function Game3D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 3D场景
        _this.scene3D = null;
        // 角色小人
        _this.roleNode = null;
        // 触点坐标
        _this.touchPos = index_1["default"].v2();
        // 是否游戏正在进行中
        _this.isGamePlaying = false;
        // 相机节点
        _this.camera3d = null;
        //轨迹线
        _this.pikaku = null;
        //轨迹线父节点
        _this.lineObj = null;
        //线条对象集合
        _this.pikaqius = null;
        _this.pointArr = null;
        _this.startPos = new Laya.Vector3(0, -1.5, 0);
        _this.goPos = new Laya.Vector3(0, 1, -11);
        _this.endPos = new Laya.Vector3(0, -0.5, 0);
        //轨迹线点
        _this.lineNum = 60;
        //人物运动轨迹点
        _this.lineMaxNum = 60;
        //固定控制点
        _this.point2 = new Laya.Vector3(0, 10, 0);
        //是否正在播放角色的抛物线轨迹
        _this.isShowRoleGO = false;
        _this.currentIndex = 0;
        _this.boomMans = null;
        _this.boomManPosX = [6, 3, 0, -3, -6];
        //第几发炮弹
        _this.boomNum = 0;
        //有几发炮弹
        _this.boomCount = 0;
        //线条终点圆环
        _this.yuanhuan = null;
        /**弹簧 */
        _this.tanhuang = null;
        _this._tanhuangAnimator = null;
        _this._istanhuangAnimating = false;
        _this._isPreTanhuangAnimating = false;
        /**自身爆炸特效 */
        _this._selfBoomEffect = null;
        /**火焰特效 */
        _this._fireEffect = null;
        /**炸弹火焰特效 */
        _this._boomFireEffect = null;
        /**木屑拖尾特效 */
        _this._woodTuoweiEffect = null;
        /**糖果发射特效 */
        _this._caddyEffect = null;
        /**木屑爆炸烟雾特效 */
        _this._woodBoomFogEffect = null;
        /**彩带特效 */
        _this._chaidaiEffect = null;
        /**特效节点 */
        _this._EffectObj = null;
        //本局是否结束
        _this.gameOver = false;
        //糖果掉落点
        _this.caddyPointArr = null;
        _this.newpoint2 = new Laya.Vector3(0, 10, 0);
        _this.newcurrentIndex = 0;
        _this.newlineNum = 12;
        _this.newpointArr = null;
        //跳上弹簧
        _this.isJumpTH = false;
        //点击冷却
        _this.canClick = false;
        //点击冷却
        _this.startClick = false;
        //显示bomb图片位置
        _this.outPos = new Laya.Vector4();
        //准心是否正在缓动中
        _this._isTween = false;
        /**地图道具节点 */
        _this.mapItemObj = null;
        //一次炸到的人数
        _this.onceBombCount = 0;
        return _this;
    }
    ;
    Game3D.prototype.onLoaded = function () {
        var _this = this;
        // FLResource.unityAssetsPath ='BooomMain';// `unity_assets/LayaScene_BooomMainScene/Conventional`;
        // 加载u3d资源
        this.canClick = false;
        this.initScene3D();
        if (FLGloable_1.FLGloable.isFrstEnter) {
            Laya.timer.frameOnce(90, this, function () {
                FLSystemEvent_1["default"].emit(GameConsts_1.EGameEventName.GAME_INIT_END, _this);
            });
        }
    };
    Game3D.prototype.onAddEvents = function () {
        FLSystemEvent_1["default"].on(GameConsts_1.EGameEventName.OPEN_GAME3D, this.closeAndOpenScene, this);
        FLSystemEvent_1["default"].on(GameConsts_1.EGameEventName.GAME_READY, this.onGameReady, this);
        // FLSystemEvent.on('GOIN_3DSCENE', this.closeAndOpenScene, this);
    };
    Game3D.prototype.initScene3D = function () {
        var _this = this;
        if (FLGloable_1.FLGloable.isFirstLoadingRes) {
            FLGloable_1.FLGloable.isFirstLoadingRes = false;
            var scene = Laya.loader.getRes(FLResource_1["default"].unityAssetsPath + 'BooomMainScene.ls');
            this.initScene(scene);
        }
        else {
            Laya.Scene3D.load(FLResource_1["default"].unityAssetsPath + 'BooomMainScene.ls', Laya.Handler.create(this, function (scene) {
                _this.initScene(scene);
            }));
        }
    };
    Game3D.prototype.initScene = function (scene) {
        this.scene3D = scene;
        this.camera3d = this.scene3D.getChildByName('Main Camera');
        this.owner.addChild(this.scene3D);
    };
    /**
     * 蹦到发射台的动作效果
     */
    Game3D.prototype.initJump = function () {
        this.newgoPos1 = new Laya.Vector3(0, 0, -15);
        // this.newendPos1 = this.tanhuang.transform.position;
        this.newendPos1 = index_1["default"].v3(this.tanhuang.transform.position.x, this.tanhuang.transform.position.y, this.tanhuang.transform.position.z - 0.5);
        var points = [];
        var point1 = this.newgoPos1; // 起点
        var point3 = this.newendPos1; //终点
        var distance = Laya.Vector3.distance(point1, point3);
        this.newpoint2.x = (point1.x + point3.x) / 2;
        this.newpoint2.y = 10 - distance / 1.0; //distance >= 20 ? 20 : 30 - distance / 3.0;
        this.newpoint2.z = (point1.z + point3.z) / 2;
        points.push(point1);
        points.push(this.newpoint2);
        points.push(point3);
        this.newpointArr = BezierPath_1.BezierPath.Create3DBezierPoints(points, this.newlineNum);
    };
    /**
     * 播放准心缩弹缓动效果
     */
    Game3D.prototype.tweenYuanHuan = function () {
        var _this = this;
        if (!this.yuanhuan || !this.yuanhuan.transform) {
            return;
        }
        var tScale = this._isTween ? 5.5 : 4.5;
        Laya.Tween.clearAll(this.yuanhuan);
        Laya.Tween.to(this.yuanhuan.transform, { localScaleX: tScale, localScaleZ: tScale }, 1000, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
            _this._isTween = !_this._isTween;
            _this.tweenYuanHuan();
        }));
    };
    /**
     *初始化游戏等级
     */
    Game3D.prototype.initGameLevel = function () {
        // FLGloable.currentLevel = curLevel;
    };
    /**
     * 设置阴影
     */
    Game3D.prototype.initShadows = function () {
        var directionLight = this.scene3D.getChildByName('Directional Light');
        directionLight.shadow = true;
        directionLight.shadowDistance = 80;
        if (FLDevice_1["default"].isIosEvivorment()) {
            directionLight.shadowResolution = 4096;
        }
        else {
            directionLight.shadowResolution = 4096;
        }
        //生成阴影贴图数量
        directionLight.shadowPSSMCount = 1;
        //模糊等级,越大越高,更耗性能 
        directionLight.shadowPCFType = 1;
        this.scene3D.getChildByName("Player0").getChildByName('Player0').getChildByName('r_ZJ').skinnedMeshRenderer.castShadow = true;
    };
    /**
     * 游戏准备-倒计时
     */
    Game3D.prototype.onGameReady = function () {
        FLAnalytics_1["default"].sendUserEvent('进入游戏页');
        if (GameDataCenter_1["default"].isNewPlayer) {
            FLAnalytics_1["default"].sendUserEvent('新用户_进入游戏页');
        }
        //进入游戏关闭广告
        FLWechatGameBannerAd2_1["default"].hideAllBannerAd();
        var realnNum = GameDataCenter_1["default"].level + 1;
        if (realnNum <= 30 || realnNum == 50 ||
            (realnNum >= 100 && realnNum <= 104) ||
            realnNum == 150 || realnNum == 200 || realnNum == 300) {
            FLAnalytics_1["default"].sendStageStartEvent("" + (10000 + realnNum), "\u5173\u5361_\u7B2C" + realnNum + "\u5173");
        }
        //新用户统计
        if ((GameDataCenter_1["default"].first || FLStore_1["default"].get('isNotFirstEnterGame', 0)) && realnNum <= 30) {
            FLAnalytics_1["default"].sendStageStartEvent("" + realnNum, "\u65B0\u7528\u6237_\u7B2C" + realnNum + "\u5173");
        }
        Laya.Scene.open(GameConsts_1.PageName.PAGE_SHOW_RANK, false);
        if (GameDataCenter_1["default"].level < 3 || GameDataCenter_1["default"].playToday === 1) {
            Laya.Scene.open("GuidePage.scene", false);
        }
        //直接开始，跳过倒计时
        this.canClick = true;
        this.onGameStart();
    };
    // 游戏开始
    Game3D.prototype.onGameStart = function () {
        FLSystemEvent_1["default"].emit(GameConsts_1.EGameEventName.GAME_STARTED);
        this.isGamePlaying = true;
        FLGloable_1.FLGloable.iswin = false;
    };
    //游戏真正结束
    Game3D.prototype.goGameEnd = function () {
        this.isGamePlaying = false;
        var realnNum = GameDataCenter_1["default"].level + 1;
        if (realnNum <= 30 || realnNum == 50 ||
            (realnNum >= 100 && realnNum <= 104) ||
            realnNum == 150 || realnNum == 200 || realnNum == 300) {
            FLAnalytics_1["default"].sendStageEndEvent("" + (10000 + realnNum), "\u5173\u5361_\u7B2C" + realnNum + "\u5173", FLGloable_1.FLGloable.iswin);
        }
        //新用户统计
        if ((GameDataCenter_1["default"].first || FLStore_1["default"].get('isNotFirstEnterGame', 0)) && realnNum <= 30) {
            FLAnalytics_1["default"].sendStageEndEvent("" + realnNum, "\u65B0\u7528\u6237_\u7B2C" + realnNum + "\u5173", FLGloable_1.FLGloable.iswin);
        }
        if (FLGloable_1.FLGloable.iswin) {
            this.onGameEndSucc();
        }
        else {
            this.onGameEndFail();
        }
        window.gameCount++;
    };
    // 游戏通关
    Game3D.prototype.onGameEndSucc = function () {
        var _this = this;
        this.gameOver = true;
        ++GameDataCenter_1["default"].level;
        this.scheduleOnce(function () { FLAudio_1.FLAudio.playSoundByPath('snd/victory.mp3'); _this.onShowRankPage(); }, 2);
    };
    // 游戏失败
    Game3D.prototype.onGameEndFail = function () {
        var _this = this;
        this.gameOver = true;
        this.scheduleOnce(function () { FLAudio_1.FLAudio.playSoundByPath('snd/failure.mp3'); _this.onShowRankPage(); }, 2);
    };
    // 显示结算页
    Game3D.prototype.onShowRankPage = function () {
        this.unscheduleAllCallbacks();
        if (this.bomb) {
            this.bomb.visible = false;
        }
        Laya.Scene.open(GameConsts_1.PageName.PAGE_SCORE, false);
        FLSystemEvent_1["default"].emit(GameConsts_1.EGameEventName.CLOSE_BANNER);
        GameDataCenter_1["default"].isGameEndIntoBoxPage = true;
        GameDataCenter_1["default"].intoBoxPageNum++;
        window.onGameEnterToNextPage = this.onGameEnterToNextPage.bind(this);
    };
    /**
     * 清理粒子,对象池管理
     */
    Game3D.prototype.updateEffectState = function () {
        if (this._EffectObj && this._EffectObj.numChildren > 0) {
            for (var index = 0; index < this._EffectObj.numChildren; index++) {
                var element = this._EffectObj.getChildAt(index).getChildAt(0);
                if (!element.particleSystem.isPlaying) {
                    if (element.name === 'bzxg') {
                        Laya.Pool.recover(GameConsts_1.EPoolKey.SELF_BOOM, element.parent);
                        element.parent.removeSelf();
                    }
                    else if (element.name === 'baozha_mx') {
                        Laya.Pool.recover(GameConsts_1.EPoolKey.WOOD_BOOM, element.parent);
                        element.parent.removeSelf();
                    }
                    else if (element.name === 'baozha_mx') {
                        Laya.Pool.recover(GameConsts_1.EPoolKey.CADDY_BOOM, element.parent);
                        element.parent.removeSelf();
                    }
                    else if (element.name === 'thyw') {
                        Laya.Pool.recover(GameConsts_1.EPoolKey.TANHUANG, element.parent);
                        element.parent.removeSelf();
                    }
                }
            }
        }
    };
    // 进入后续页面
    Game3D.prototype.onGameEnterToNextPage = function (isEnterNext) {
        var _this = this;
        if (isEnterNext === void 0) { isEnterNext = false; }
        if (FLWechatMiniGame_1["default"].isHideUIByWXSceneTag()) {
            this.closeAndOpenScene();
        }
        else {
            GameBoxPanel_1["default"].onCloseCallback = function () {
                var shwo = false;
                if (FLGameConfig_1["default"].isShowTouchByMistake('1')) {
                    Laya.Scene.open(GameConsts_1.PageName.PAGE_TOUCH_BANNER);
                    Game3D.deleteGame3D();
                    GameDataCenter_1["default"].openTouch = true;
                }
                else {
                    if (FLGameConfig_1["default"].serverConfig.GAMEBOX_SWITCH === 1 && FLGameConfig_1["default"].serverConfig.SWITCH_GAMEBOX_SHOW !== 3) {
                        if (FLGameConfig_1["default"].serverConfig.SWITCH_CHANGE_BOX === 1) {
                            _this.closeAndOpenScene();
                            Laya.Scene.open(GameConsts_1.PageName.PAGE_GAME_BOX2, true);
                        }
                        else {
                            Laya.Scene.open(GameConsts_1.PageName.PAGE_GAME_BOX3, false);
                            GameDataCenter_1["default"].openTouch = false;
                        }
                    }
                    else {
                        _this.closeAndOpenScene();
                        GameBoxPanel_1["default"].onCloseCallback = undefined;
                    }
                }
            };
            if (isEnterNext) {
                GameBoxPanel_1["default"].onCloseCallback();
                GameBoxPanel_1["default"].onCloseCallback = undefined;
            }
            else {
                GameBoxPanel_1["default"].prePositionTag = '游戏页';
                if (FLGameConfig_1["default"].serverConfig.SWITCH_BOX_PANEL !== 3) {
                    Laya.Scene.open(GameConsts_1.PageName.PAGE_GAME_BOX);
                    GameDataCenter_1["default"].isGameEndIntoBoxPage = true;
                    GameDataCenter_1["default"].intoBoxPageNum++;
                }
                else {
                    var shwo = false;
                    if (FLGameConfig_1["default"].isShowTouchByMistake('1')) {
                        Laya.Scene.open(GameConsts_1.PageName.PAGE_TOUCH_BANNER);
                        Game3D.deleteGame3D();
                        GameDataCenter_1["default"].openTouch = true;
                    }
                    else {
                        if (FLGameConfig_1["default"].serverConfig.GAMEBOX_SWITCH === 1 && FLGameConfig_1["default"].serverConfig.SWITCH_GAMEBOX_SHOW !== 3) {
                            Laya.Scene.open(GameConsts_1.PageName.PAGE_GAME_BOX3, false);
                            GameDataCenter_1["default"].openTouch = false;
                        }
                        else {
                            this.closeAndOpenScene();
                            GameBoxPanel_1["default"].onCloseCallback = undefined;
                        }
                    }
                }
            }
        }
    };
    //关闭场景
    Game3D.prototype.closeAndOpenScene = function () {
        Laya.Scene.closeAll();
        var callback = function () {
            FLSystemEvent_1["default"].emit(GameConsts_1.EGameEventName.GAME_READY);
            FLSystemEvent_1["default"].off(GameConsts_1.EGameEventName.LOAD_SCENE3D_ENDED, callback, FLSystemEvent_1["default"]);
        };
        FLSystemEvent_1["default"].on(GameConsts_1.EGameEventName.LOAD_SCENE3D_ENDED, callback, FLSystemEvent_1["default"]);
        Game3D.openGame3D();
    };
    /** 打开3D场景 */
    Game3D.openGame3D = function () {
        // Game3D.deleteGame3D();
        if (!Game3D.scene3DRoot) {
            // FLGloable.isGameEnded = false;
            Game3D.scene3DRoot = new Laya.Sprite();
            Game3D.scene3DRoot.width = Laya.stage.width;
            Game3D.scene3DRoot.height = Laya.stage.height;
            Game3D.scene3DRoot.addComponent(Game3D);
            Laya.stage.addChild(Game3D.scene3DRoot);
            window.scene3DRoot = this.scene3DRoot;
            try {
                Laya.stage.getChildByName('root').zOrder = 10;
            }
            catch (error) { }
        }
        else {
            var mainScene = Game3D.scene3DRoot.getComponent(Game3D);
            mainScene.resetGame3D();
        }
    };
    /**销毁场景 */
    Game3D.deleteGame3D = function () {
        if (Game3D.scene3DRoot) {
            var node = Game3D.scene3DRoot;
            Game3D.scene3DRoot = null;
            node.destroy(true);
            node = null;
            FLGloable_1.FLGloable.log('aaa  销毁节点');
        }
    };
    /** 3D场景根节点 */
    Game3D.scene3DRoot = null;
    return Game3D;
}(FLBehavior_1["default"]));
exports["default"] = Game3D;
