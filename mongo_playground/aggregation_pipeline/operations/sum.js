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
      { _id: 1, name: "dave123", grades: [2, 4, 5, 5] },
      { _id: 2, name: "li", grades: [1, 1, 1, 1] },
      { _id: 3, name: "ahn", grades: [3, 3, "3", [5]] },
    ]);

    const docs = await users
      .aggregate([
        {
          $project: {
            name: 1,
            total: { $sum: "$grades" },
          },
        },
      ])
      .toArray();

    console.dir(docs, { depth: 3 });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
