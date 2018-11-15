const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_GMAIL',
    pass: 'YOUR_PASSW'
  }
});

const mailOptions = {
  from: 'YOUR_GMAIL',
  to: 'HIS_MAIL',
  subject: 'Sending email using Node.js',
  text: 'That was easy!:)'
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Email sent: ${info.response}`);
  }
})