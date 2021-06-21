import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "francomorales145@gmail.com", // generated ethereal user
        pass: process.env.MAILER, // generated ethereal password
    }
});

transporter.verify()
    .then( () => console.log('Module : Mailer -> Ready'))
    .catch( e => console.error(`Module : Mailer -> Error : ${e}`));