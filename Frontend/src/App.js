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
import BarbersPage from './pages/UsersPages/BarbersPages/BarbersPage'
import ExceptionPage from './pages/ExceptionPage';
import Footer from './components/navigation/Footer';
import NotFound from './pages/NotFoundPage';
import PrivateRoutes from './components/auth/PrivateRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route element={<PrivateRoutes />}>
            <Route path={"/me"} element={<UserPage />} />
          </Route>
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/users"} >
            <Route path={"barbers"} element={<BarbersPage />} />
            <Route path={"barbers/:username"} element={<ProfilePage />} />
          </Route>
          <Route path={"/exception"} element={<ExceptionPage />} />
          <Route path={"/404"} element={<NotFound />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
