// controllers/sendMail.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
        user: 'mishrapranay21@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
    }
});
export async function sendMail (to,subject,html) {
    let info = await transporter.sendMail({
        from: 'mishrapranay21@gmail.com',
        to,
        subject,
        html
    });
    console.log("Message sent: %s", info.messageId);
};

