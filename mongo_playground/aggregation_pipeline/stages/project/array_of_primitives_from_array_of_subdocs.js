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
        name: "document",
        users: [
          {
            name: "Mucha-cho",
            age: 20,
          },
          {
            name: "Solomon",
            age: 22,
          },
          {
            name: "Rainbow",
            age: 24,
          },
        ],
      },
    ]);
    const docs = await users
      .aggregate([
        {
          $project: {
            _id: 0,
            name: 1,
            user_names: "$users.name",
          },
        },
      ])
      .toArray();

    console.dir(docs, { depth: 3 });
    // [
    //   {
    //     name: "document",
    //     user_names: ["Mucha-cho", "Solomon", "Rainbow"],
    //   },
    // ];
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
