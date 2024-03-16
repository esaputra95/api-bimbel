import { Request, Response } from "express"
import * as nodemailer from "nodemailer";

const sendEmail = (req:Request, res:Response) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ekosaputra.t.i@gmail.com",
                pass: "bxdn pgau khtb juig",
            },
        });
          // Define the email options
        const mailOptions: nodemailer.SendMailOptions = {
            from: "ekosaputra.t.i@gmail.com",
            to: "usihariyati@gmail.com",
            subject: "Subject of the email",
            text: "Body of the email",
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        });
    } catch (error) {
        
    }
}

export { sendEmail }