import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import SearchFlight from './components/SearchFlight';
import CreateFlight from './components/CreateFlight';
import FlightList from './components/FlightList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpdateFlightForm from './components/UpdateFlight';
import Admin from './components/Admin';
import Login from './components/Login';
import Signup from './components/Signup';
import AuthProvider from './components/AuthProvider';
import WeatherPage from './components/WeatherPage';
import ClaimForm from './components/ClaimForm';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
      <Routes>
  <Route path="/admin" element={<Admin />} />
  <Route path="/admin/create" element={<CreateFlight />} />
  <Route path="/admin/update/:id" element={<UpdateFlightForm />} />
  <Route path="/admin/read" element={<FlightList />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/weather/:city" element={<WeatherPage />} />
  <Route path="/claims/create" element={<ClaimForm />} /> {/* Route for creating a claim */}

</Routes>
</AuthProvider>
    </Router>
    </div>
  );
}

export default App;
