import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export default function AutomezziPage() {
  const [automezzi, setAutomezzi] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [newAutomezzo, setNewAutomezzo] = useState({ codice: "", targa: "", marca: "", modello: "", filiale_id: "" });

  useEffect(() => {
    fetchAutomezzi();
  }, []);

  const fetchAutomezzi = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/automezzi`);
      setAutomezzi(response.data);
    } catch (error) {
      console.error("Error fetching automezzi:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/automezzi/${id}`);
      fetchAutomezzi();
    } catch (error) {
      console.error("Error deleting automezzo:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/automezzi/${searchId}`);
      setAutomezzi([response.data]);
    } catch (error) {
      console.error("Error searching automezzo:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post(`${API_BASE_URL}/automezzi`, newAutomezzo);
      setNewAutomezzo({ codice: "", targa: "", marca: "", modello: "", filiale_id: "" });
      fetchAutomezzi();
    } catch (error) {
      console.error("Error creating automezzo:", error);
    }
  };

  const handlePostAutomezzi = async () => {
    try {
      await axios.post("/exercises/Automezzo/upload.json", payload);
      alert("Automezzi inviati con successo!");
    } catch (error) {
      console.error("Errore durante il POST degli Automezzi:", error);
      alert("Errore durante l'invio degli Automezzi.");
    }
  };

  const payload = {
    email: "capuzzimatimichele06@gmail.com", 
    data: automezzi
  };
  

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Automezzi List</h1>
      <input
        type="text"
        placeholder="Search by ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">Search</button>
      <button onClick={fetchAutomezzi} className="bg-blue-500 text-white px-4 py-2">List</button>
      <button  onClick={handlePostAutomezzi} className="bg-yellow-500 text-white px-4 py-2 ml-2">POST</button>
      <ul className="mt-4">
        {automezzi.map((auto) => (
          <li key={auto.id} className="border p-2 flex justify-between items-center">
            {auto.codice} - {auto.targa} - {auto.marca} - {auto.modello}
            <button onClick={() => handleDelete(auto.id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-6">Add New Automezzo</h2>
      <input type="text" placeholder="Codice" value={newAutomezzo.codice} onChange={(e) => setNewAutomezzo({ ...newAutomezzo, codice: e.target.value })} className="border p-2 mr-2" />
      <input type="text" placeholder="Targa" value={newAutomezzo.targa} onChange={(e) => setNewAutomezzo({ ...newAutomezzo, targa: e.target.value })} className="border p-2 mr-2" />
      <input type="text" placeholder="Marca" value={newAutomezzo.marca} onChange={(e) => setNewAutomezzo({ ...newAutomezzo, marca: e.target.value })} className="border p-2 mr-2" />
      <input type="text" placeholder="Modello" value={newAutomezzo.modello} onChange={(e) => setNewAutomezzo({ ...newAutomezzo, modello: e.target.value })} className="border p-2 mr-2" />
      <input type="number" placeholder="Filiale ID" value={newAutomezzo.filiale_id} onChange={(e) => setNewAutomezzo({ ...newAutomezzo, filiale_id: e.target.value })} className="border p-2 mr-2" />
      <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2">Add</button>
    </div>
  );
}