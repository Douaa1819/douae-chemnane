import axios from 'axios';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

async function sendTelegramMessage(token, chat_id, message) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const res = await axios.post(url, {
      text: message,
      chat_id,
    });
    return res.data.ok;
  } catch (error) {
    console.error('Error sending Telegram message:', error.response?.data || error.message);
    return false;
  }
}

const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${userMessage}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

function getTransporter() {
  if (!process.env.EMAIL_ADDRESS || !process.env.GMAIL_PASSKEY) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSKEY,
    },
  });
}

async function sendEmail(payload, message) {
  const { name, email, message: userMessage } = payload;
  const transporter = getTransporter();

  if (!transporter) {
    return false;
  }

  const mailOptions = {
    from: "Portfolio",
    to: process.env.EMAIL_ADDRESS,
    subject: `New Message From ${name}`,
    text: message,
    html: generateEmailTemplate(name, email, userMessage),
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error while sending email:', error.message);
    return false;
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message: userMessage } = payload;

    if (!name || !email || !userMessage) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields.',
      }, { status: 422 });
    }

    const message = `New message from ${name}\n\nEmail: ${email}\n\nMessage:\n\n${userMessage}\n\n`;
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat_id = process.env.TELEGRAM_CHAT_ID;

    let telegramSuccess = false;
    if (token && chat_id) {
      telegramSuccess = await sendTelegramMessage(token, chat_id, message);
    }

    const emailSuccess = await sendEmail(payload, message);
    const atLeastOneSent = telegramSuccess || emailSuccess;

    if (atLeastOneSent) {
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully.',
      }, { status: 200 });
    }

    return NextResponse.json({
      success: false,
      message: 'Contact service is not configured yet.',
    }, { status: 503 });
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred.',
    }, { status: 500 });
  }
};