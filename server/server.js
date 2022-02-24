const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const itemRoutes = require("./routes/item.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const { error404 } = require("./middleware/errors.middleware");
const PORT = process.env.PORT || 3001;
const dbUrls = require("./config/mongo.config");
const DB_URL = dbUrls.cloud || dbUrls.local;
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
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", function (req, res) {
      res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/product", productRoutes);

app.use(error404);

app.listen(PORT, function() {
    console.log(`Server listening on PORT ${PORT}...`);
});