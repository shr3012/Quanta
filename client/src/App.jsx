import React, { useContext, useEffect } from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";

const App = () => {
  const { user, checkTokenExpiry } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      checkTokenExpiry();
    }
  }, [user, checkTokenExpiry]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
