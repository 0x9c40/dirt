const { MongoClient } = require("mongodb");
const assert = require("assert");

const connection_url = "mongodb://localhost:27017";

const client = new MongoClient(connection_url, { useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    const database = client.db("myproject");
    const users = database.collection("users");
    const goods = database.collection("goods");

    await users.deleteMany();
    await goods.deleteMany();

    await users.insertMany([
      { name: "Ivan Polischuk", money: 30, discount: 1.5 },
      { name: "Igor Chistikov", money: 100, discount: 1 },
    ]);

    await goods.insertMany([
      { name: "apples", amount: 3, price: 10 },
      { name: "oranges", amount: 4, price: 20 },
      { name: "cucumbers", amount: 8, price: 2 },
    ]);

    const docs = await users
      .aggregate([
        {
          $lookup: {
            from: "goods",
            let: { shopping_ability: { $multiply: ["$money", "$discount"] } },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $gte: [
                      "$$shopping_ability",
                      {
                        $multiply: ["$price", "$amount"],
                      },
                    ],
                  },
                },
              },
              {
                $unset: "_id",
              },
            ],
            as: "can_buy_out",
          },
        },
        {
          $unset: "_id",
        },
      ])
      .toArray();

    console.dir(docs, { depth: 3 }); // check 'join_conditions.txt'
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
