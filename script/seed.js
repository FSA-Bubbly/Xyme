'use strict';

const {
	db,
	models: { Pill, User, Wallet, Interaction },
} = require('../server/db');

const users = [
	{
		email: 'zack@gmail.com',
		password: '123',
		firstName: 'Zack',
		lastName: 'Ward',
		age: 23,
		height: 72,
		weight: 180,
		imageUrl:
			'https://user-images.githubusercontent.com/12876798/38030875-d3166276-3267-11e8-96d9-309aa8cf008b.png',
	},
	{
		email: 'cj@gmail.com',
		password: '123',
		firstName: 'Cj',
		lastName: 'Fung',
		age: 30,
		height: 66,
		weight: 120,
	},
	{
		email: 'jordan@gmail.com',
		password: '123',
		firstName: 'Jordan',
		lastName: 'Laguio',
		age: 28,
		height: 60,
		weight: 150,
	},
	{
		email: 'sala@gmail.com',
		password: '123',
		firstName: 'Sala',
		lastName: 'Yoshida',
		age: 28,
		height: 60,
		weight: 150,
	},
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
	await db.sync({ force: true }); // clears db and matches models to tables
	console.log('db synced!');

	await Promise.all(users.map((user) => User.create(user)));

	const zack = await User.findByPk(1);
	const cj = await User.findByPk(2);
	const jordan = await User.findByPk(3);
	const sala = await User.findByPk(4);

	console.log(`seeded ${users.length} users`);
	console.log(`seeded successfully`);
	// return {
	//   users: {
	//     cody: users[0],
	//     murphy: users[1]
	//   }
	// }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
	console.log('seeding...');
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log('closing db connection');
		await db.close();
		console.log('db connection closed');
	}
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
