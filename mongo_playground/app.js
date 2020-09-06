const { MongoClient } = require("mongodb");
const assert = require("assert");

const connection_url = "mongodb://localhost:27017";

const client = new MongoClient(connection_url, { useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    const database = client.db("myproject");
    const users = database.collection("users");
    const carts = database.collection("carts");

    await users.deleteMany();
    await carts.deleteMany();

    await users.insertMany([
      { name: "Ivan Polishuk", cart_id: 1 },
      { name: "Bane Bolotov", cart_id: 2 },
    ]);

    await carts.insertMany([
      { amount: 6, _id: 1 },
      { amount: 44, _id: 2 },
    ]);

    const docs = await users
      .aggregate([
        {
          $lookup: {
            from: "carts",
            localField: "cart_id",
            foreignField: "_id",
            as: "cart",
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
