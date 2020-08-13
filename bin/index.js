/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "sensor_landscape";

// try {wx.aldSendEvent('游戏启动-加载引擎类库-' + ((new Date()).getTime() - window.timeStart));} catch (error) {}
//-----libs-begin-----
loadLib("libs/laya.core.js")
loadLib("libs/laya.ani.js")
loadLib("libs/laya.particle.js")
loadLib("libs/laya.ui.js")
loadLib("libs/laya.d3.js")
loadLib("libs/laya.physics3D.js")
//-----libs-end-------
// try {wx.aldSendEvent('游戏启动-加载游戏代码-' + ((new Date()).getTime() - window.timeStart));} catch (error) {}
loadLib("js/bundle.js");