import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header/Header";
import Skills from "@/components/Skills/Skills";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import Experience from "@/components/Experience/Experience";
import Projects from "@/components/Projects/Projects";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

export default function HomePage() {
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <main>
        <Header />
        <Skills />
        <About />
        <Services />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
