# mail901

> 基于上下文的简易node业务框架

- 核心业务：发送邮件。

- 启动定时任务。

---

## dev


### quick start

```js
git clone
npm i
mkdir config
cd config
vi config.dafult.js // 创建你自己的配置文件，内容见下文

// back to root
// start your prj:

// METHOD 1:(just for development)
npm i -g babel-cli
npm start

// METHOD 2:(get a built version)
npm run build
node dist/app/index.js

// METHOD 3:(built version stay for long)
npm i -g pm2
npm run build
pm2 start dist/app/index.js --name mail901
```


### config

```js
module.exports = {
    mailAccount: {
        name: 'name',
        user: 'xxxx@qq.com',
        pass: 'xxxx',
    },

    // 订阅者：
    subs: [
        'xxx@xxxx.com',
        'xxx@xxxx.com',
        'xxx@xxxx.com',
        'xxx@xxxx.com',
    ],

    gm: ['xxxx@xxx.com'],
};
```


### script

```js
// back to root

mkdir log

```