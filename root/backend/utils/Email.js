const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class Email {
  constructor(user, url) {
    this.from = "youness.el.mesbahy.7@gmail.com";
    this.to = user.email;
    this.firstName = user.fullName?.split(" ")[0];
    this.url = url;
  }

  // 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
  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async send(template, subject) {
    const emailOptions = {
      from: this.from,
      to: this.to,
      subject,
      url: this.url,
      html: template,
      text: template,
    };

    if (process.env.NODE_ENV === "production") {
      return await sgMail.send(emailOptions);
    }

    return await this.newTransport().sendMail(emailOptions);
  }

  async sendWelcome() {
    await this.send(
      `welcome ${this.firstName}, Enjoy shopping in our shop `,
      "greeting",
    );
  }

  async sendEmailVerificationCode(code) {
    await this.send(
      "verification code is: " +
        code +
        "\nYou have 5min to active your account !!",
      "Email Verification Code",
    );
  }
}

module.exports = Email;
