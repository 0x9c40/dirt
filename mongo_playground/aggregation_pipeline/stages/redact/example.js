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
        level: 1,
        field_on_level_1: {
          level: 2,
          field_on_level_2: {
            level: 3,
            info: true,
          },
        },
        users: [
          {
            info: "basic",
            level: 2,
          },
        ],
      },
    ]);
    const docs = await users
      .aggregate([
        {
          $redact: {
            $cond: {
              if: { $lt: ["$level", 3] },
              then: "$$DESCEND",
              else: "$$PRUNE",
            },
          },
          // $redact: "$$DESCEND",
        },
        {
          $project: {
            _id: 0,
          },
        },
      ])
      .toArray();

    console.dir(docs, { depth: 5 });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
