import './App.css';


import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

// Pages
import HomePage from './pages/HomePage'
import LoginPage from './pages/loginPage';
import Navbar from './components/navigation/Navbar';



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/login"} element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
