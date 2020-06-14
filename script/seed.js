'use strict'

const db = require('../server/db')
const {User, Contact, Alert} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      fullName: 'Cody Smith'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      fullName: 'Murphy Slythers'
    })
  ])

  const contact = await Promise.all([
    Contact.create({
      number: '+16035627796',
      contactName: 'Lainey',
      userId: 1,
      message: "Hey Lainey, this is Cody Tester. I'm in jail, please come help!"
    }),
    Contact.create({
      number: '+19785906111',
      contactName: 'Michelle',
      userId: 1,
      message:
        "Hey Michelle, this is Cody Tester. I'm in jail, please come help!"
    }),
    // Contact.create({
    //   number: '+12126040450',
    //   contactName: 'Cynthia',
    //   userId: 1,
    //   message:
    //     "Hey Cynthia, this is Cody Tester. I'm in jail, please come help!"
    // })
  ])

  const alert = await Promise.all([
    Alert.create({
      location: 'precinct 1',
      status: 'pending',
      userId: 1
    })
  ])

  // const alert1 = await Alert.findOne({
  //   where: {
  //     location: 'precinct 1'
  //   }
  // })

  // const contact1 = await Contact.findOne({
  //   where: {
  //     contactName: 'Lainey'
  //   }
  // })

  // const contact2 = await Contact.findOne({
  //   where: {
  //     contactName: 'Michelle'
  //   }
  // })

  // await contact1.addUser("Cody Smith")
  // await contact2.addUser("Cody Smith")
  // await alert1.addUser("Cody Smith")

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${contact.length} contacts`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
