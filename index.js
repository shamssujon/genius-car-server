const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 7100;

require("dotenv").config();

// Middlewares
app.use(cors());
app.use(express.json());

app.listen(port, (req, res) => {
    console.log(`Genius car server is running on port: ${port}`);
});

app.get("/", (req, res) => {
    res.send(`Genius car server is running on port: ${port}`);
});

// Get username password from env file
const userName = process.env.DB_USER_NAME;
const password = process.env.DB_PASSWORD;

// MongoDB
const uri = `mongodb+srv://${userName}:${password}@cluster0.9q7qmdx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const run = async () => {
    try {
        const serviceCollection = client.db("geniusCarDB").collection("services");
        const orderCollection = client.db("geniusCarDB").collection("orders");

        // Load all services from DB
        app.get("/services", async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        // Load a single service from DB
        app.get("/service/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

        // Receive single order from client, send to DB
        app.post("/order", async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        });

        // Load orders from DB
        app.get("/orders", async (req, res) => {
            let query = {};

            // Load user specific orders with email query
            const email = req.query.email;
            if (email) {
                query = { customerEmail: email };
            }

            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders);
        });
    } finally {
    }
};
run().catch(console.dir);
