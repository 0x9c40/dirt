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
            name: 1,
            hireable: {
              $cond: {
                if: { $gte: ["$age", 21] },
                then: "$$REMOVE",
                else: true,
              },
            },
          },
        },
        {
          $unset: "_id",
        },
      ])
      .toArray();

    console.dir(docs, { depth: 3 }); // check 'equality_match.txt'
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
