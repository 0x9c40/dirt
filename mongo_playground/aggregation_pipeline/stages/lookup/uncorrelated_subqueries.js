const { MongoClient } = require('mongodb');
const assert = require('assert');

const connection_url = 'mongodb://localhost:27017';

const client = new MongoClient(connection_url, { useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    const database = client.db('myproject');
    const absences = database.collection('absences');
    const holidays = database.collection('holidays');

    await absences.deleteMany();
    await holidays.deleteMany();

    await absences.insertMany([
      {
        _id: 1,
        student: 'Ann Aardvark',
        sickdays: [new Date('2018-05-01'), new Date('2018-08-23')],
      },
      {
        _id: 2,
        student: 'Zoe Zebra',
        sickdays: [new Date('2018-02-01'), new Date('2018-05-23')],
      },
    ]);

    await holidays.insertMany([
      { _id: 1, year: 2018, name: 'New Years', date: new Date('2018-01-01') },
      { _id: 2, year: 2018, name: 'Pi Day', date: new Date('2018-03-14') },
      { _id: 3, year: 2018, name: 'Cream Day', date: new Date('2018-07-15') },
      { _id: 4, year: 2017, name: 'New Years', date: new Date('2017-01-01') },
      { _id: 5, year: 2017, name: 'Ice Day', date: new Date('2017-07-16') },
    ]);

    const docs = await absences
      .aggregate([
        {
          $lookup: {
            from: 'holidays',
            pipeline: [
              { $match: { year: 2018 } },
              { $project: { date: { name: '$name', date: '$date' } } },
              { $replaceRoot: { newRoot: '$date' } },
            ],
            as: 'holidays',
          },
        },
      ])
      .toArray();

    console.dir(docs, { depth: 3 }); // check 'equality_match.txt'
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
