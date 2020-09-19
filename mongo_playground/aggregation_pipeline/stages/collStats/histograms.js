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
      .aggregate([{ $collStats: { latencyStats: { histograms: true } } }])
      .toArray();

    console.dir(docs, { depth: 5 });
    const read_info = docs[0].latencyStats.reads;
    const max_total_latency = read_info.histogram.reduce(
      (acc, curr) => acc + curr.micros * curr.count,
      0
    );
    console.log("\n... My misunderstanding of something:");
    console.log({ max_total_latency, latency: read_info.latency });
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
