import React from 'react';
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/Login.jsx'
import Card from './pages/Card.jsx'
import Quiz from './pages/Quiz.jsx'
import WordList from './pages/WordList.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Card/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/wordlist' element={<WordList/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
