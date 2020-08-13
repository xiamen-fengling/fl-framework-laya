"use strict";
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 资源管理
 * zengbinsi
 * 2018-09-07
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var FLResource = /** @class */ (function () {
    function FLResource() {
    }
    Object.defineProperty(FLResource, "unityAssetsPath", {
        get: function () {
            return FLResource._unityPath;
        },
        /**
         * sceneName unity3d内导出的场景名
         */
        set: function (sceneName) {
            FLResource._unityPath = "unity_assets/LayaScene_" + sceneName + "/Conventional/";
        },
        enumerable: true,
        configurable: true
    });
    FLResource.init = function () {
        // Laya.loader.on(Laya.Event.ERROR, FLResource, FLResource.loadError);
    };
    /**
     * 加载场景
     * @param url ls文件资源路径
     */
    FLResource.loadSceneFile = function (url) {
        url = this.unityAssetsPath + url;
        return new Promise(function (resolve, reject) {
            try {
                Laya.Scene3D.load(url, Laya.Handler.create(null, function (scene) {
                    resolve(scene);
                }));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    /**
     * 加载材质
     * @param url lmat文件资源路径
     */
    FLResource.loadMaterial = function (url) {
        url = this.unityAssetsPath + url;
        return new Promise(function (resolve, reject) {
            try {
                Laya.BaseMaterial.load(url, Laya.Handler.create(null, function (mat) {
                    resolve(mat);
                }));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    /**
     * 加载纹理
     * @param url 图片文件资源路径
     */
    FLResource.loadTexture2D = function (url) {
        url = this.unityAssetsPath + url;
        return new Promise(function (resolve, reject) {
            try {
                Laya.Texture2D.load(url, Laya.Handler.create(null, function (tex) {
                    resolve(tex);
                }));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    /**
     * 加载网格
     * @param url lm文件资源路径
     */
    FLResource.loadMesh = function (url) {
        url = this.unityAssetsPath + url;
        return new Promise(function (resolve, reject) {
            try {
                Laya.Mesh.load(url, Laya.Handler.create(null, function (mesh) {
                    resolve(mesh);
                }));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    /**
     * 加载预设
     * @param url lh文件资源路径
     */
    FLResource.loadPrefab = function (url) {
        url = this.unityAssetsPath + url;
        return new Promise(function (resolve, reject) {
            try {
                Laya.Sprite3D.load(url, Laya.Handler.create(null, function (sp) {
                    resolve(sp);
                }));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    /**
     * 加载动画剪辑
     * @param url lani文件资源路径
     */
    FLResource.loadAnimationClip = function (url) {
        url = this.unityAssetsPath + url;
        return new Promise(function (resolve, reject) {
            try {
                Laya.AnimationClip.load(url, Laya.Handler.create(null, function (aniClip) {
                    resolve(aniClip);
                }));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    /**
     * 批量加载2D资源
     *
     * 加载后的资源通过 Laya.Loader.getRes(url) 获取
     *
     * @param urls 文件资源路径数组
     */
    FLResource.loadResList2D = function (urls) {
        return new Promise(function (resolve, reject) {
            try {
                Laya.loader.load(urls, Laya.Handler.create(null, function () {
                    resolve(Laya.loader);
                }));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    /**
     * 批量加载3D资源
     *
     * 加载后的资源通过 Laya.Loader.getRes(url) 获取
     *
     * @param urls 文件资源路径数组
     */
    FLResource.loadResList3D = function (urls) {
        return new Promise(function (resolve, reject) {
            try {
                Laya.loader.create(urls, Laya.Handler.create(null, function () {
                    resolve(Laya.loader);
                }));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    /** 销毁未使用的资源 */
    FLResource.destroyUnusedResources = function () {
        Laya.Resource.destroyUnusedResources();
    };
    /**
     * 【废弃】加载本地resources资源
     * @param path 资源目录基于resources目录
     * @param imgType 资源类型，支持 Laya.Loader.BUFFER 和 Laya.Loader.IMAGE 两种
     */
    FLResource.loadRes = function (path, imgType) {
        return new Promise(function (resolve, reject) {
            try {
                var onError_1 = function (err) {
                    Laya.loader.off(Laya.Event.ERROR, FLResource, onError_1);
                    reject(__assign({ msg: '加载失败', path: path }, err));
                };
                Laya.loader.load(path, imgType, Laya.Handler.create(FLResource, function () {
                    Laya.loader.off(Laya.Event.ERROR, FLResource, onError_1);
                    var res = Laya.Loader.getRes(path);
                    res ? resolve(res) : reject({ msg: '加载失败', path: path });
                }));
                Laya.loader.on(Laya.Event.ERROR, FLResource, onError_1);
            }
            catch (error) {
                reject(__assign({ msg: '加载失败', path: path }, error));
            }
        });
    };
    /**
     * 【废弃】加载远程图片
     * @param url 远程图片URL地址
     * @param imgType 资源类型，支持 Laya.Loader.BUFFER 和 Laya.Loader.IMAGE 两种
     */
    FLResource.loadRemoteImage = function (path, imgType) {
        return new Promise(function (resolve, reject) {
            try {
                var onError_2 = function (err) {
                    Laya.loader.off(Laya.Event.ERROR, FLResource, onError_2);
                    reject(__assign({ msg: '加载失败', path: path }, err));
                };
                Laya.loader.load([{ url: path, type: imgType }], Laya.Handler.create(FLResource, function () {
                    Laya.loader.off(Laya.Event.ERROR, FLResource, onError_2);
                    var res = Laya.Loader.getRes(path);
                    res ? resolve(res) : reject({ msg: '加载失败', path: path });
                }));
                Laya.loader.on(Laya.Event.ERROR, FLResource, onError_2);
            }
            catch (error) {
                reject(__assign({ msg: '加载失败', path: path }, error));
            }
        });
    };
    /**
     * 释放动态加载的资源
     * @param filePath 图片路径
     * @param isDestroyTexture 是否销毁纹理对象
     */
    FLResource.releaseAsset = function (filePath, isDestroyTexture) {
        if (isDestroyTexture === void 0) { isDestroyTexture = false; }
        if (isDestroyTexture) {
            Laya.loader.clearRes(filePath);
        }
        else {
            Laya.loader.clearTextureRes(filePath);
        }
    };
    // 加载失败的回调
    FLResource.loadError = function (err) {
        console.error(err);
    };
    /** 从Unity3D导出的资源存放位置 */
    FLResource._unityPath = '';
    return FLResource;
}());
exports["default"] = FLResource;
FLResource.init();
