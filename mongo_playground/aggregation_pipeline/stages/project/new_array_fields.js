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
      {
        name: "Ivan Polishuk",
        age: 21,
        hobbie: "music",
      },
      {
        name: "Igor Bolotov",
        age: 19,
        hobbie: "programming",
      },
    ]);
    const docs = await users
      .aggregate([
        {
          $project: {
            _id: 0,
            name: 1,
            info: ["$age", "$hobbie", "$non_existent_field"],
          },
        },
      ])
      .toArray();

    console.dir(docs, { depth: 3 });
    // [
    //   { name: "Ivan Polishuk", info: [21, "music", null] },
    //   { name: "Igor Bolotov", info: [19, "programming", null] },
    // ];
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
