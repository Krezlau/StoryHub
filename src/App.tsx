import React, { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavigationPanel from "./components/UI/NavigationPanel";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import AllStoriesPage from "./pages/AllStoriesPage";

function App() {
  return (
    <Fragment>
      <NavigationPanel />
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          {/*<Route path='/signup' element={<SignUpPage />} />*/}
          {/*<Route path='/stories/:storyId' element={<StoryPage />} />*/}
          <Route path="/stories" element={<AllStoriesPage />} />
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
