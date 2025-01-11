import { useState } from 'react'
import './App.css'
import Button from './components/common/Button.jsx'
import Login from './pages/login.jsx'
import Home from './pages/Home.jsx'
function App() {
  const [count, setCount] = useState(0)
  const onCount= () =>{
    setCount(count+1);
    console.log(count);
  }
  return (
    <div className='container'>
      <Home/>
    </div>
  )
}

export default App
