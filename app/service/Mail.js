import nodemailer from 'nodemailer'
import { mailAccount } from '../../config/config.default.js'

class Mail {
    async send(ctx, receivers, title, content) {
        return new Promise(async resolve => {
            let transporter = nodemailer.createTransport({
                service: 'qq',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: mailAccount.user,
                    pass: mailAccount.pass
                }
            });
    
            let info = await transporter.sendMail({
                from: `"${mailAccount.name}" <${mailAccount.user}>`,
                to: receivers.join(','), // list of receivers
                subject: title,
                // text: "", // plain text body
                html: content // html body
            });
    
            console.log("Message sent: %s", info.messageId);
    
            ctx.response.data = info.messageId;
            resolve();
        });
    }
}

export default Mail;