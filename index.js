const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

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
client.connect((err) => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});
