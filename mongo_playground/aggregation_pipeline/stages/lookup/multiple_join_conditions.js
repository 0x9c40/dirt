const { MongoClient } = require("mongodb");
const assert = require("assert");

const connection_url = "mongodb://localhost:27017";

const client = new MongoClient(connection_url, { useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    const database = client.db("myproject");
    const orders = database.collection("orders");
    const warehouses = database.collection("warehouses");

    await orders.deleteMany();
    await warehouses.deleteMany();

    await orders.insertMany([
      { _id: 1, item: "almonds", price: 12, ordered: 2 },
      { _id: 2, item: "pecans", price: 20, ordered: 1 },
      { _id: 3, item: "cookies", price: 10, ordered: 60 },
    ]);

    await warehouses.insertMany([
      { _id: 1, stock_item: "almonds", warehouse: "A", instock: 120 },
      { _id: 2, stock_item: "pecans", warehouse: "A", instock: 80 },
      { _id: 3, stock_item: "almonds", warehouse: "B", instock: 60 },
      { _id: 4, stock_item: "cookies", warehouse: "B", instock: 40 },
      { _id: 5, stock_item: "cookies", warehouse: "A", instock: 80 },
    ]);

    const docs = await orders
      .aggregate([
        {
          $lookup: {
            from: "warehouses",
            let: { order_item: "$item", ordered_qty: "$ordered" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$stock_item", "$$order_item"] },
                      { $gte: ["$instock", "$$ordered_qty"] },
                    ],
                  },
                },
              },
              { $project: { stock_item: 0, _id: 0 } },
            ],
            as: "suitable_warehouses",
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
