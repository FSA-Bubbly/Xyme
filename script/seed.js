'use strict';

const {
	db,
	models: { Pill, User, Wallet, PillConflict },
} = require('../server/db');

const drugNames = [
	'Acetaminophen',
	'Adderall',
	'Amitriptyline',
	'Amlodipine',
	'Amoxicillin',
	'Ativan',
	'Atorvastatin',
	'Azithromycin',
	'Benzonatate',
	'Brilinta',
	'Bunavail',
	'Buprenorphine',
	'Cephalexin',
	'Ciprofloxacin',
	'Citalopram',
	'Clindamycin',
	'Clonazepam',
	'Cyclobenzaprine',
	'Cymbalta',
	'Doxycycline',
	'Dupixent',
	'Entresto',
	'Entyvio',
	'Farxiga',
	'Fentanyl',
	'Fentanyl',
	'Patch',
	'Gabapentin',
	'Gilenya',
	'Humira',
	'Hydrochlorothiazide',
	'Hydroxychloroquine',
	'Ibuprofen',
	'Imbruvica',
	'Invokana',
	'Januvia',
	'Jardiance',
	'Kevzara',
	'Lexapro',
	'Lisinopril',
	'Lofexidine',
	'Loratadine',
	'Lyrica',
	'Melatonin',
	'Meloxicam',
	'Metformin',
	'Methadone',
	'Methotrexate',
	'Metoprolol',
	'Naloxone',
	'Naltrexone',
	'Naproxen',
	'Omeprazole',
	'Onpattro',
	'Otezla',
	'Ozempic',
	'Pantoprazole',
	'Prednisone',
	'Probuphine',
	'Rybelsus',
	'Sublocade',
	'Tramadol',
	'Trazodone',
	'Viagra',
	'Wellbutrin',
	'Xanax',
	'Zubsolv',
];

const users = [
	{
		email: 'zack@gmail.com',
		password: '123',
		firstName: 'Zack',
		lastName: 'Codeine',
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
		lastName: 'Lullaby',
		age: 30,
		height: 66,
		weight: 120,
	},
	{
		email: 'jordan@gmail.com',
		password: '123',
		firstName: 'Jordan',
		lastName: 'Broderson',
		age: 28,
		height: 60,
		weight: 150,
	},
	{
		email: 'sala@gmail.com',
		password: '123',
		firstName: 'Sala',
		lastName: 'Broderson',
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

	await Promise.all(
		drugNames.map((drugName) =>
			Pill.create({
				name: drugName,
				description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			})
		)
	);

	await Promise.all(users.map((user) => User.create(user)));

	const cody = await User.findByPk(1);
	const lucy = await User.findByPk(2);
	const brody = await User.findByPk(3);
	// console.log(Object.keys(User.prototype));

	const Adderall = await Pill.findByPk(2);
	const Brilinta = await Pill.findByPk(10);
	const Cymbalta = await Pill.findByPk(19);
	const Melatonin = await Pill.findByPk(39);
	const Xanax = await Pill.findByPk(66);

	await cody.addPills([Adderall, Cymbalta]);
	await lucy.addPills([Melatonin, Xanax]);
	await brody.addPills([Brilinta, Adderall]);

	const conflict1 = await PillConflict.create({
		rxcui1: 13,
		rxcui2: 12,
		conflictDescription: 'test',
	});

	await cody.addPillConflict(conflict1);

	console.log(`seeded ${drugNames.length} drugs and ${users.length} users`);
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
