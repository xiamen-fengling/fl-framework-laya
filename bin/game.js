if ((typeof swan !== 'undefined') && (typeof swanGlobal !== 'undefined')) {
    require("swan-game-adapter.js");
    require("libs/laya.bdmini.js");
} else if (typeof wx !== "undefined") {
    require("weapp-adapter.js");
    require("libs/laya.wxmini.js");
}
window.loadLib = require;
window.timeStart = (new Date()).getTime();

require("./sdk/ald/ald-game.js");
// try {
//     wx.aldSendEvent('游戏启动-引入阿拉丁统计-' + ((new Date()).getTime() - window.timeStart));
// } catch (error) {}
require('./flconsts');

window.reviewSwitch = 1;
const launchOptions = wx.getLaunchOptionsSync() || {};
var url = 'https://game-api.feigo.fun';

// try {
//     wx.aldSendEvent('游戏启动-请求preconfig接口-' + ((new Date()).getTime() - window.timeStart));
// } catch (error) {}
wx.request({
    url: url + '/api/config/pre-config',
    data: {},
    header: {
        scene: launchOptions.scene,
        'client-ver': window.APP_VERSION,
    },
    method: 'GET',
    success: function (res) {
        try {
            // wx.aldSendEvent('游戏启动-请求preconfig成功-' + ((new Date()).getTime() - window.timeStart));
        } catch (error) {}
        if (typeof res.data === 'string') {
            res.data = JSON.parse(res.data);
        }

        window.reviewSwitch = res.data.reviewSwitch === 1 ? 1 : 0;
        window.eReviewSwitch = res.data.eReviewSwitch === 1 ? 1 : 0;
        // window.reviewSwitch ? normalGame() : realGame();
        require("index.js");
    },
    fail: function (err) {
        // try {
        //     wx.aldSendEvent('游戏启动-请求preconfig失败-' + ((new Date()).getTime() - window.timeStart));
        // } catch (error) {}
        console.log(err);
        window.reviewSwitch = 1;
        window.eReviewSwitch = 1;
        // window.reviewSwitch ? normalGame() : realGame();
        require("index.js");
    },
    complete: function () {},
});