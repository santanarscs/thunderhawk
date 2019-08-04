const nodemailer = require("nodemailer");
const exphbs = require("express-handlebars");
const nodemailerhbs = require("nodemailer-express-handlebars");
const mailConfig = require("../config/mail");

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;
    this.transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: 2525,
      secure: false,
      auth: {
        user: mailConfig.auth.user,
        pass: mailConfig.auth.pass
      }
    });
    // this.configureTemplates();
  }
  // configureTemplates() {
  //   const viewPath = resolve(__dirname, "..", "app", "views", "emails");
  //   this.transporter.use(
  //     "compile",
  //     nodemailerhbs({
  //       viewEngine: exphbs.create({
  //         layoutsDir: resolve(viewPath, "layouts"),
  //         partialsDir: resolve(viewPath, "partials"),
  //         defaultLayout: "default",
  //         extname: ".hbs"
  //       }),
  //       viewPath,
  //       extName: ".hbs"
  //     })
  //   );
  // }
  sendMail(message) {
    console.log({
      ...mailConfig.default,
      ...message
    });
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message
    });
  }
}

module.exports = new Mail();
