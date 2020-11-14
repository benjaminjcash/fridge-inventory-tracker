const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
const app = express();

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fridge-inventory-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on(('error'), (err) => {
    console.error('Unable to connect to Mongo..');
    console.error(err);
    db.db.close();
});
db.once('open', () => {
    console.log('Connection to Mongo was successful!')
});

// Parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get('/api', (req, res) => {
    res.json({ message: "Hello World" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}...`);
});