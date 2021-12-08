const { ProcessCredentials } = require('aws-sdk');
var AWS = require('aws-sdk');

const config = new AWS.Config({
	region: 'us-east-2',
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES(config);

module.exports = function sendResetLink(email, id) {
	const params = {
		Destination: {
			ToAddresses: [email],
		},
		Message: {
			Body: {
				Text: {
					Charset: 'UTF-8',
					Data: `To reset your password , click on this link: http://23.20.146.201:8080/reset/${id} `,
				},
			},
			Subject: {
				Charset: 'UTF-8',
				Data: `Xyme, Reset Password `,
			},
		},
		Source: 'Xyme@fungtechs.com',
	};
	ses.sendEmail(params, (err) => {
		if (err) {
			console.log(err);
		}
	});
};
