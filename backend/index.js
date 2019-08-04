const express = require("express");
const cors = require("cors");
const path = require("path");
const format = require("date-fns/format");
const pt = require("date-fns/locale/pt");
const mailConfig = require("./config/mail");
const nodemailer = require("nodemailer");
const exphbs = require("express-handlebars");
const nodemailerhbs = require("nodemailer-express-handlebars");
const app = express();
app.use(express.json());
app.use(cors());

function configureTemplates(transporter) {
  const viewPath = path.resolve(__dirname, "views");
  transporter.use(
    "compile",
    nodemailerhbs({
      viewEngine: exphbs.create({
        layoutsDir: path.resolve(viewPath, "layouts"),
        partialsDir: path.resolve(viewPath, "partials"),
        defaultLayout: "default",
        extname: ".hbs"
      }),
      viewPath,
      extName: ".hbs"
    })
  );
}

app.post("/sendmail", (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    port: 2525,
    secure: false,
    auth: {
      user: mailConfig.auth.user,
      pass: mailConfig.auth.pass
    }
  });
  configureTemplates(transporter);

  const mailOptions = {
    from: req.body.mail,
    to: "emaildoestevao@gmail.com",
    subject: "Contato de orçamento",
    template: "orcamento",
    context: {
      user: `${req.body.name} <${req.body.mail}>`,
      date: format(new Date(), "'Dia' dd 'de' MMMM', às ' H:mm'h' ", {
        locale: pt
      }),
      message: req.body.message
    }
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).json({ error: error });
    } else {
      res.json({ message: "Email enviado shooow!" });
    }
  });
});

app.listen(3000, () => {
  console.log("node run listen port 3000");
});
