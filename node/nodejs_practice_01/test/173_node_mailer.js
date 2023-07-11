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
    subject: 'Hello ', 
    text: 'Hello world?',
};

transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
        console.log(error);
    }else{
        console.log(`Message sent: ${info.response}`);
    }
    transporter.close();
});