const { MongoClient } = require("mongodb");

async function main(args) {
    const client = new MongoClient(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        await client.connect();
        const db = client.db("do-coffee"); // use your DB name
        const collection = db.collection("submissions");

        const { name, email } = args;

        if (!name || !email) {
            return { statusCode: 400, body: "Missing name or email" };
        }

        await collection.insertOne({ name, email });

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
