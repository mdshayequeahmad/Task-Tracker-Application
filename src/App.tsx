import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import UpdateTaskPage from "./pages/UpdateTaskPage";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/update/:id" element={<UpdateTaskPage />} />
      </Routes>
    </>
  );
};

export default App;
