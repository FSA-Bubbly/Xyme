// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const cron = require("node-cron");
const {
	models: { User, Pill },
} = require('../db');
const Wallet = require('../db/models/Wallet');

// grab the user
//grab the user wallet
// use nodecron to schedule the text at the user defined time slots

// client.messages
//   .create({
//     body: `Hi User, here are you pills for today`,
//     from: "+14325276394",
//     to: "+18015541353",
//   })
//   .then((message) => console.log(message))
//   .catch((err) => console.log(err));

//   const callCronTask = (user) => {
//     const task = cron.schedule(
//       "0 0 0 * * *",
//       async () => {
//         try {
//           const userPhone = await user.phone
//           const userPills = await user.getPills();
//           userPills.map((pill) => {
//             const updateDosage = pill.wallet
//              updateDosage.update({ dailyDosage: updateDosage.frequencyPerDay });
//             return pill.dataValues;
//           });
//         } catch (error) {
//           next(error);
//         }
//       },
//       {}
//     );
//     task.start();
//   };


