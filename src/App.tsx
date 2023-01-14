import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavigationPanel from "./components/UI/NavigationPanel";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import AllStoriesPage from "./pages/AllStoriesPage";
import {useSelector} from "react-redux";
import {IRootState} from "./store";
import NotLoggedInPage from "./pages/NotLoggedInPage";
import StoryPage from "./pages/StoryPage";
import AboutPage from "./pages/AboutPage";
import SignUpPage from "./pages/SignUpPage";
import NewStoryPage from "./pages/NewStoryPage";
import ProfilePage from "./pages/ProfilePage";
import Notification from "./components/UI/Notification";
import {Page} from "./styled/pages/Page";
import GlobalStyles from "./styled/Global";
import {ThemeProvider} from "styled-components";
import {DarkMode, LightMode} from "./styled/Theme";

function App() {
  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn);

  return (
    <ThemeProvider theme={LightMode}>
      <GlobalStyles />
      <NavigationPanel />
      <Page >
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/stories/:storyId' element={isLoggedIn ? <StoryPage /> : <NotLoggedInPage />} />
          <Route path="/stories" element={isLoggedIn ? <AllStoriesPage /> : <NotLoggedInPage />} />
          <Route path='/profile/:userId' element={isLoggedIn ? <ProfilePage /> : <NotLoggedInPage />} />
          <Route path='/profile' element={isLoggedIn ? <NotFoundPage /> : <NotLoggedInPage doNotGoBack={true} /> }/>
          {/*<Route path='/change-password' element={<ChangePasswordPage />} />*/}
          <Route path='/new-story' element={isLoggedIn ? <NewStoryPage /> : <NotLoggedInPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Page>
      <Notification />
    </ThemeProvider>
  );
}

export default App;
