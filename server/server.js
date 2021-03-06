const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const itemRoutes = require("./routes/item.routes");
const commonItemRoutes = require("./routes/commonItem.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const { error404 } = require("./middleware/errors.middleware");
const { hydrateCommonItems } = require("./utils/hydrateDb");
const PORT = process.env.PORT || 3001;
const DB_URL = process.env.__TEST__ ? 'mongodb://localhost/fridge-inventory-tracker-test' : 'mongodb://localhost/fridge-inventory-tracker';
const app = express();
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch((err) => {
    console.error(err);
});

const db = mongoose.connection;
db.on('error', function(err) {
    console.error("Unable to connect to Mongo..");
    console.error(err);
    db.close();
});
db.once('open', function() {
    console.log(`Connection to Mongo was successful!`);
    hydrateCommonItems();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/commonitem", commonItemRoutes);

app.use(error404);

app.listen(PORT, function() {
    console.log(`Server listening on PORT ${PORT}...`);
});
