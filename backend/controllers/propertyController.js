const Property = require("../models/Property");

// GET all properties
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ADD new property
exports.addProperty = async (req, res) => {
  try {
    const { title, location, price, bedrooms, bathrooms, status } = req.body;

    const newProperty = new Property({
      title,
      location,
      price,
      bedrooms,
      bathrooms,
      status
    });

    await newProperty.save();
    res.send("Property Added");
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE property
exports.updateProperty = async (req, res) => {
  try {
    const id = req.params.id;

    const { title, location, price, bedrooms, bathrooms, status } = req.body;

    await Property.findByIdAndUpdate(id, {
      title,
      location,
      price,
      bedrooms,
      bathrooms,
      status
    });

    res.send("Property Updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE property
exports.deleteProperty = async (req, res) => {
  try {
    const id = req.params.id;

    await Property.findByIdAndDelete(id);

    res.send("Property Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};