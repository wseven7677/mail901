import axios from 'axios'
import moment from 'moment'
import schedule from 'node-schedule'
import fs from 'fs'

import { subs, gm } from '../../config/config.default.js'
import { who, things } from './data.js'

// email服务所在：
const host = 'localhost';
const port = '8111';

/**
 * 从数组中随机选择若干个项目返回
 * @param {Array} arr 数组
 * @param {Number} num 选取的个数
 */
function random(arr, num = 1) {
    const list = [...arr];
    const len = list.length;
    let rst = [];
    for(let i = 0; i < num && i < len; ++i) {
        let rn = Math.floor(Math.random() * list.length);
        rst.push(list[rn]);
        list.splice(rn, 1);
    }
    if(num === 1) {
        return rst[0];
    }else {
        return rst;
    }
};

function sendWarningMsg(msg) {
    return axios.post(`http://${host}:${port}/api/send_mail`, {
        receivers: gm,
        title: '[机蓝报警]机蓝日报发送失败',
        content: `
        <h2>机蓝日报发送失败</h2>
        <p>以下是详情：</p>
        <p>${msg}</p>
        `,
    })
    .then(res => '[sendWarningMsg]200 OK.')
    .catch(() => '[sendWarningMsg]errrrrrrror...');
}

function main() {
    const now = moment();
    const wholist = random(who, 6);
    
    const contentItem = wholist.map(one => {
        return `
            <span>${one}在${random(things)}</span>
        `;
    });

    return axios.post(`http://${host}:${port}/api/send_mail`, {
        receivers: subs,
        title: `【机蓝日报】season 1 第${now.format('YYYYMMDD')}期`,
        content: `
            <h2>机蓝日报</h2>
            <p style="font-size: 18px;">
                到发报此时为止，${contentItem.join('，')}。其他人行踪不明。
            </p>
            <br />
            <p>机蓝本文指导老师：${random(who)}</p>
            <p>出刊时间：${now.format('YYYY-MM-DD HH:mm')}</p>
            <hr />
            <p style="font-size: 14px;color: #888;">
                机蓝功能复健进行中。每天会有指导老师指导机蓝完成一篇观察日报，并发送给订阅用户。如果您对收到该邮件有疑问，请联系九口药。想要订阅该日报，请联系十六口药。
            </p>
        `,
    })
    .then(res => {
        const data = res.data;
        if(data.errno !== 0) {
            sendWarningMsg(data.msg);
        }
        console.log(data);
        return data;
    })
    .catch(err => err);
}

function start() {
    console.log('start!');
    const timeFormat = 'YYYYMMDD-HH:mm:ss';

    schedule.scheduleJob('0 12 * * *', d => { // 每天12点发送机蓝日报
        const fireTime = moment(d).format(timeFormat);

        console.log(`开始执行（${fireTime}）：`);

        main().then(info => {
            const endTime = moment().format(timeFormat);

            console.log(`执行完毕。${endTime}`);

            // HACK 为保证log位置正确，请在工程根目录下执行启动--
            fs.writeFileSync('./log/schedule-log.log', `
                [schedule-log]开始${fireTime} - 结束${endTime}
                ${JSON.stringify(info)}
                --- ---
            `, { flag: 'a' });

        });
    });
}

start();
