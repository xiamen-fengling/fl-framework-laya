"use strict";
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
var FLSystemEvent_1 = require("../../Core/Base/FLSystemEvent");
var FLDevice_1 = require("../../Core/Base/FLDevice");
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 微信小游戏
 * zengbinsi
 * 2018-06-18
 */
/**
 * 微信小程序权限枚举
 *
 * @export
 * @enum {string}
 */
var EScope;
(function (EScope) {
    // 用户信息
    EScope["USER_INFO"] = "scope.userInfo";
    // 地理位置
    EScope["USER_LOCATION"] = "scope.userLocation";
    // 微信运动步数
    EScope["WERUN"] = "scope.werun";
    // 录音功能
    EScope["RECORD"] = "scope.record";
    // 保存到相册
    EScope["WRITE_PHOTOS_ALBUM"] = "scope.writePhotosAlbum";
})(EScope = exports.EScope || (exports.EScope = {}));
;
/**
 * 启动参数类型
 */
var LaunchOption = /** @class */ (function () {
    function LaunchOption() {
    }
    return LaunchOption;
}());
exports.LaunchOption = LaunchOption;
/**
 * 微信小游戏工具类
 */
var FLWechatMiniGame = /** @class */ (function () {
    function FLWechatMiniGame() {
    }
    /** 微信小游戏初始化 */
    FLWechatMiniGame.initInWXGame = function () {
        wx.onShow(function (option) {
            console.log('游戏唤醒参数:', option);
            FLWechatMiniGame.launchOption = __assign({}, option);
            FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.WECHAT_MINI_GAME_SHOW, FLWechatMiniGame.launchOption);
            // 检查更新
            FLWechatMiniGame.checkUpdateVersion();
        });
        wx.onHide(function (res) {
            console.log('游戏暂停参数:', res);
            try {
                FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.WECHAT_MINI_GAME_HIDE, res);
                if (!res || !res.mode) {
                    return;
                }
                if (res.mode === 'close') {
                    return FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.WECHAT_MINI_GAME_CLOSE, res);
                }
                if (!res.targetPagePath) {
                    return;
                }
                // 新增点击banner判定逻辑防止微信变更mode类型  by zengbinsi 20191127
                if (res.targetPagePath.indexOf('weixinadinfo') !== -1 && res.targetPagePath.indexOf('gdt_vid') !== -1) {
                    // 点击电商banner广告
                    if (res.targetPagePath.indexOf('mp.weixin.qq.com/mp/ad_biz_info') !== -1) {
                        res.adType = '关注公众号链接';
                    }
                    else {
                        // 包含可h5弹窗跳转APP的页面
                        res.adType = '电商链接';
                    }
                    return FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.WECHAT_MINI_GAME_TOUCH_BANNER_AD, res);
                }
                else if (res.targetPagePath.indexOf('SnsAdNativeLandingPagesPreviewUI') !== -1) {
                    // 点击下载页banner广告
                    res.adType = 'APP下载页';
                    return FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.WECHAT_MINI_GAME_TOUCH_BANNER_AD, res);
                }
                // 游戏挂起事件判定
                if (res.mode === 'hide') {
                    if (res.targetPagePath.indexOf('SnsAdNativeLandingPagesPreviewUI') !== -1) {
                        // 点击下载页banner广告
                        res.adType = 'APP下载页';
                        FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.WECHAT_MINI_GAME_TOUCH_BANNER_AD, res);
                    }
                    else if (res.targetPagePath.indexOf('weixinadinfo') !== -1 && res.targetPagePath.indexOf('gdt_vid') !== -1) {
                        // 点击电商banner广告
                        if (res.targetPagePath.indexOf('mp.weixin.qq.com/mp/ad_biz_info') !== -1) {
                            res.adType = '关注公众号链接';
                        }
                        else {
                            // 包含可h5弹窗跳转APP的页面
                            res.adType = '电商链接';
                        }
                        FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.WECHAT_MINI_GAME_TOUCH_BANNER_AD, res);
                    }
                    else if (res.targetPagePath.indexOf('SelectConversationUI') !== -1 || res.targetPagePath.indexOf('MMUINavigationController') !== -1) {
                        // 进入好友选择列表(分享)
                        FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.WECHAT_MINI_GAME_EMIT_SHARE, res);
                    }
                    else if (res.targetPagePath.indexOf('mp.weixin.qq.com/mp/wapreportwxadevlog?action=get_page&appid=wx') !== -1) {
                        // 进入意见反馈页面
                        FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.WECHAT_MINI_GAME_FEED_BACK, res);
                    }
                    else if (res.targetPagePath.indexOf('AppBrandProfileUI') !== -1 || res.targetPagePath.indexOf('NewWAProfileViewController') !== -1) {
                        // 进入关于小程序界面
                        FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.WECHAT_MINI_GAME_ABOUT, res);
                    }
                }
                else if (res.mode === 'launchMiniProgram') {
                    if (res.targetPagePath.indexOf('weixinadinfo') !== -1 && res.targetPagePath.indexOf('gdt_vid') !== -1) {
                        // 点击小游戏banner广告
                        res.adType = '微信小游戏';
                        FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.WECHAT_MINI_GAME_TOUCH_BANNER_AD, res);
                    }
                    else if (res.targetPagePath.indexOf('wx') !== -1) {
                        // 卖量跳转微信小游戏
                        FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.WECHAT_MINI_GAME_LAUNCH_MINI_GAME, res);
                    }
                }
                else if (res.mode === 'back') {
                    if (res.targetAction === 9 && res.targetPagePath.indexOf('wx') !== -1) {
                        // 卖量跳转微信小游戏
                        FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.WECHAT_MINI_GAME_LAUNCH_MINI_GAME, res);
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
        });
        try {
            // 获取启动参数
            var launchOptions = wx.getLaunchOptionsSync();
            window.FLWechatGameLogin.launchOptions = launchOptions;
        }
        catch (ex) {
        }
        // 检查更新
        FLWechatMiniGame.checkUpdateVersion();
        // 开启屏幕常亮
        FLWechatMiniGame.enableKeepScreenOn(true);
        // 开启胶囊菜单的分享
        FLWechatMiniGame.setShareAppMessage('听说只有百分之一的人能通过这关，你敢尝试一下么?', 'wx-assets/share/share_1.jpg');
        FLWechatMiniGame.enableShareMenu(true);
    };
    // ============================================
    // 权限相关
    // ============================================
    /**
     * 申请微信小程序预授权
     *
     * @static
     * @param {EScope} scope 权限枚举
     * @param {Function} callback 回调
     * @memberof FLWechatMiniGame
     */
    FLWechatMiniGame.authorize = function (scope, callback) {
        wx.authorize({
            scope: scope,
            success: function (res) {
                if (callback) {
                    callback(undefined, res);
                }
                FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.SCOPE_SUCCESS, res);
            },
            fail: function (res) {
                // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
                if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
                    if (callback) {
                        callback(res, undefined);
                    }
                    // 处理用户拒绝授权的情况
                    FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.SCOPE_ERROR, res);
                }
            }
        });
    };
    /**
     * 获取用户授权设置
     *
     * 如果用户拒绝过某个 scope 的授权申请，则后续这个 scope 下的相关 API 调用都会直接失败，用 wx.authorize() 申请此 scope 也会直接失败，而不会弹窗询问用户。这种情况下，需要引导用户主动到设置页面打开相应的 scope 权限。
     *
     * 授权页面的进入路径为：右上角菜单->关于（小程序名字）->右上角菜单->设置
     *
     * 注意：只有申请过授权的 scope 会出现在设置页面。
     *
     * 如果用户在小程序列表中删除了当前小程序，则所有允许过和拒绝过的授权记录都会被清空。
     *
     * 详询微信官方文档： https://mp.weixin.qq.com/debug/wxagame/dev/tutorial/open-ability/authorize.html?t=2018323
     *
     * @static
     * @param {any} callback 回调函数
     * @memberof FLWechatMiniGame
     */
    FLWechatMiniGame.getSetting = function (callback) {
        wx.getSetting({
            success: function (res) {
                var authSetting = res.authSetting;
                // if (authSetting['scope.userInfo'] === true) {
                //     // 用户已授权，可以直接调用相关 API
                // } else if (authSetting['scope.userInfo'] === false){
                //     // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
                // } else {
                //     // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
                // }
                if (callback) {
                    callback(null, authSetting);
                }
                FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.GET_SCOPE_SETTING_SUCCESS, authSetting);
            },
            fail: function (error) {
                if (callback) {
                    callback(error, null);
                }
                FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.GET_SCOPE_SETTING_ERROR, error);
            }
        });
    };
    // ============================================
    // 子域数据相关
    // ============================================
    /**
     * 发送消息到开放数据域
     *
     * @static
     * @param {*} data 消息内容
     * @memberof fl_FLWechatRankPanel
     */
    FLWechatMiniGame.postMessageToOpenDataContext = function (data) {
        try {
            // console.log('FLWechatMiniGame.postMessage', data);
            wx.postMessage(__assign({ openid: window.GameDataCenter ? window.GameDataCenter.openId : null }, data));
        }
        catch (error) { }
    };
    /**
     * 【主域不支持】在无须用户授权的情况下，批量获取用户信息。该接口只在开放数据域下可用
     *
     * https://developers.weixin.qq.com/minigame/dev/document/open-api/data/wx.getUserInfo.html
     *
     * @static
     * @param {Array<string>} openIdList 要获取信息的用户的 openId 数组，如果要获取当前用户信息，则将数组中的一个元素设为 'selfOpenId'
     * @param {string} [lang='en'] 显示用户信息的语言（en, zh_CN, zh_TW）
     * @param {Function} [callback] 回调函数
     * @memberof FLWechatMiniGame
     */
    FLWechatMiniGame.getUserInfo = function (openIdList, lang, callback) {
        if (lang === void 0) { lang = 'zh_CN'; }
        wx.getUserInfo({
            openIdList: ['selfOpenId', 'ownAP0b9qt6AzvYOSWOX8VX8KMq0', 'ownAP0QJHIN2w3X60EUsj2Vah5Ig', 'ownAP0f8ANWUCcloXN1oZPfxtz0g'],
            lang: 'zh_CN',
            success: function (res) {
                if (callback) {
                    callback(undefined, res);
                }
            },
            fail: function (err) {
                if (callback) {
                    callback(err, undefined);
                }
            }
        });
    };
    /**
     * 设置托管数据
     * @param datas 要保存额数据
     * @param successCb 保存成功的回调
     * @param failCb 保存失败的回调
     * @param completeCb 保存的回调
     */
    FLWechatMiniGame.setUserCloudStorage = function (datas, callback) {
        var KVDataList = [];
        for (var key in datas) {
            if (datas[key] === undefined || datas[key] === null) {
                continue;
            }
            KVDataList.push({ key: key, value: datas[key].toString() });
        }
        wx.setUserCloudStorage({
            KVDataList: KVDataList,
            success: function (res) {
                if (callback) {
                    callback(undefined, res);
                }
            },
            fail: function (err) {
                if (callback) {
                    callback(err, undefined);
                }
            },
            complete: function (res) {
            }
        });
    };
    /**
     * 获取当前用户也玩该小游戏的好友的用户数据
     *
     * 拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
     *
     * EEventNames.GET_FRIEND_CLOUND_STORAGE_SUCCESS事件会携带同玩好友的托管数据
     * 一个好友数据包含：
     * string avatarUrl
     * 用户的微信头像 url
     *
     * string nickName
     * 用户的微信昵称
     *
     * string openId
     * 用户的 openId
     *
     * Array.<KVData> KVList
     * 用户的托管 Key-Value 数据列表
     *
     * 详询微信官方文档： https://mp.weixin.qq.com/debug/wxagame/dev/document/open-api/data/wx.getFriendCloudStorage.html?t=2018323
     *
     * @static
     * @param {Array<string>} keyList 要拉取的 key 列表
     * @memberof FLWechat
     */
    FLWechatMiniGame.getFriendCloudStorage = function (keyList, callback) {
        wx.getFriendCloudStorage({
            keyList: keyList,
            success: function (res) {
                if (callback) {
                    callback(undefined, res);
                }
            },
            fail: function (err) {
                if (callback) {
                    callback(err, undefined);
                }
            },
            complete: function (res) {
            }
        });
    };
    /**
     * 获取当前用户在某个群中也玩该小游戏的成员的用户数据
     * 在小游戏是通过群分享卡片打开的情况下，可以通过调用该接口获取群同玩成员的游戏数据。该接口只可在开放数据域下使用
     *
     * 详询微信官方文档： https://mp.weixin.qq.com/debug/wxagame/dev/document/open-api/data/wx.getGroupCloudStorage.html?t=2018323
     *
     * @static
     * @param {string} shareTicket 群分享对应的 shareTicket
     * @param {Array<string>} keyList 要拉取的 key 列表
     * @param {Function} callback 回调函数
     * @memberof FLWechat
     */
    FLWechatMiniGame.getGroupCloudStorage = function (shareTicket, keyList, callback) {
        wx.getGroupCloudStorage({
            shareTicket: shareTicket,
            keyList: keyList,
            success: function (res) {
                if (callback) {
                    callback(undefined, res);
                }
            },
            fail: function (err) {
                if (callback) {
                    callback(err);
                }
            },
            complete: function (res) {
            }
        });
    };
    // ============================================
    // 支付相关
    // ============================================
    /**
     * 发起米大师支付
     *
     * https://developers.weixin.qq.com/minigame/dev/document/midas-payment/wx.requestMidasPayment.html
     *
     * @param offerId 在米大师侧申请的应用 id
     * @param buyQuantity 购买数量。mode=game 时必填。购买数量
     * @param callback 接口调用的回调函数
     * @param env 环境配置（0米大师正式环境， 1米大师沙箱环境）
     */
    FLWechatMiniGame.requestMidasPayment = function (offerId, buyQuantity, callback, env) {
        if (env === void 0) { env = 0; }
        var params = {
            mode: 'game',
            env: env,
            buyQuantity: buyQuantity,
            offerId: offerId,
            currencyType: 'CNY',
            platform: 'android',
            zoneId: '1',
            success: function (res) {
                callback(undefined, res);
            },
            fail: function (err) {
                callback(err);
            },
            complete: function (res) {
            }
        };
        wx.requestMidasPayment(params);
    };
    // ============================================
    // 硬件设备系统相关
    // ============================================
    /**
     * 启用屏幕常亮
     * @param value 是否开启屏幕常亮
     */
    FLWechatMiniGame.enableKeepScreenOn = function (value) {
        wx.setKeepScreenOn({
            keepScreenOn: value
        });
    };
    /**
     * 设置系统剪贴板的内容
     * @param content 剪贴板的内容
     * @param callback 回调函数
     */
    FLWechatMiniGame.setClipboardData = function (content, callback) {
        wx.setClipboardData({
            data: content,
            success: function (res) {
                if (callback) {
                    callback(undefined, res);
                }
            },
            fail: function (err) {
                if (callback) {
                    callback(err, undefined);
                }
            }
        });
    };
    /**
     * 设置系统剪贴板的内容
     * @param content 剪贴板的内容
     * @param callback 回调函数
     */
    FLWechatMiniGame.getClipboardData = function (callback) {
        wx.getClipboardData({
            success: function (res) {
                if (callback) {
                    callback(undefined, res);
                }
            },
            fail: function (err) {
                if (callback) {
                    callback(err, undefined);
                }
            }
        });
    };
    /**
     * 使手机发生较短时间的振动（15 ms）
     * @param callback 回调函数
     */
    FLWechatMiniGame.vibrateShort = function (callback) {
        if (FLWechatMiniGame.isEnableVibrate && wx && wx.vibrateShort) {
            wx.vibrateShort({
                success: function (res) {
                    if (callback) {
                        callback(undefined, res);
                    }
                },
                fail: function (err) {
                    if (callback) {
                        callback(err, undefined);
                    }
                }
            });
        }
    };
    /**
     * 使手机发生较长时间的振动（400 ms)
     * @param callback 回调函数
     */
    FLWechatMiniGame.vibrateLong = function (callback) {
        if (FLWechatMiniGame.isEnableVibrate && Laya.Browser.onMiniGame && wx && wx.vibrateLong) {
            wx.vibrateLong({
                success: function (res) {
                    if (callback) {
                        callback(undefined, res);
                    }
                },
                fail: function (err) {
                    if (callback) {
                        callback(err, undefined);
                    }
                }
            });
        }
    };
    /**
     * 是否启用振动
     * @param value 是否启动振动
     */
    FLWechatMiniGame.enableVibrate = function (value) {
        FLWechatMiniGame.isEnableVibrate = value;
    };
    // ============================================
    // 分享转发相关
    // ============================================
    /**
     * 是否显示小游戏右上角按钮菜单中的“转发”菜单，默认不展示
     * 用户在使用小游戏过程中，可转发消息给其他用户或群聊。
     *
     * @static
     * @param {boolean} isShow
     * @memberof FLWechat
     */
    FLWechatMiniGame.enableShareMenu = function (isShow) {
        if (isShow) {
            wx.showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline'],
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { }
            });
        }
        else {
            wx.hideShareMenu({
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { }
            });
        }
    };
    /**
     * 设置被动转发数据
     * 用户点击右上角菜单中的“转发”选项后，会触发转发事件，如果小游戏通过 wx.onShareAppMessage() 监听了这个事件，可通过返回自定义转发参数来修改转发卡片的内容，否则使用默认内容。
     *
     * @static
     * @param {string} title 转发面板标题
     * @param {string} imageUrl 转发面板分享图
     * @param {string} query 转发面板分享图
     * @memberof FLWechat
     */
    FLWechatMiniGame.setShareAppMessage = function (title, imageUrl, query) {
        wx.onShareAppMessage(function () { return ({ title: title, imageUrl: imageUrl, query: query }); });
    };
    /**
     * 获取转发详细信息
     *
     * 详询微信官方文档 https://developers.weixin.qq.com/minigame/dev/document/share/wx.getShareInfo.html?t=2018323
     *
     * @static
     * @param {string} shareTicket 转发票据
     * @param {string} callback 回调
     * @memberof FLWechat
     */
    FLWechatMiniGame.getShareInfo = function (shareTicket, callback) {
        wx.getShareInfo({
            shareTicket: shareTicket,
            success: function (res) {
                if (callback) {
                    callback(undefined, res);
                }
            },
            fail: function (err) {
                if (callback) {
                    callback(err, undefined);
                }
            },
            complete: function (res) {
            }
        });
    };
    /**
     * 更新转发属性
     *
     * @static
     * @param {any} shareParams 要修改的转发属性
     * @memberof FLWechat
     */
    FLWechatMiniGame.updateShareMenu = function (shareParams) {
        wx.updateShareMenu(shareParams);
    };
    /**
     * 获取启动参数
     */
    FLWechatMiniGame.getLaunchOptionsSync = function () {
        return wx.getLaunchOptionsSync();
    };
    // ============================================
    // APP系统相关
    // ============================================
    /**
     * 验证小游戏新版本
     *
     * @static
     * @memberof FLWechat
     */
    FLWechatMiniGame.checkUpdateVersion = function () {
        var updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log('check game update:', res);
        });
        updateManager.onUpdateReady(function () {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            console.log('update game successd');
            updateManager.applyUpdate();
            // wx.showModal({
            //     title: '微信提示',
            //     content: '小游戏新版本更新成功，是否立即重启进入新版本？',
            //     showCancel: true,
            //     cancelText: '取消',
            //     confirmText: '确定',
            //     success: (res)=>{
            //         if (res.confirm) {
            //             updateManager.applyUpdate();
            //         }
            //     },
            //     fail: (err)=>{}
            // });
        });
        updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            console.log('update game failed');
        });
    };
    /**
     * 退出小游戏
     */
    FLWechatMiniGame.exitMiniGame = function () {
        wx.exitMiniProgram({
            success: function (res) { },
            fail: function (err) { },
            complete: function (res) { }
        });
    };
    /**
     * 加载分包
     * @param name 分包名称
     * @param callback 回调
     */
    FLWechatMiniGame.loadSubpackage = function (name, callback) {
        if (!FLDevice_1["default"].isWechatGame()) {
            return callback && callback();
        }
        wx.loadSubpackage({
            name: name,
            success: function () { callback && callback(undefined, { name: name, msg: 'load subpackage successed.' }); },
            fail: function () { callback && callback({ name: name, msg: 'load subpackage failed.' }); },
            complete: function () { }
        });
    };
    /**
     * 创建一个子进程，如果当前已有子进程，则旧的进程会被结束
     *
     * https://developers.weixin.qq.com/minigame/dev/api/worker/Worker.html
     *
     * @param workerJSFile 文件名指定 worker 的入口js文件路径，绝对路径
     */
    FLWechatMiniGame.createWorker = function (workerJSFile) {
        FLWechatMiniGame.worker && this.destroyWorker();
        FLWechatMiniGame.worker = wx.createWorker(workerJSFile);
        FLWechatMiniGame.worker.onMessage(function (res) { FLSystemEvent_1["default"].emit(FLWechatMiniGame.EEventName.WECHAT_MINI_GAME_WORKER_MSG, res); });
        return FLWechatMiniGame.worker;
    };
    /**
     * 发送消息到子进程
     * @param datas 消息对象
     */
    FLWechatMiniGame.postMessageToWorker = function (datas) {
        if (!FLWechatMiniGame.worker) {
            return;
        }
        FLWechatMiniGame.worker.postMessage(datas);
    };
    /** 销毁子进程 */
    FLWechatMiniGame.destroyWorker = function () {
        if (!FLWechatMiniGame.worker) {
            return;
        }
        try {
            FLWechatMiniGame.worker.terminate();
        }
        catch (error) { }
        FLWechatMiniGame.worker = null;
    };
    // ============================================
    // 微信界面相关
    // ============================================
    /**
     * 显示微信模态弹窗
     * @param title 标题
     * @param content 内容
     * @param isShowCancel 是否显示取消
     * @param callback 回调，第一个参数err表示用户点击取消按钮，第二个参数res表示用户点击确定按钮
     * @param confirmText 确定按钮文案
     * @param cancelText 取消按钮文案
     */
    FLWechatMiniGame.showDialog = function (title, content, isShowCancel, callback, confirmText, cancelText) {
        if (isShowCancel === void 0) { isShowCancel = true; }
        if (confirmText === void 0) { confirmText = '确定'; }
        if (cancelText === void 0) { cancelText = '取消'; }
        wx.showModal({
            title: title,
            content: content,
            showCancel: isShowCancel,
            confirmText: confirmText,
            cancelText: cancelText,
            success: function (res) {
                if (res.confirm) {
                    if (callback) {
                        callback(undefined, { msg: '用户点击确定' });
                    }
                }
                else if (res.cancel) {
                    if (callback) {
                        callback({ msg: '用户点击取消' });
                    }
                }
            }
        });
    };
    /**
     * 显示微信吐司提示
     * @param title 标题
     * @param duration 显示时间(秒)
     */
    FLWechatMiniGame.showToast = function (title, duration) {
        if (duration === void 0) { duration = 1.5; }
        duration *= 1000;
        wx.showToast({
            title: title,
            icon: 'none',
            duration: duration
        });
    };
    /**
     * 进入客服会话，要求在用户发生过至少一次 touch 事件后才能调用。
     *
     * 详询（https://developers.weixin.qq.com/minigame/dev/document/open-api/customer-message/wx.openCustomerServiceConversation.html）
     *
     * @param isShowMsgCard 是否显示会话卡片
     * @param msgTile 卡片标题
     * @param msgPath 卡片消息路径
     * @param msgImg 卡片图片
     * @param callback 回调函数
     */
    FLWechatMiniGame.openCustomerServiceConversation = function (isShowMsgCard, msgTile, msgPath, msgImg, callback) {
        if (isShowMsgCard === void 0) { isShowMsgCard = false; }
        if (msgTile === void 0) { msgTile = ''; }
        if (msgPath === void 0) { msgPath = ''; }
        if (msgImg === void 0) { msgImg = ''; }
        wx.openCustomerServiceConversation({
            sessionFrom: '',
            showMessageCard: isShowMsgCard,
            sendMessageTitle: msgTile,
            sendMessagePath: msgPath,
            sendMessageImg: msgImg,
            success: function (res) {
                if (callback) {
                    callback(undefined, res);
                }
            },
            fail: function (err) {
                if (callback) {
                    callback(err);
                }
            },
            complete: function () { }
        });
    };
    /**
     * 创建游戏圈按钮（即将废弃，做成组件绑定形式）
     *
     * https://developers.weixin.qq.com/minigame/dev/document/open-api/game-club/wx.createGameClubButton.html
     *
     * @param icon 图标类型
     * @param left 左上角横坐标
     * @param top 左上角纵坐标
     * @param width 宽度
     * @param height 高度
     */
    FLWechatMiniGame.createGameClubButton = function (icon, left, top, width, height) {
        if (icon === void 0) { icon = 'green'; }
        if (left === void 0) { left = 10; }
        if (top === void 0) { top = 10; }
        if (width === void 0) { width = 40; }
        if (height === void 0) { height = 40; }
        if (FLWechatMiniGame.btnGameClub) {
            return FLWechatMiniGame.btnGameClub;
        }
        var button = wx.createGameClubButton({
            icon: icon,
            style: { left: left, top: top, width: width, height: height }
        });
        FLWechatMiniGame.btnGameClub = button;
        button.show();
        return button;
    };
    // ============================================
    // Cocos和微信小游戏转换相关
    // ============================================
    // ============================================
    // 渠道导量相关
    // ============================================
    /**
     * 是否根据场景值隐藏UI
     */
    FLWechatMiniGame.isHideUIByWXSceneTag = function () {
        // 服务端屏蔽
        if (window.reviewSwitch === 1 || window.eReviewSwitch === 1) {
            return true;
        }
        // 根据场景值屏蔽
        // if ((window as any).wx && GameConfig.serverConfig.isEnabledWXSceneHide) {
        //     // 获取启动参数
        //     const launchOptions = wx.getLaunchOptionsSync();
        //     const checks = [
        //         1011, // 扫描二维码
        //         1012, // 长按图片识别二维码
        //         1013, // 扫描手机相册中选取的二维码
        //         1017, // 前往小程序体验版的入口页
        //         1019, // 微信钱包（微信客户端7.0.0版本改为支付入口）
        //         1020, // 公众号 profile 页相关小程序列表
        //         1024, // 小程序 profile 页
        //         1025, // 扫描一维码
        //         1030, // 自动化测试下打开小程序
        //         1031, // 长按图片识别一维码
        //         1032, // 扫描手机相册中选取的一维码
        //         1036, // App 分享消息卡片
        //         1047, // 扫描小程序码
        //         1048, // 长按图片识别小程序码
        //         1049, // 扫描手机相册中选取的小程序码
        //         1102, // 公众号 profile 页服务预览
        //         1129, // 微信爬虫访问
        //     ];
        //     if (checks.indexOf(launchOptions.scene) !== -1) {
        //         return true;
        //     }
        // }
        return false;
    };
    /**
     * 跳转到其它小程序（需要在客户端game.json中配置白名单）
     * @param appId 目标AppID
     * @param path 跳转页面路径
     * @param extraData 参数
     * @param callback 回调
     */
    FLWechatMiniGame.navigateToMiniProgram = function (appId, path, extraData, callback) {
        if (path === void 0) { path = ''; }
        if (extraData === void 0) { extraData = {}; }
        if (!FLDevice_1["default"].isWechatGame()) {
            return;
        }
        wx.navigateToMiniProgram({
            appId: appId,
            path: path,
            extraData: extraData,
            // envVersion: 'develop',
            success: function (res) {
                return callback && callback(undefined, res);
            },
            fail: function (err) {
                return callback && callback(err, undefined);
            }
        });
    };
    /**
     * 下载远程文件并缓存在本地
     * @param item
     * @param callback
     */
    FLWechatMiniGame.loadRemoteCacheFile = function (item, callback) {
        if (!FLDevice_1["default"].isWechatGame()) {
            return Laya.loader.load(item.url, Laya.Handler.create(FLWechatMiniGame, function () {
                if (callback) {
                    var res = Laya.Loader.getRes(item.url);
                    return res ? callback(null, res) : callback({ msg: '未获取到加载的资源', url: item.url, type: item.type });
                }
            }));
        }
        try {
            var fs = wx.getFileSystemManager();
            var localPath = window.FLStore.get("cacheImg_" + item.url, null);
            if (localPath) {
                try {
                    // 断言文件是否存在，不存在会抛出错误
                    fs.accessSync(localPath);
                    // 加载本地缓存文件
                    item.url = localPath;
                    return Laya.loader.load(item.url, Laya.Handler.create(null, function () {
                        if (callback) {
                            var res = Laya.Loader.getRes(item.url);
                            return res ? callback(null, res) : callback({ msg: '未获取到加载的资源', url: item.url, type: item.type });
                        }
                    }));
                }
                catch (error) {
                    // 文件不存在，不做任何处理，进入下载
                }
            }
            wx.downloadFile({
                url: item.url,
                success: function (res) {
                    if (res.statusCode === 200) {
                        var paths = item.url.split('/');
                        var localPath = wx.env.USER_DATA_PATH + '/' + paths[paths.length - 1];
                        fs.saveFileSync(res.tempFilePath, localPath);
                        window.FLStore.set("cacheImg_" + item.url, localPath);
                        item.url = localPath;
                        Laya.loader.load(item.url, Laya.Handler.create(null, function () {
                            if (callback) {
                                var res_1 = Laya.Loader.getRes(item.url);
                                return res_1 ? callback(null, res_1) : callback({ msg: '未获取到加载的资源', url: item.url, type: item.type });
                            }
                        }));
                    }
                },
                fail: function (err) {
                    Laya.loader.load(item.url, Laya.Handler.create(null, function () {
                        if (callback) {
                            var res = Laya.Loader.getRes(item.url);
                            return res ? callback(null, res) : callback({ msg: '未获取到加载的资源', url: item.url, type: item.type });
                        }
                    }));
                }
            });
        }
        catch (error) {
            return Laya.loader.load(item.url, Laya.Handler.create(null, function () {
                if (callback) {
                    var res = Laya.Loader.getRes(item.url);
                    return res ? callback(null, res) : callback({ msg: '未获取到加载的资源', url: item.url, type: item.type });
                }
            }));
        }
    };
    /** 微信小游戏事件名称枚举 */
    FLWechatMiniGame.EEventName = {
        /** 授权成功 */
        SCOPE_SUCCESS: 'SCOPE_SUCCESS',
        /** 授权失败 */
        SCOPE_ERROR: 'SCOPE_ERROR',
        /** 获取用户授权信息成功 */
        GET_SCOPE_SETTING_SUCCESS: 'GET_SCOPE_SETTING_SUCCESS',
        /** 获取用户授权信息失败 */
        GET_SCOPE_SETTING_ERROR: 'GET_SCOPE_SETTING_ERROR',
        /** 游戏被唤醒 */
        WECHAT_MINI_GAME_SHOW: 'WECHAT_MINI_GAME_SHOW',
        /** 游戏挂在后台 */
        WECHAT_MINI_GAME_HIDE: 'WECHAT_MINI_GAME_HIDE',
        /** 游戏关闭 */
        WECHAT_MINI_GAME_CLOSE: 'WECHAT_MINI_GAME_CLOSE',
        /** 游戏拉起分享 */
        WECHAT_MINI_GAME_EMIT_SHARE: 'WECHAT_MINI_GAME_EMIT_SHARE',
        /** 游戏拉起意见反馈 */
        WECHAT_MINI_GAME_FEED_BACK: 'WECHAT_MINI_GAME_FEED_BACK',
        /** 游戏进入关于小程序界面 */
        WECHAT_MINI_GAME_ABOUT: 'WECHAT_MINI_GAME_ABOUT',
        /** 点击banner广告 */
        WECHAT_MINI_GAME_TOUCH_BANNER_AD: 'WECHAT_MINI_GAME_TOUCH_BANNER_AD',
        /** 点击卖量位跳转 */
        WECHAT_MINI_GAME_LAUNCH_MINI_GAME: 'WECHAT_MINI_GAME_LAUNCH_MINI_GAME',
        /** 接收子进程发送的消息事件 */
        WECHAT_MINI_GAME_WORKER_MSG: 'WECHAT_MINI_GAME_WORKER_MSG'
    };
    /** 程序启动参数 */
    FLWechatMiniGame.launchOption = null;
    /** 是否开启震动 */
    FLWechatMiniGame.isEnableVibrate = true;
    /** 游戏圈按钮组件 */
    FLWechatMiniGame.btnGameClub = null;
    /**
     * 子进程对象
     *
     * https://developers.weixin.qq.com/minigame/dev/api/worker/Worker.html
     */
    FLWechatMiniGame.worker = null;
    return FLWechatMiniGame;
}());
exports["default"] = FLWechatMiniGame;
FLDevice_1["default"].isWechatGame() && FLWechatMiniGame.initInWXGame();
