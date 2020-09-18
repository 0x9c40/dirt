const { MongoClient } = require("mongodb");
const assert = require("assert");

const connection_url = "mongodb://localhost:27017";

const client = new MongoClient(connection_url, { useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    const database = client.db("myproject");
    const users = database.collection("users");

    await users.deleteMany();

    await users.insertMany([
      { name: "Ivan Polishuk", age: 18 },
      { name: "Igor Bolotov", age: 21 },
    ]);
    const docs = await users
      .aggregate([
        {
          $project: {
            _id: 0,
            name: 1,
            age: {
              $literal: 1,
            },
          },
        },
      ])
      .toArray();

    console.dir(docs, { depth: 3 });
    // [
    //   { name: "Ivan Polishuk", age: 1 },
    //   { name: "Igor Bolotov", age: 1 },
    // ];
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
