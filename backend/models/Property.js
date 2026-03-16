const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  status: {
    type: String,
    enum: ["available", "sold", "pending"],
    default: "available"
  }
});

module.exports = mongoose.model("Property", PropertySchema);