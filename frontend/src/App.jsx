import React from 'react';
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './pages/Login.jsx'
import Card from './pages/Card.jsx'
import Quiz from './pages/Quiz.jsx'
import AddVoca from './pages/addVoca.jsx';
import EditVoca from './pages/editVoca.jsx';
import WordList from './pages/WordList.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/card' element={<Card/>}/>
        <Route path='/quiz' element={<Quiz/>}/>
        <Route path='/addWord' element={<AddVoca/>}/>
        <Route path='/editWord' element={<EditVoca/>}/>
        <Route path='/list' element={<WordList/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
