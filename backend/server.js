const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const propertyRoutes = require("./routes/propertyRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/properties", propertyRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});