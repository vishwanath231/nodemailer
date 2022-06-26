import express from 'express';
import nodemailer from 'nodemailer';

const app = express();


app.post('/', (req, res) => {

    const sample = {
        name: 'vishwanath',
        email: 'vishwanathvishwabai@gmail.com',
        message: 'Job Application',
        company: 'vishwanath',
        phone: '1234567890'
    }

    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>  
            <li>Name: ${sample.name}</li>
            <li>Company: ${sample.company}</li>
            <li>Email: ${sample.email}</li>
            <li>Phone: ${sample.phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${sample.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true, // use SSL // true for 465, false for other ports
        auth: {
            user: 'vishwanathvishwabai@gmail.com', // generated ethereal user
            pass: 'fqepeazarrgoydyy'  // generated ethereal password
        },
        tls:{
            rejectUnAuthorized:true
        }
    
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <vishwanathvishwabai@gmail.com>', // sender address
        to: 'vishwanatharuchunan@gmail.com', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.send({msg:'Email has been sent'});
    });
});

app.listen(3000, () => console.log('Server started...'));