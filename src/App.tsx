import React, { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/UI/Header";
import HomePage from "./pages/HomePage";
import NavigationPanel from "./components/UI/NavigationPanel";
import './App.css'
import {useSelector} from "react-redux";
import {IRootState} from "./store";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);

  return (
    <Fragment>
      <Header />
      <main className='main'>
        {isLoggedIn && <NavigationPanel />}
        <div className='page'>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          {/*<Route path='/signup' element={<SignUpPage />} />*/}
          {/*<Route path='/stories/:storyId' element={<StoryPage />} />*/}
          {/*<Route path='/stories' element={<AllStoriesPage />} />*/}
          {/*<Route path='/profile/:userId' element={<ProfilePage />} />*/}
          {/*<Route path='/change-password' element={<ChangePasswordPage />} />*/}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        </div>
      </main>
    </Fragment>
  );
}

export default App;
