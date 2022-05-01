const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path")

const items = require("./routes/music_list/items");

// Works well locally, when deployed on heroku iframes return as blank. Not a fetch problem, not a CRUD problem, not a cors problem? No logs I can diagnose. Works statically and even dynamically if iframe is set, but not when iframe is pulled from database

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
    .connect(db, { useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

// Use Routes
app.use("/music_list/items", items)

// Serve static assets if in production

if(process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    });
}

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log("Server started on port " + port));