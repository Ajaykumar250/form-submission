const { MongoClient } = require("mongodb");

async function main(args) {
    const client = new MongoClient(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        await client.connect();
        const db = client.db("form-submission"); // your actual DB name
        const collection = db.collection("submissions");

        const { name, email, gender } = args;

        if (!name || !email || !gender) {
            return { statusCode: 400, body: "Missing name, email, or gender" };
        }

        await collection.insertOne({ name, email, gender });

        return {
            statusCode: 200,
            body: `Thank you, ${name} for submitting details.`
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: "Server error: " + err.message
        };
    } finally {
        await client.close();
    }
}

exports.main = main;
