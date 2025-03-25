import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AutomezziPage from "./pages/AutomezziPage";
import FilialiPage from "./pages/FilialiPage";

export default function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/automezzi" element={<AutomezziPage />} />
    <Route path="/filiali" element={<FilialiPage />} />
  </Routes>
  );
}

