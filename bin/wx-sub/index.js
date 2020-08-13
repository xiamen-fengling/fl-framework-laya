console.log('load wx-sub');

let isDebug = false;
const canvas = wx.getSharedCanvas();
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";

// 图片缓存
const imgCaches = {};


const showImage = (url, x, y, w, h) => {
    if (imgCaches[url]) {

    } else {
        const img = wx.createImage();
        img.src = url;
        img.onload = () => {
            imgCaches[url] = img;
            ctx.drawImage(img, x, y, w, h);
        }
    }
};

// 显示排行
const onShowRank = (msg) => {
    wx.getPotentialFriendList({
        success: (res) => {
            res = res.list || [];
            res.splice(msg.myRandIndex, 0, {
                nickname: '你',
            });
            console.log('sss', res);
            const offsetY = 70,
                itemH = 100;
            res.map((info, i) => {
                i === msg.myRandIndex || info.avatarUrl && showImage(info.avatarUrl, 120, (offsetY - 50) + itemH * i, 60, 60);

                // 昵称
                ctx.fillStyle = i === msg.myRandIndex ? "#ffffff" : "#000000";
                ctx.textAlign = "center";
                ctx.baseLine = "middle";
                ctx.font = `${msg.nicknameFontSize || 35}px Helvetica`;
                ctx.fillText(info.nickname.length > 8 ? info.nickname.substr(0, 8) + '...' : info.nickname, 350, offsetY + i * itemH);

                // 排行
                if (i > 0) {
                    ctx.fillStyle = i === msg.myRandIndex ? "#ffffff" : "#9e96ef";
                    ctx.textAlign = "center";
                    ctx.baseLine = "middle";
                    ctx.font = `${msg.nicknameFontSize || 50}px Helvetica`;
                    ctx.fillText(`${i + 1}`, 50, offsetY + i * itemH);
                }
            });
        },
        fail: (res) => {},
        complete: (res) => {},
    });
};


console.log('load wx-sub 监听主域消息');
// 监听主域消息
wx.onMessage((msg) => {
    isDebug = !!msg.isDebug;
    isDebug && console.log('onMessage msg:', msg);

    switch (msg.event) {
        case 'SHOW_RANK':
            rankType = 'SHOW_RANK';
            onShowRank(msg);
            break;
        default:
            console.log('主域消息:', msg);
            break;
    }
});