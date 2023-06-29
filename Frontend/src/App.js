import React from 'react'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

//styleing
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import './App.css';
// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/loginPage';
import Navbar from './components/navigation/Navbar';
import ProfilePage from './pages/UsersPages/Barber/BarberProfilePage'
import UserPage from './pages/UsersPages/UserPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/me"} element={<UserPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/users"} >
            <Route path={"barbers/:username"} element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
