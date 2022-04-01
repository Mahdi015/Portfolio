import React from "react";
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

export default function App() {
  return (
    <div className="App">
      <ScrollToTop smooth />

      <Navbar />
      <Header />
      <Intreduce />
      <Myservices />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
