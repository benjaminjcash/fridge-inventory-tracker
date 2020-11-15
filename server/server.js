const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const itemRoutes = require("./routes/item.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const middleware = require("./middleware/errors.middleware");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

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
    db.close();
});
db.once('open', () => {
    console.log('Connection to Mongo was successful!')
});

// Parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/item", itemRoutes);

app.use(middleware.error404);

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}...`);
});