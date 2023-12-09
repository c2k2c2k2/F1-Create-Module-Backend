const { MongoClient, ServerApiVersion } = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let dbConnection;

module.exports = {
    connectToServer: async function (callback) {
        try {
            // Connect the client to the server
            await client.connect();

            // Get a reference to the database
            dbConnection = client.db(); // Use the default database from the URI

            // Send a ping to confirm a successful connection (optional)
            const pingResult = await dbConnection.command({ ping: 1 });
            if (pingResult.ok === 1) {
                console.log("Pinged your deployment. You successfully connected to MongoDB!");
            } else {
                console.error("Failed to ping MongoDB.");
            }
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        } finally {
            // Note: We don't close the client here to keep the connection open.
            // Closing the client would terminate the connection.
        }
    },

    getDb: function () {
        return dbConnection;
    },
};