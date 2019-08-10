import assert from 'assert'

class Mail {
    constructor() {
        this.errorHeader = '[mail901 - controller mail - send]';
    }
    send(ctx) {
        const fields = ctx.request.body;

        // 参数存在性验证
        assert(Array.isArray(fields.receivers), `${this.errorHeader} no receivers or not array.`);
        assert(fields.title, `${this.errorHeader} no title.`);
        assert(fields.content, `${this.errorHeader} no content.`);
        
        // 参数内容验证
        const rg = new RegExp('^\\w+@\\w+\\.com$');
        const isVaildEmails = fields.receivers.every(one => {
            return rg.test(one);
        });
        assert(isVaildEmails, `${this.errorHeader} invaild email names.`);

        return ctx.service.mail.send(ctx, fields.receivers, fields.title, fields.content);
    }
}

export default Mail;