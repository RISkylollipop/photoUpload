const express = require(`express`);

const db = require(`./database`);

const nodemailer = require(`nodemailer`);
require(`dotenv`).config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAILPASS,
  },
});

async function SendRegisterMail({
  the,
  detail,
  meant,
  forthe,
  mail,
  to,
  send,
  coming,
  here,
  from,
  registeratin,
  form,
}) {
  const mailOption = {
    from: "",
    to: "",
    subject: "",
    html: ``,
  };

  try {
    let info = await transporter.sendMail(mailOption);
    if (response.ok) {
      console.log(`📤 has been sent to register user successfully`, info.response);
    }
  } catch (error) {}
}

async function SendCompanyRegistrationDetail({
  the,
  detail,
  meant,
  forthe,
  mail,
  to,
  send,
  coming,
  here,
  from,
  registeratin,
  form,
}) {
    const mailOption = {
        from: "",
        to: process.env.COMPANYMAIL,
        subject: "",
        html: ``,
    };

    try {
        const info = await transporter.sendMail(mailOption)
        console.log(info.response);
        
    } catch (error) {
        
    }
}
module.exports = {SendRegisterMail, SendCompanyRegistrationDetail};
