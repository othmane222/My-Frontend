import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
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
import PasswordRecoveryForm from './components/PasswordRecoveryForm';
import CouponApp from './components/CouponApp';
import ReviewForm from './components/ReviewForm';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import PassengerList from './components/PassengerList';
import UserManagement from './components/UserManagement';
import Dashboard from './components/Dashboard';
import ExploreWorld from './components/ExploreWorld';
import UsefulLinks from './components/UsefulLinks';
import { Help } from '@mui/icons-material';
import SearchFlight from './components/SearchFlight';
import { CartProvider } from './components/CartContext';
import PaymentPage from './components/PaymentPage';
import PaymentForm from './components/PaymentForm';
import StripeContainer from './components/StripeContainer';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on initial load
  useEffect(() => {
    const user = localStorage.getItem('user'); // Check if user is logged in
    if (user) {
      setIsLoggedIn(true); // Set login state to true if user exists in localStorage
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <AuthProvider>
        <CartProvider> 
      <Routes>
      <Route
          path="/"
          element={
            <>
              <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              <SearchFlight />
              <ExploreWorld />
              <UsefulLinks />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        /> <Route path="/admin" element={<><Admin /><Footer/></>} />
  <Route path="/admin/create" element={<CreateFlight />} />
  <Route path="/admin/update/:id" element={<UpdateFlightForm />} />
  <Route path="/admin/read" element={<FlightList />} />
  <Route path="/login" element={<><Navbar/><Login /><Footer/></>} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/weather/:city" element={<WeatherPage />} />
  <Route path="/claims/create" element={<ClaimForm />} /> 
  <Route path="/password-recovery" element={<PasswordRecoveryForm />} />
  <Route path="/reviews" element={<><Navbar/><ReviewForm /><Footer/></>} />
  <Route path="/create-reservation" element={<ReservationForm />} />
  <Route path="/reservations" element={<><Navbar/><ReservationList /><Footer/></>} />
  <Route path="/passengers" element={<PassengerList />} />
  <Route path="/users" element={<UserManagement />} />
  <Route path="/reservation/:flightId" element={<><Navbar/><ReservationForm /><Footer/></>} /> {/* Route for reservation with flightId */}
  <Route path="/help" element={<><Navbar/><Help /><Footer/></>} />
  <Route path="/reservation/:flightId/payment" element={<><Navbar/><PaymentPage /><Footer/></>} />
  <Route path="/payment-form" element={<><Navbar/><StripeContainer/><Footer/></>} />
  <Route path="/claims" element={<><Navbar/><ClaimForm/><Footer/></>} />



</Routes>
</CartProvider> 
</AuthProvider>
    </Router>
    </div>
  );
}

export default App;
