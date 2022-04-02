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
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="App">
      <Toaster />
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
