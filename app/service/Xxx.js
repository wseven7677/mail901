import assert from 'assert'

class Xxx {
    query(ctx) {
        return new Promise(resolve => {
            console.log(`here is service xxx query.`);
            ctx.response = {
                data: 'ok',
                errno: 0,
                msg: 'success',
            };
            resolve();
        });
    }
}

export default Xxx;