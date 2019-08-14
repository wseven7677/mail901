import W from './lib/W.js'

function start(app) {
    const w = new W(app);

    w.get('/api/xxx', ctx => {
        return ctx.controller.xxx.query(ctx);
    });

    w.post('/api/send_mail', ctx => {
        return ctx.controller.mail.send(ctx);
    });

}

export default start;