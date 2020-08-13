"use strict";
exports.__esModule = true;
var FLStore_1 = require("./FLStore");
/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 *
 * 音频控制模块
 * 曾彬思
 * 徐斌杰
 * 2018-08-10
 */
var FLAudio = /** @class */ (function () {
    function FLAudio() {
    }
    /**
     * 初始化AudioEngine
     */
    FLAudio.initAudioEngine = function () {
        Laya.SoundManager.autoReleaseSound = false;
        try {
            FLAudio.enableMusic(FLStore_1["default"].getBool('enabledMusic', true));
            FLAudio.enableSound(FLStore_1["default"].getBool('enabledEffect', true));
        }
        catch (e) {
            FLAudio.enableMusic(true);
            FLAudio.enableSound(true);
        }
    };
    /**
     * 播放背景音乐
     * @param audioClip 音频剪辑路径
     * @param volume 音频音量
     */
    FLAudio.playMusic = function (audioClip, volume) {
        if (volume === void 0) { volume = 1; }
        if (audioClip === null || audioClip === undefined) {
            return;
        }
        if (audioClip === FLAudio.bgmClip) {
            // if (FLAudio.isEnaledMusic) {
            //     cc.audioEngine.resume(FLAudio.bgmAudioId);
            // } else {
            //     cc.audioEngine.pause(FLAudio.bgmAudioId);
            // }
            return FLAudio.bgmAudioId;
        }
        if (FLAudio.bgmAudioId !== null && FLAudio.bgmAudioId !== undefined) {
            Laya.SoundManager.stopMusic();
        }
        FLAudio.bgmClip = audioClip;
        FLAudio.bgmAudioId = Laya.SoundManager.playMusic(audioClip, 0);
        Laya.SoundManager.setMusicVolume(volume);
        // if (FLAudio.isEnaledMusic) {
        //     cc.audioEngine.resume(FLAudio.bgmAudioId);
        // } else {
        //     cc.audioEngine.pause(FLAudio.bgmAudioId);
        // }
        return FLAudio.bgmAudioId;
    };
    ;
    /**
     * 播放音效
     * @param audioClip 音频剪辑
     * @param isLoop 是否循环播放
     * @param volume 音量
     */
    FLAudio.playSound = function (audioClip, isLoop, volume) {
        if (volume === void 0) { volume = 1; }
        if (audioClip === null || audioClip === undefined || !FLAudio.isEnaledSound) {
            return;
        }
        var id = Laya.loader.getRes(audioClip) || Laya.Loader.getRes(audioClip);
        if (id && id.play) {
            id.volume = volume;
            var audio = {};
            audio.__proto__ = id;
            audio.play(0, isLoop ? 0 : 1);
        }
        else {
            Laya.SoundManager.setSoundVolume(volume);
            id = Laya.SoundManager.playSound(audioClip, isLoop ? 0 : 1);
            FLAudio.soundIds.push(id);
            FLAudio.soundChannelCaches[audioClip] = id;
        }
        return id;
    };
    ;
    /**
     * 动态加载音频剪辑并播放
     * @param audioClipPath 音频剪辑在resources下的路径
     * @param isLoop 是否循环播放
     * @param volume 播放音量，取值区间[0.0, 1.0]，默认为1.0
     */
    // static async playEffect(audioClipPath: string, isLoop?: boolean, volume: number = 1) {
    //     try {
    //         const audio = await FLAudio.loadAudioClip(audioClipPath);
    //         return FLAudio.playSound(audio, isLoop, volume);
    //     } catch (error) {
    //     }
    // }
    /**
     * 通过resources路径播放循环背景音效
     * @param audioPath 音频路径
     * @param volume 音量
     */
    FLAudio.playMusicByPath = function (audioPath, volume, force) {
        if (volume === void 0) { volume = 1; }
        if (force === void 0) { force = false; }
        if (force && audioPath === FLAudio.bgmClip) {
            return;
        }
        FLAudio.bgmClip = audioPath;
        Laya.SoundManager.setMusicVolume(volume);
        FLAudio.bgmAudioId = Laya.SoundManager.playMusic(audioPath, 0);
    };
    /**
     * 通过resources路径播放音效
     * @param audioPath 音频路径
     * @param isLoop 是否循环
     * @param volume 音量
     */
    FLAudio.playSoundByPath = function (audioPath, isLoop, volume) {
        // return FLAudio.playSound(audioPath, isLoop, volume);
        if (volume === void 0) { volume = 1; }
        var innerAudioContext = FLAudio.soundChannelCaches[audioPath];
        if (innerAudioContext) {
            innerAudioContext.volume = volume;
            innerAudioContext.loop = isLoop;
            innerAudioContext.startTime = 0;
            innerAudioContext.play();
            return innerAudioContext;
        }
        if (Laya.Browser.onMiniGame) {
            var innerAudioContext_1 = wx.createInnerAudioContext();
            innerAudioContext_1.autoplay = true;
            innerAudioContext_1.volume = volume;
            innerAudioContext_1.loop = isLoop;
            innerAudioContext_1.startTime = 0;
            innerAudioContext_1.src = audioPath;
            FLAudio.soundChannelCaches[audioPath] = innerAudioContext_1;
            return innerAudioContext_1;
        }
        else {
            Laya.SoundManager.setSoundVolume(volume, audioPath);
            return Laya.SoundManager.playSound(audioPath, isLoop ? 0 : 1);
        }
    };
    /**
     * 动态加载音频资源
     * @param url 音频资源地址
     */
    FLAudio.loadAudioClip = function (url) {
        if (Laya.Browser.onMiniGame) {
            var innerAudioContext = wx.createInnerAudioContext();
            innerAudioContext.autoplay = false;
            innerAudioContext.volume = Laya.SoundManager.soundVolume;
            innerAudioContext.loop = false;
            innerAudioContext.startTime = 0;
            innerAudioContext.src = url;
            FLAudio.soundChannelCaches[url] = innerAudioContext;
        }
        // return new Promise((resolve, reject) => {
        //     if (FLAudio.audioClips[url]) { return resolve(FLAudio.audioClips[url]); }
        //     cc.loader.loadRes(url, cc.AudioClip, (err, res: cc.AudioClip) => {
        //         if (err) {
        //             return reject(err);
        //         }
        //         FLAudio.audioClips[url] = res;
        //         return resolve(res);
        //     });
        // });
    };
    /**
     * 启用/禁用背景音乐
     * @param isEnabled 是否开启背景音乐
     */
    FLAudio.enableMusic = function (isEnabled) {
        FLAudio.isEnaledMusic = isEnabled;
        FLStore_1["default"].setBool('enabledMusic', isEnabled);
        try {
            if (!FLAudio.bgmAudioId === null) {
                return;
            }
            Laya.SoundManager.useAudioMusic = FLAudio.isEnaledMusic;
        }
        catch (e) {
            // throw e;
        }
    };
    /**
     * 启用/禁用音效
     * @param isEnabled 是否启用音效
     */
    FLAudio.enableSound = function (isEnabled) {
        FLAudio.isEnaledSound = isEnabled;
        FLStore_1["default"].setBool('enabledEffect', isEnabled);
        FLAudio.stopAllSounds();
        FLAudio.soundIds = [];
    };
    /** 停止播放背景音乐 */
    FLAudio.stopMusic = function () {
        Laya.SoundManager.stopMusic();
        FLAudio.bgmClip = null;
    };
    /**
     * 停止所有音效
     */
    FLAudio.stopAllSounds = function () {
        if (Laya.Browser.onMiniGame) {
            for (var key in FLAudio.soundChannelCaches) {
                FLAudio.soundChannelCaches[key] && FLAudio.soundChannelCaches[key].stop();
            }
        }
        else {
            Laya.SoundManager.stopAllSound();
        }
    };
    /**
     * 停止音效播放
     */
    FLAudio.stopSound = function (audioId) {
        if (Laya.Browser.onMiniGame) {
            audioId.loop = false;
            audioId.stop();
            console.log('sssssss', audioId);
        }
        else {
            audioId.stop();
        }
    };
    /**
     * 当前正在播放的背景音乐剪辑
     */
    FLAudio.bgmClip = null;
    /**
     * 背景音乐音频id
     */
    FLAudio.bgmAudioId = null;
    /**
     * 是否启用背景音乐
     */
    FLAudio.isEnaledMusic = true;
    /**
     * 是否启用音效
     */
    FLAudio.isEnaledSound = true;
    /**
     * 音效ID
     */
    FLAudio.soundIds = [];
    FLAudio.soundChannelCaches = {};
    return FLAudio;
}());
exports.FLAudio = FLAudio;
