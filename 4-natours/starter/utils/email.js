const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // 2) Define the email options
    const mailOptions = {
        from: 'Aditya Prasetyo <hello@aditya.io>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html:
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions); //sendEmail is an async function from nodemailer, and an async function returns a promise so we need to await it
};

module.exports = sendEmail;
