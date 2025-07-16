const { MongoClient } = require("mongodb");

async function main(args) {
    const client = new MongoClient(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        await client.connect();
        const db = client.db("form-submission");
        const collection = db.collection("submissions");

        const { name, email, gender } = args;

        if (!name || !email || !gender) {
            return {
                statusCode: 400,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: "Missing name, email, or gender" })
            };
        }

        await collection.insertOne({ name, email, gender });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: `Thank you, ${name} for submitting details.` })
        };
    } catch (err) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Server error: " + err.message })
        };
    } finally {
        await client.close();
    }
}

exports.main = main;
