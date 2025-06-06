import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage.jsx";
import Quiz from "./pages/QuizPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import Home from "./pages/HomePage.jsx";
import LibraryPage from "./pages/LibraryPage.jsx";
import CardPage from "./pages/CardPage.jsx";
import CardCreatePage from "./pages/CardCreatePage.jsx";
import CardUpdatePage from "./pages/CardUpdatePage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import WordCardPage from "./pages/WordCardPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/user/name/library" element={<LibraryPage />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/newcard" element={<CardCreatePage />} />
        <Route path="/cardupdate" element={<CardUpdatePage />} />
        <Route path="/wordcard" element={<WordCardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
