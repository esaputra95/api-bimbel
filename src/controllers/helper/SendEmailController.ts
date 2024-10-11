import { Request, Response } from "express"
import * as nodemailer from "nodemailer";

const sendEmail = async (email:string, code:string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "ekosaputra.t.i@gmail.com",
                pass: "eqth ktax wxoa suei",
            },
        });
        let body:string = ''
        body=`<body>
        <p>Reset Password berhasil! ini Password Kamu yang baru ${code}</p>
        </body>`
        const mailOptions: nodemailer.SendMailOptions = {
            from: "ekosaputra.t.i@gmail.com",
            to: email,
            subject: "Verifikasi Akun KASIR Q",
            text: ``,
            html: body,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        });
    } catch (error) {
        console.log({error});
        
    }
}

export { sendEmail }