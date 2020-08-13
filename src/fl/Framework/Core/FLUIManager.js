"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var FLSystemEvent_1 = require("./Base/FLSystemEvent");
var index_1 = require("../index");
var FLResource_1 = require("./Base/FLResource");
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * UI管理器
 * zengbinsi
 * 2019-02-28
 */
var FLUIManager = /** @class */ (function () {
    function FLUIManager() {
    }
    /**
     * 注册UI对象
     * @param uiNode 节点对象
     * @param uiName 节点名称
     */
    FLUIManager.registerUI = function (uiNode, uiName) {
        if (uiName === void 0) { uiName = undefined; }
        uiName = uiName || uiNode.name;
        FLUIManager.instances[uiName] = uiNode;
    };
    /**
     * 打开一个UI
     * @param uiName UI名称
     * @param callback 回调函数
     */
    FLUIManager.open = function (uiName, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var uiPath, arr, node, asset, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!uiName || uiName === '') {
                            return [2 /*return*/];
                        }
                        uiPath = uiName;
                        arr = uiName.split('/');
                        uiName = arr[arr.length - 1];
                        if (FLUIManager.opening[uiPath]) {
                            return [2 /*return*/];
                        }
                        FLUIManager.opening[uiPath] = !0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        if (!(uiName !== 'FLoadingMaskPanel')) return [3 /*break*/, 3];
                        return [4 /*yield*/, FLUIManager.open('FLoadingMaskPanel')];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        node = FLUIManager.instances[uiName];
                        if (node && node.getComponent && node._components) {
                            node.active = true;
                            FLUIManager.reshow(node, uiName);
                            FLUIManager.opening[uiPath] = undefined;
                            if (uiName !== 'FLoadingMaskPanel') {
                                FLUIManager.close('FLoadingMaskPanel');
                            }
                            FLSystemEvent_1["default"].emit(FLUIManager.EEventName.OPEN_UI, { uiName: uiName, uiPath: uiPath, node: node });
                            callback && callback(undefined, node);
                            return [2 /*return*/, node];
                        }
                        _a = FLUIManager.assets[uiName];
                        if (_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, FLResource_1["default"].loadPrefab("ui/" + uiPath)];
                    case 4:
                        _a = (_b.sent());
                        _b.label = 5;
                    case 5:
                        asset = _a;
                        FLUIManager.assets[uiName] = asset;
                        node = asset; // Laya.instantiate(asset);
                        FLUIManager.reshow(node, uiName);
                        FLUIManager.instances[uiName] = node;
                        FLUIManager.opening[uiPath] = undefined;
                        if (uiName !== 'FLoadingMaskPanel') {
                            FLUIManager.close('FLoadingMaskPanel');
                        }
                        FLSystemEvent_1["default"].emit(FLUIManager.EEventName.OPEN_UI, { uiName: uiName, uiPath: uiPath, node: node });
                        callback && callback(undefined, node);
                        return [2 /*return*/, node];
                    case 6:
                        error_1 = _b.sent();
                        FLUIManager.opening[uiPath] = undefined;
                        if (uiName !== 'FLoadingMaskPanel') {
                            FLUIManager.close('FLoadingMaskPanel');
                        }
                        callback ? callback(error_1) : console.error(error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 关闭一个UI
     * @param uiName UI名称 | UI节点对象
     * @param callback 回调函数
     */
    FLUIManager.close = function (uiName, isDestroy) {
        if (isDestroy === void 0) { isDestroy = false; }
        var node;
        // 获取节点
        if (typeof uiName === 'string') {
            var arr = uiName.split('/');
            uiName = arr[arr.length - 1];
            node = FLUIManager.instances[uiName];
        }
        else {
            node = uiName;
            uiName = node.name;
        }
        if (!node) {
            return null;
        }
        // 关闭节点
        node.active = !1;
        // node.parent = null;
        if (isDestroy) {
            FLUIManager.instances[uiName] = undefined;
            node.destroy();
        }
        FLSystemEvent_1["default"].emit(FLUIManager.EEventName.CLOSE_UI, { uiName: uiName });
        return isDestroy ? null : node;
    };
    /**
     * 打开一个UI，并添加到队列
     * @param uiName UI名称
     * @param callback 回调函数
     */
    FLUIManager.openOnQueue = function (uiName, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (FLUIManager.queueUiName) {
                            return [2 /*return*/, FLUIManager.queue.push({ uiName: uiName, callback: callback })];
                        }
                        FLUIManager.queueUiName = uiName;
                        return [4 /*yield*/, FLUIManager.open(uiName, callback)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 关闭一个UI，并从队列移除
     * @param uiName UI名称 | UI节点对象
     * @param callback 回调函数
     */
    FLUIManager.closeOnQueue = function (uiName, isDestroy) {
        if (isDestroy === void 0) { isDestroy = false; }
        return __awaiter(this, void 0, void 0, function () {
            var uiInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        FLUIManager.close(uiName, isDestroy);
                        FLUIManager.queueUiName = null;
                        uiInfo = FLUIManager.queue.splice(0, 1)[0];
                        if (!uiInfo) return [3 /*break*/, 2];
                        FLUIManager.queueUiName = uiInfo.uiName;
                        return [4 /*yield*/, FLUIManager.open(uiInfo.uiName, uiInfo.callback)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 加载Panel资源
     * @param uiName Panel资源路径
     * @param assetType 资源类型
     */
    FLUIManager.loadResPanel = function (uiName) {
        return __awaiter(this, void 0, void 0, function () {
            var uiPath, arr, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        uiPath = uiName;
                        arr = uiName.split('/');
                        uiName = arr[arr.length - 1];
                        if (FLUIManager.assets[uiName]) {
                            return [2 /*return*/, FLUIManager.assets[uiName]];
                        }
                        _a = FLUIManager.assets;
                        _b = uiName;
                        return [4 /*yield*/, FLResource_1["default"].loadPrefab("ui/" + uiPath)];
                    case 1:
                        _a[_b] = _c.sent();
                        return [2 /*return*/, FLUIManager.assets[uiName]];
                }
            });
        });
    };
    /** 重置节点层级和父节点 */
    FLUIManager.reshow = function (node, uiName) {
        var com = index_1["default"].getComponentByName(node, uiName);
        var parent;
        if (com && com.parentUIName && com.parentUIName.trim() !== '') {
            parent = FLUIManager.instances[com.parentUIName.trim()];
        }
        parent = parent || Laya.stage;
        parent.addChild(node);
        try {
            node.zOrder = Number(com.zIndex) || 0;
            node.updatezorder();
        }
        catch (error) {
        }
    };
    /**
     * 获取UI节点对象
     *
     * @static
     * @param {string} uiName UI名称
     * @returns
     * @memberof FLUIManager
     */
    FLUIManager.getUI = function (uiName) {
        return FLUIManager.instances[uiName];
    };
    /** 事件 */
    FLUIManager.EEventName = {
        OPEN_UI: 'OPEN_UI',
        CLOSE_UI: 'CLOSE_UI'
    };
    // UI单例对象(私有化)
    FLUIManager.instances = {};
    // 资源缓存
    FLUIManager.assets = {};
    // 队列
    FLUIManager.queue = [];
    // 当前显示的uiName
    FLUIManager.queueUiName = null;
    /** 正在打开的面板 */
    FLUIManager.opening = {};
    return FLUIManager;
}());
exports.FLUIManager = FLUIManager;
