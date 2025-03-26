import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export default function FilialiPage() {
  const [filiali, setFiliali] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [newFiliale, setNewFiliale] = useState({ codice: "", indirizzo: "", citta: "", cap: "" });

  useEffect(() => {
    fetchFiliali();
  }, []);

  const fetchFiliali = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/filiali`);
      setFiliali(response.data);
    } catch (error) {
      console.error("Error fetching filiali:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/filiali/${id}`);
      fetchFiliali();
    } catch (error) {
      console.error("Error deleting filiale:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/filiali/${searchId}`);
      setFiliali([response.data]);
    } catch (error) {
      console.error("Error searching filiale:", error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post(`${API_BASE_URL}/filiali`, newFiliale);
      setNewFiliale({ codice: "", indirizzo: "", città: "", cap: "" });
      fetchFiliali();
    } catch (error) {
      console.error("Error creating filiale:", error);
    }
  };

    const handlePostFiliali = async () => {
      try {
        await axios.post("/exercises/Filiale/upload.json", payload);
        alert("Filiali inviati con successo!");
      } catch (error) {
        console.error("Errore durante il POST degli Filiali:", error);
        alert("Errore durante l'invio degli Filiali.");
      }
    };
  
    const payload = {
      email: "capuzzimatimichele06@gmail.com", 
      data: filiali
    };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Filiali List</h1>
      <input
        type="text"
        placeholder="Search by ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">Search</button>
      <button onClick={fetchFiliali} className="bg-blue-500 text-white px-4 py-2 ml-2">List</button>
      <button onClick={handlePostFiliali} className="bg-yellow-500 text-white px-4 py-2 ml-2">POST</button>
      <ul className="mt-4">
        {filiali.map((filiale) => (
          <li key={filiale.id} className="border p-2 flex justify-between items-center">
            {filiale.codice} - {filiale.indirizzo} - {filiale.città} - {filiale.cap}
            <button onClick={() => handleDelete(filiale.id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-6">Add New Filiale</h2>
      <input type="text" placeholder="Codice" value={newFiliale.codice} onChange={(e) => setNewFiliale({ ...newFiliale, codice: e.target.value })} className="border p-2 mr-2" />
      <input type="text" placeholder="Indirizzo" value={newFiliale.indirizzo} onChange={(e) => setNewFiliale({ ...newFiliale, indirizzo: e.target.value })} className="border p-2 mr-2" />
      <input type="text" placeholder="Città" value={newFiliale.città} onChange={(e) => setNewFiliale({ ...newFiliale, citta: e.target.value })} className="border p-2 mr-2" />
      <input type="text" placeholder="CAP" value={newFiliale.cap} onChange={(e) => setNewFiliale({ ...newFiliale, cap: e.target.value })} className="border p-2 mr-2" />
      <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2">Add</button>
    </div>
  );
}
