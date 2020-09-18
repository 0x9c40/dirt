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
        _id: 1,
        name: "dave123",
        favorites: ["chocolate", "cake", "butter", "apples"],
      },
      { _id: 2, name: "li", favorites: ["apples", "pudding", "pie"] },
      {
        _id: 3,
        name: "ahn",
        favorites: ["pears", "pecans", "chocolate", "cherries"],
      },
      { _id: 4, name: "ty", favorites: ["ice cream"] },
    ]);

    const docs = await users
      .aggregate([
        {
          $project: {
            name: 1,
            first: { $arrayElemAt: ["$favorites", 0] },
            last: { $arrayElemAt: ["$favorites", -1] },
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
