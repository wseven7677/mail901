import loadContext from './load-context.js'
import W from './W.js'

function start(app) {
    const ctx = loadContext();
    app.ctx = ctx;
    const w = new W(app);

    w.get('/api/xxx', () => {
        return ctx.controller.xxx.query(ctx);
    });

    // w.post('/api/post', () => {
    //     return ctx.controller.xxx.query(ctx);
    // });


}

export default start;