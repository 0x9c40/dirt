const { MongoClient } = require("mongodb");
const assert = require("assert");

const connection_url = "mongodb://localhost:27017";

const client = new MongoClient(connection_url, { useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    const database = client.db("myproject");
    const sales2019q1 = database.collection("sales2019q1");
    const sales2019q2 = database.collection("sales2019q2");
    const sales2019q3 = database.collection("sales2019q3");
    const sales2019q4 = database.collection("sales2019q4");

    await sales2019q1.deleteMany();
    await sales2019q2.deleteMany();
    await sales2019q3.deleteMany();
    await sales2019q4.deleteMany();

    await sales2019q1.insertMany([
      { store: "A", item: "Chocolates", quantity: 150 },
      { store: "B", item: "Chocolates", quantity: 50 },
      { store: "A", item: "Cookies", quantity: 100 },
      { store: "B", item: "Cookies", quantity: 120 },
      { store: "A", item: "Pie", quantity: 10 },
      { store: "B", item: "Pie", quantity: 5 },
    ]);

    await sales2019q2.insertMany([
      { store: "A", item: "Cheese", quantity: 30 },
      { store: "B", item: "Cheese", quantity: 50 },
      { store: "A", item: "Chocolates", quantity: 125 },
      { store: "B", item: "Chocolates", quantity: 150 },
      { store: "A", item: "Cookies", quantity: 200 },
      { store: "B", item: "Cookies", quantity: 100 },
      { store: "B", item: "Nuts", quantity: 100 },
      { store: "A", item: "Pie", quantity: 30 },
      { store: "B", item: "Pie", quantity: 25 },
    ]);

    await sales2019q3.insertMany([
      { store: "A", item: "Cheese", quantity: 50 },
      { store: "B", item: "Cheese", quantity: 20 },
      { store: "A", item: "Chocolates", quantity: 125 },
      { store: "B", item: "Chocolates", quantity: 150 },
      { store: "A", item: "Cookies", quantity: 200 },
      { store: "B", item: "Cookies", quantity: 100 },
      { store: "A", item: "Nuts", quantity: 80 },
      { store: "B", item: "Nuts", quantity: 30 },
      { store: "A", item: "Pie", quantity: 50 },
      { store: "B", item: "Pie", quantity: 75 },
    ]);

    await sales2019q4.insertMany([
      { store: "A", item: "Cheese", quantity: 100 },
      { store: "B", item: "Cheese", quantity: 100 },
      { store: "A", item: "Chocolates", quantity: 200 },
      { store: "B", item: "Chocolates", quantity: 300 },
      { store: "A", item: "Cookies", quantity: 500 },
      { store: "B", item: "Cookies", quantity: 400 },
      { store: "A", item: "Nuts", quantity: 100 },
      { store: "B", item: "Nuts", quantity: 200 },
      { store: "A", item: "Pie", quantity: 100 },
      { store: "B", item: "Pie", quantity: 100 },
    ]);

    const docs = await sales2019q1
      .aggregate([
        { $unionWith: "sales2019q2" },
        { $unionWith: "sales2019q3" },
        { $unionWith: "sales2019q4" },
        { $group: { _id: "$item", total: { $sum: "$quantity" } } },
        { $sort: { total: -1 } },
      ])
      .toArray();

    console.dir(docs, { depth: 3 });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
