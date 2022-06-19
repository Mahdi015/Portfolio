import React, { useState } from "react";
import {
  Header,
  Intreduce,
  Navbar,
  Myservices,
  Projects,
  Contact,
  Footer,
  Experience,
} from "./components";
import "./App.css";
import ScrollToTop from "react-scroll-to-top";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes";

export default function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div className="App">
        <Toaster />
        <ScrollToTop smooth />

        <Navbar theme={theme} setTheme={setTheme} />
        <Header theme={theme} />
        <Intreduce theme={theme} />
        <Myservices theme={theme} />
        <Experience theme={theme} />
        <Projects theme={theme} />
        <Contact theme={theme} />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
