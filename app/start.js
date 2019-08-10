import loadContext from './lib/load-context.js'
import W from './lib/W.js'

function start(app) {
    const ctx = loadContext();
    app.ctx = ctx;
    const w = new W(app);

    w.get('/api/xxx', () => {
        return ctx.controller.xxx.query(ctx);
    });

    w.post('/api/send_mail', () => {
        return ctx.controller.mail.send(ctx);
    });

}

export default start;