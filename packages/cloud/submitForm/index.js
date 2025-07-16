const { MongoClient } = require("mongodb");

async function main(args) {
  const client = new MongoClient(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    const db = client.db("form-submission"); // ✅ Correct DB name from your connection URL
    const collection = db.collection("submissions");

    const { name, email } = args;

    if (!name || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing name or email" })
      };
    }

    await collection.insertOne({ name, email, submittedAt: new Date() });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Thank you, ${name} for submitting details.`
      })
    };
  } catch (err) {
    console.error("Mongo Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error: " + err.message })
    };
  } finally {
    await client.close();
  }
}

exports.main = main;
