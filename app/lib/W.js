class W {
    constructor(app) {
        this.app = app;
        this.ctx = app.ctx;
    }

    get(api, cb) {
        this.app.get(api, (req, res) => {
            this.ctx.request = req;
            cb()
                .then(() => {
                    res.send(this.ctx.response);
                });
        });
    }

    post(api, cb) {
        this.app.post(api, (req, res) => {
            this.ctx.request = req;
            cb()
                .then(() => {
                    res.send(this.ctx.response);
                });
        });
    }
}

export default W;