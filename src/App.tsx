import React, { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavigationPanel from "./components/UI/NavigationPanel";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import AllStoriesPage from "./pages/AllStoriesPage";
import {useSelector} from "react-redux";
import {IRootState} from "./store";
import NotLoggedInPage from "./pages/NotLoggedInPage";
import StoryPage from "./pages/StoryPage";

function App() {
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);

  return (
    <Fragment>
      <NavigationPanel />
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          {/*<Route path='/signup' element={<SignUpPage />} />*/}
          <Route path='/stories/:storyId' element={isLoggedIn ? <StoryPage /> : <NotLoggedInPage />} />
          <Route path="/stories" element={isLoggedIn ? <AllStoriesPage /> : <NotLoggedInPage />} />
          {/*<Route path='/profile/:userId' element={<ProfilePage />} />*/}
          {/*<Route path='/change-password' element={<ChangePasswordPage />} />*/}
          {/*<Route path='/about' element={<AboutPage />} />*/}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;
