import nodemailer from 'nodemailer'
import { mailAccount } from '../../config/config.default.js'
import fs from 'fs'

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
    
            let info = {};
            try {
                info = await transporter.sendMail({
                    from: `"${mailAccount.name}" <${mailAccount.user}>`,
                    to: receivers.join(','), // list of receivers
                    subject: title,
                    // text: "", // plain text body
                    html: content // html body
                });
            } catch (error) {
                ctx.response = {
                    data: error,
                    msg: '服务器出错',
                    errno: 1001,
                };
                fs.writeFileSync('error.txt', error);
                return resolve();
            }
    
            console.log("Message sent: %s", JSON.stringify(info));
    
            ctx.response = {
                data: {
                    accepted: info.accepted,
                },
                msg: 'success',
                errno: 0,
            };
            resolve();
        });
    }
}

export default Mail;