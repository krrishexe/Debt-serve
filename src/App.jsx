import { useState } from 'react'
import './App.css'
import Signup from './Components/Signup'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from './Components/Login';
import UserContextProvider from './Context/UserContextProvider.jsx';
import Home from './Components/Home';
import Navbar from './Components/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar />
      <UserContextProvider>
      <Routes>
        <Route exact path="/signup/" key="signup" element={<Signup />} />
        <Route exact path="/login/" key="login" element={<Login />} />
        <Route exact path="/" key="home" element={<Home />} />
      </Routes>
      </UserContextProvider>
    </Router>
  )
}

export default App
