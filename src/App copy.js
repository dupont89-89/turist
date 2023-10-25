import React from 'react';
import { useDispatch } from 'react-redux'; // Импорт dispatch из библиотеки Redux
import Header from './components/Header/Header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UserPage from './components/UserPage/UserPage';
import ContainerTourCatalog from './components/TourCatalog/ContainerTourCatalog';
import SignUp from './components/SignUp/SignUp';
import NewTours from './components/NewTours/NewTours';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
  UserProfile,
} from "@clerk/clerk-react";
import TourustProfile from './components/UserProfile/TourustProfile';
import Navbar from './components/Header/Navbar';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';


if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  
  const dispatch = useDispatch(); // Получаем dispatch из Redux
  const navigate = useNavigate();

  return (
    <ClerkProvider navigate={(to) => navigate(to)} publishableKey={clerkPubKey} >
      <SignedIn>
        <Welcome dispatch={dispatch} /> {/* Передаем dispatch как prop */}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <div className="App">
        <div className="headerBackground">
          <div className='wrapperContent'>
            <Header />
            <Navbar />
            <Routes>
              <Route exact path="/" element={<ContainerTourCatalog />} />
              <Route path="user/*" element={<UserPage />} />
              <Route path="signup/" element={<SignUp />} />
              <Route path="newtours/" element={<NewTours />} />
              <Route routing="path" path="profile/*" element={<TourustProfile />} />
              <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
            </Routes>
          </div>
        </div>
      </div>
    </ClerkProvider>
  );
}

function Welcome() { 
  
  const { user } = useUser();

  return (
    <div>
      {user ? (
        <div>Hello you are signed in</div>
      ) : (
        <div>You are not signed in</div>
      )}
    </div>
  );
}

export default App;
