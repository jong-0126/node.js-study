const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'jmejin0405@gmail.com',
        pass: 'vzfusrqlmubjlflu',
    },
});

const mailOptions = {
    from: 'jmejin0405@gmail.com',
    to: 'jmejin0405@gmail.com',
    subject: 'Hello HTML', 
    html: '<h1>Hello HTML</h1><a href="http://www.infopub.co.kr">' + 
    '<img src="http://www.infopub.co.kr/pdspool/common/main_top/2016-11-02.jpg"/></p></a>',
};

transporter.sendMail(mailOptions, (error, info) => {
    if(error){
        console.log(error);
    }else{
        console.log(`Message sent: ${info.response}`);
    }
    transporter.close();
})