import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Powering REST API Dashboard</h1>
      <button onClick={() => navigate("/automezzi")} className="bg-blue-500 text-white px-6 py-3 rounded-xl">
        Manage Automezzi
      </button>
      <button onClick={() => navigate("/filiali")} className="bg-green-500 text-white px-6 py-3 rounded-xl">
        Manage Filiali
      </button>
    </div>
  );
}
