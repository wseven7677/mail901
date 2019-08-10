import axios from 'axios'
import moment from 'moment'

import { subs } from '../../config/config.default.js'
import { who, things } from './data.js'

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

function main() {
    const receivers = subs;
    const host = 'localhost';
    const port = '8111';
    const now = moment();
    const wholist = random(who, 5);
    
    const contentItem = wholist.map(one => {
        return `
            <span>${one}在${random(things)}，</span>
        `;
    });

    axios.post(`http://${host}:${port}/api/send_mail`, {
        receivers,
        title: `【机蓝日报】season 1 第${now.format('YYYYMMDD')}期`,
        content: `
            <h2>机蓝日报</h2>
            <p style="font-size: 16px;color: #888;">
                机蓝功能复健进行中。每天会有指导老师指导机蓝完成一篇观察日报，并发送给订阅用户。如果您对收到该邮件有疑问，请联系九口药。以下是机蓝的观察日报：
            </p>
            <p style="font-size: 18px;">
                到发报此时为止，${contentItem}。其他人行踪不明。
            </p>
            <p>机蓝本文指导老师：${random(who)}</p>
            <p>出刊时间：${now.format('YYYY-MM-DD HH:mm')}</p>
        `,
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    });
}

main();
