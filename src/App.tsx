import React, { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/UI/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path='/home' element={<HomePage />} />
        {/*<Route path='/login' element={<LoginPage />} />*/}
        {/*<Route path='/signup' element={<SignUpPage />} />*/}
        {/*<Route path='/stories/:storyId' element={<StoryPage />} />*/}
        {/*<Route path='/stories' element={<AllStoriesPage />} />*/}
        {/*<Route path='/profile/:userId' element={<ProfilePage />} />*/}
        {/*<Route path='/change-password' element={<ChangePasswordPage />} />*/}
      </Routes>
    </Fragment>
  );
}

export default App;
