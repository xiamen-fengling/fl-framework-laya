"use strict";
exports.__esModule = true;
var GameConfig_1 = require("./GameConfig");
var FLWechatServerConfig_1 = require("./fl/Framework/Platform/WechatGame/FLWechatServerConfig");
var FLWechatGameLogin_1 = require("./fl/Framework/Platform/WechatGame/FLWechatGameLogin");
var FLWechatGameShare_1 = require("./fl/Framework/Platform/WechatGame/FLWechatGameShare");
var Main = /** @class */ (function () {
    function Main() {
        this.load = null;
        //根据IDE设置初始化引擎		
        if (window["Laya3D"])
            Laya3D.init(GameConfig_1["default"].width, GameConfig_1["default"].height);
        else
            Laya.init(GameConfig_1["default"].width, GameConfig_1["default"].height, Laya["WebGL"]);
        Laya["Physics"] && Laya["Physics"].enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
        Laya.stage.scaleMode = GameConfig_1["default"].scaleMode;
        Laya.stage.screenMode = GameConfig_1["default"].screenMode;
        Laya.stage.alignV = GameConfig_1["default"].alignV;
        Laya.stage.alignH = GameConfig_1["default"].alignH;
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = GameConfig_1["default"].exportSceneToJson;
        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (GameConfig_1["default"].debug || Laya.Utils.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        if (GameConfig_1["default"].physicsDebug && Laya["PhysicsDebugDraw"])
            Laya["PhysicsDebugDraw"].enable();
        if (GameConfig_1["default"].stat)
            Laya.Stat.show();
        Laya.alertGlobalError = true;
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }
    Main.prototype.onVersionLoaded = function () {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    };
    Main.prototype.onConfigLoaded = function () {
        GameConfig_1["default"].startScene && Laya.Scene.open(GameConfig_1["default"].startScene, false);
        // // 加载管理器
        var gameMgr = new Laya.Node();
        gameMgr.addComponent(FLWechatServerConfig_1["default"]);
        gameMgr.addComponent(FLWechatGameLogin_1["default"]);
        gameMgr.addComponent(FLWechatGameShare_1["default"]);
        Laya.stage.addChild(gameMgr);
    };
    return Main;
}());
//激活启动类
new Main();
