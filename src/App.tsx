import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />}/>
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
