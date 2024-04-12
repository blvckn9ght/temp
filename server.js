import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

// Create a transporter for nodemailer
let transporter = nodemailer.createTransport({
  host: "mail.thenerdbase.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "Frost@thenerdbase.com",
    pass: "FrostKE2099@"
  }
});

// Send an email
function sendStartupEmail() {
  let mailOptions = {
    from: '"Frost" <Frost@thenerdbase.com>', // sender address
    to: "winterblvck@gmail.com", // list of receivers
    subject: "Server Start Up", // Subject line
    text: "Hello,\n\nThe server has just started!", // plain text body
    html: "<b>Hello,</b><br><br>The server has just started!" // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve your index.html as the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Example API endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// Start the server and send an email
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    sendStartupEmail(); // Send an email on server start
});
