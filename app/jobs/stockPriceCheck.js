import axios from 'axios';
import nodemailer from 'nodemailer';
import User from '/app/(models)/User';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, subject, text) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
}

async function checkStockPrices() {
  const users = await User.find({});

  for (const user of users) {
    for (const ticker of user.watchlist) {
      const response = await axios.get(`/api/stockdata/${ticker.symbol}`);
      const currentPrice = response.data.price;

      const lastPrice = ticker.price[ticker.price.length - 1];
      const percentageChange = ((currentPrice - lastPrice) / lastPrice) * 100;

      if (Math.abs(percentageChange) >= 3) {
        const message = `The price of ${ticker.symbol} has changed by ${percentageChange.toFixed(2)}%. Current price: ${currentPrice}`;
        await sendEmail(user.email, `Significant price change for ${ticker.symbol}`, message);
      }
    }
  }
}

export default checkStockPrices;
