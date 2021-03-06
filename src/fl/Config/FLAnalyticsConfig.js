"use strict";
exports.__esModule = true;
/** 统计事件名称和key（event_id）对照配置 */
exports.FLAKeyConfig = {
    // 流程转化
    '进入首页': 'ENTER_HOME',
    '进入游戏页': 'ENTER_GAME',
    '进入复活页': 'ENTER_REVIVE',
    '进入结算页': 'ENTER_RESULT',
    '进入广告页': 'ENTER_GAME_BOX',
    '进入小程序页': 'ENTER_GAME_LIST',
    // 广告
    '加载banner成功': 'LOAD_AD_BANNER_SUCC',
    '加载banner错误': 'LOAD_AD_BANNER_ERROR',
    '加载banner失败': 'LOAD_AD_BANNER_FAIL',
    '点击banner成功': 'TOUCH_AD_BANNER_SUCC',
    '播放激励视频': 'PLAY_REWARD_VIDEO_AD',
    '观看激励视频成功': 'PLAY_REWARD_VIDEO_AD_SUCC',
    '观看激励视频错误': 'PLAY_REWARD_VIDEO_AD_ERROR',
    '观看激励视频失败': 'PLAY_REWARD_VIDEO_AD_FAIL',
    // 裂变
    '触发分享': 'EMIT_SHARE',
    '分享成功': 'SHARE_SUCC',
    '分享失败': 'SHARE_FAIL',
    // 广告
    '广告页': 'NAV_GAME_BOX_ICON',
    '小程序页': 'NAV_GAME_LIST_ICON',
    '互推墙': 'NAV_BOX_ICON',
    '积分墙': 'NAV_REWARD_ICON',
    '首页_左右两边广告位': 'NAV_LR_ICON_HOME',
    '复活页_左右两边广告位': 'NAV_LR_ICON_REVIVE',
    '结算页_左右两边广告位': 'NAV_LR_ICON_RESULT',
    '首页_猜你喜欢': 'NAV_LIKE_ICON_HOME',
    '游戏页_猜你喜欢': 'NAV_LIKE_ICON_GAME',
    '复活页_猜你喜欢': 'NAV_LIKE_ICON_REVIVE',
    '结算页_猜你喜欢': 'NAV_LIKE_ICON_RESULT',
    '结算页4格面板': 'NAV_RESULT_4_ICON',
    '首页_新品热推': 'NAV_HOT_ICON_HOME',
    '游戏页_新品热推': 'NAV_HOT_ICON_GAME',
    '复活页_新品热推': 'NAV_HOT_ICON_REVIVE',
    '结算页_新品热推': 'NAV_HOT_ICON_RESULT',
    // UI点击
    'UI点击_首页_开始游戏': 'UI_HOME_BTNGAMESTART',
    'UI点击_首页_更多游戏': 'UI_HOME_BTNOTHERSTART',
    'UI点击_首页_按钮': 'UI_HOME_BTNEXITGAME',
    'UI点击_游戏页_重来按钮': 'UI_GAME_BTNRESTART',
    'UI点击_游戏页_返回按钮': 'UI_GAME_BTNBACK',
    'UI点击_游戏页_按钮': 'UI_GAME_BTNEXITGAME',
    'UI点击_结算页_继续游戏按钮': 'UI_RESULT_BTNGAMESTART',
    'UI点击_结算页_返回按钮': 'UI_RESULT_BTNBACK',
    'UI点击_结算页_按钮': 'UI_RESULT_BTNEXITGAME'
};
