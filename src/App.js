import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'; // Импорт dispatch из библиотеки Redux
import Header from './components/Header/Header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UserPage from './components/UserPage/UserPage';
import ContainerTourCatalog from './components/TourCatalog/ContainerTourCatalog';
import SignUp from './components/SignUp/SignUp';
import NewTours from './components/NewTours/NewTours';
import './App.css';
import {getUserClerk} from "../src/redux/user-reducer/user-reducer"
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


if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const secretKey = process.env.CLERK_SECRET_KEY;

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
            <Routes>
              <Route exact path="/" element={<ContainerTourCatalog />} />
              <Route path="user/*" element={<UserPage />} />
              <Route path="signup/" element={<SignUp />} />
              <Route path="newtours/" element={<NewTours />} />
              <Route routing="path" path="profile/" element={<TourustProfile />} />
            </Routes>
          </div>
        </div>
      </div>
    </ClerkProvider>
  );
}

function Welcome({ dispatch }) { // Принимаем dispatch как параметр
  
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const userId = user.id;
      dispatch(getUserClerk(userId)); // Используем dispatch для вызова действия
    }
  }, [user, dispatch]);

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
