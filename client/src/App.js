import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import React from "react";

import Navbar from "./components/Navbar";
import DashBoard from "./components/DashBoard";
import Workouts from "./components/Workouts";
import Blog from "./components/Blog";
import Tutorial from "./components/Tutorials";
import Contact from "./components/Contact";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          <Container>
            <Navbar currentUser={currentUser} />
            <Routes>
              <Route path="/" exact element={<DashBoard />} />
              <Route path="/workouts" exact element={<Workouts />} />
              <Route path="/tutorials" exact element={<Tutorial />} />
              <Route path="/blogs" exact element={<Blog />} />
              <Route path="/contact" exact element={<Contact />} />
            </Routes>
          </Container>
        ) : (
          <Container>
            <Auth />
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
