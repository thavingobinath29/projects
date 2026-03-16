import React, { useState, useEffect } from "react";
import API from "../api/propertyApi";
import PropertyForm from "./PropertyForm";
import SearchBar from "./SearchBar";

function PropertyList() {

  const [properties, setProperties] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const res = await API.get("/");
    setProperties(res.data);
  };

  const addProperty = async (property) => {
    await API.post("/", property);
    fetchProperties();
  };

  const updateProperty = async (property) => {
    await API.put(`/${property._id}`, property);
    setEditing(null);
    fetchProperties();
  };

  const deleteProperty = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/${id}`);
      fetchProperties();
    }
  };

  const filtered = properties.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <PropertyForm
        addProperty={addProperty}
        updateProperty={updateProperty}
        editing={editing}
      />

      <SearchBar search={search} setSearch={setSearch} />

      <table border="1">

        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Price</th>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filtered.map((p) => (

            <tr key={p._id}>

              <td>{p.title}</td>
              <td>{p.location}</td>
              <td>{p.price}</td>
              <td>{p.bedrooms}</td>
              <td>{p.bathrooms}</td>
              <td>{p.status}</td>

              <td>

                <button onClick={() => setEditing(p)}>
                  Edit
                </button>

                <button onClick={() => deleteProperty(p._id)}>
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default PropertyList;