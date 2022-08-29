import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import GuestsPage from "./pages/GuestsPage";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";

const App = () => {
  return (
    <div className="dark bg-black">
      <Navigation />
      <Routes>
        <Route path="/guests" element={<GuestsPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </div>
  );
};

export default App;
