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

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
  <Route path="/admin" element={<Admin />} />
  <Route path="/admin/create" element={<CreateFlight />} />
  <Route path="/admin/update/:id" element={<UpdateFlightForm />} />
  <Route path="/admin/read" element={<FlightList />} />
</Routes>
    </Router>
    </div>
  );
}

export default App;
