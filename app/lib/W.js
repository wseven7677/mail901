import loadContext from './load-context'

class W {
    constructor(app) {
        this.app = app;
    }

    get(api, cb) {
        const ctx = loadContext();

        this.app.get(api, (req, res) => {
            ctx.request = req;
            cb(ctx)
            .then(() => {
                res.send(ctx.response);
            });
        });
    }

    post(api, cb) {
        const ctx = loadContext();
        this.app.post(api, (req, res) => {
            ctx.request = req;
            cb(ctx)
            .then(() => {
                res.send(ctx.response);
            });
        });
    }
}

export default W;