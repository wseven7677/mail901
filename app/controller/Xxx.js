import assert from 'assert'

class Xxx {
    query(ctx) {
        console.log(`here is controller xxx query.`);
        return ctx.service.xxx.query(ctx);
    }
}

export default Xxx;