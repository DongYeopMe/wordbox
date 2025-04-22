import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage.jsx";
import Card from "./pages/Card.jsx";
import Quiz from "./pages/QuizPage.jsx";
import WordList from "./pages/WordList.jsx";
import Layout from "./components/common/Layout.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import Home from "./pages/HomePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/wordlist" element={<WordList />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
