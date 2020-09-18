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
        hobbies: { music: { genre: "Rock" } },
      },
      {
        name: "Igor Bolotov",
        hobbies: { music: { genre: "Techno" }, games: { genre: "MOBA" } },
      },
    ]);
    const docs = await users
      .aggregate([
        {
          $project: {
            _id: 0,
            name: 1,
            contact: { address: 1 },
            "hobbies.music.genre": 1,
            hobbies: { games: { genre: 1 } },
            // hobbies: { "games.genre" : 1 } will cause Exception.
          },
        },
      ])
      .toArray();

    console.dir(docs, { depth: 3 });
    // [
    //   { name: "Ivan Polishuk", age: 1 },
    //   { name: "Igor Bolotov", age: 1 },
    // ];
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
