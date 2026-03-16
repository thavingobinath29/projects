import React, { useState, useEffect } from "react";

function PropertyForm({ addProperty, updateProperty, editing }) {

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    status: "available"
  });

  useEffect(() => {
    if (editing) {
      setForm(editing);
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      updateProperty(form);
    } else {
      addProperty(form);
    }

    setForm({
      title: "",
      location: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      status: "available"
    });
  };

  return (
    <form onSubmit={handleSubmit}>

      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
      <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
      <input name="bedrooms" placeholder="Bedrooms" value={form.bedrooms} onChange={handleChange} />
      <input name="bathrooms" placeholder="Bathrooms" value={form.bathrooms} onChange={handleChange} />

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="available">Available</option>
        <option value="sold">Sold</option>
        <option value="pending">Pending</option>
      </select>

      <button type="submit">
        {editing ? "Update Property" : "Add Property"}
      </button>

    </form>
  );
}

export default PropertyForm;