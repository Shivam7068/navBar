import React  from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import NavBar from './Component/Navbar';


const App = () => {

  return (
    <>
      <Router>
        <NavBar />

      </Router>
    </>
  )
}

export default App