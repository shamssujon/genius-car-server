const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 7100;

// Middlewares
app.use(cors());
app.use(express.json());

app.listen(port, (req, res) => {
    console.log(`Genius car server is running on port: ${port}`);
});

app.get("/", (req, res) => {
    res.send(`Genius car server is running on port: ${port}`);
});
