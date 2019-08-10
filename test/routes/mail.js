import axios from 'axios'

function mail() {
    let receivers = [
        '', // need email address
    ];
    
    axios.post('http://localhost:8111/api/send_mail', {
        receivers,
        title: '测试邮件',
        content: '<h2>你好，你收到了测试邮件</h2><p>这里是邮件的正文。</p>',
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    });
}

export default mail;