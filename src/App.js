import React, { useState, lazy, Suspense } from "react";

import "./App.css";
import ScrollToTop from "react-scroll-to-top";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import PacmanLoader from "react-spinners/PacmanLoader";
import Skills from "./components/Skills/Skills";

// Lazy Components Import
// const Skills = lazy(() => import("./components/Skills/Skills"));

const Header = lazy(() => import("./components/Header/Header"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const Myservices = lazy(() => import("./components/Myservices/Myservices"));
const Intreduce = lazy(() => import("./components/Intreduce/Intreduce"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Contact = lazy(() => import("./components/Contact-Me/Contact"));
const Experience = lazy(() => import("./components/Experience/Experience"));
const Footer = lazy(() => import("./components/Footer/Footer"));

export default function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <>
      <Suspense
        fallback={
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <PacmanLoader />
          </div>
        }
      >
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <GlobalStyles />
          <div className="App">
            <Toaster />
            <ScrollToTop smooth />
            <Navbar theme={theme} setTheme={setTheme} />
            <Header theme={theme} />
            <Skills theme={theme} />
            <Intreduce theme={theme} />
            <Myservices theme={theme} />
            <Experience theme={theme} />
            <Projects theme={theme} />
            <Contact theme={theme} />
            <Footer />
          </div>
        </ThemeProvider>
      </Suspense>
    </>
  );
}
