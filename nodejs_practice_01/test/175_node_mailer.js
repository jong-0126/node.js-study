const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user: 'jmejin0405@gmail.com',
        pass: 'vzfusrqlmubjlflu',
    },
});

const mailOptions = {
    
    from: 'jmejin0405@gmail.com',
    to: 'jmejin0405@gmail.com',
    subject: 'Hello attachment', 
    html: '<h1>Hello Attachment</h1><a href="http://www.infopub.co.kr">' + 
    '<img src="http://www.infopub.co.kr/pdspool/common/main_top/2016-11-02.jpg"/></p></a>',

    attachments:[
        {
            filename: 'attachment_test.xlsx',
            path: 'attachment_test.xlsx',
        },
    ]
};

transporter.sendMail(mailOptions, (error, info) => {
    if(error){
        console.log(error);
    }else{
        console.log(`Message sent: ${info.response}`);
        console.log(mailOptions.attachments);
    }
    transporter.close();
});