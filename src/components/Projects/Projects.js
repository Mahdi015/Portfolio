import React from "react";
import "./Projects.css";
import test from "./1.PNG";
import covid from "./covid-project.PNG";
import ilias from "./ilias.png";
import { Element } from "react-scroll";
import { useInView } from "react-intersection-observer";
const Projects = ({ theme }) => {
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  return (
    <>
      <Element id="projects" name="projects">
        <div className="projects">
          <div className="projects-header">
            <h2
              style={
                theme == "light" ? { color: "#7A77B9" } : { color: "#fff" }
              }
            >
              My<span> Projects</span>
            </h2>
            <div className="sm_border"></div>
          </div>
          {/* <p
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center ",
              fontSize: "11px",
              color: "white",
              fontWeight: "500",
              marginTop: "1rem",
            }}
          >
            Live demo not working on some projects will be fixed soon
          </p> */}
          <div
            ref={ref}
            className={inView ? "project-card-container fade-in" : "displayoff"}
          >
            <div
              style={
                theme == "light"
                  ? { backgroundColor: "#E3E2DF", borderColor: "#7A77B9" }
                  : { backgroundColor: "#1f2235" }
              }
              className="project-card "
            >
              {" "}
              <img src={test} />
              <div className="project-details">
                <p>Pet Adoption Website</p>
              </div>
              <a
                target="_blank"
                href="https://zen-heyrovsky-6f150d.netlify.app"
                className="project-btton"
              >
                Live Demo
              </a>
            </div>
            <div
              style={
                theme == "light"
                  ? { backgroundColor: "#E3E2DF", borderColor: "#7A77B9" }
                  : { backgroundColor: "#1f2235" }
              }
              className="project-card"
            >
              <img src={covid} />
              <div className="project-details">
                <p>COVID-19 Dashboard</p>
              </div>
              <a
                target="_blank"
                href="https://covid19-dashboard-da838.web.app"
                className="project-btton"
              >
                Live Demo
              </a>
            </div>
            <div
              style={
                theme == "light"
                  ? { backgroundColor: "#E3E2DF", borderColor: "#7A77B9" }
                  : { backgroundColor: "#1f2235" }
              }
              className="project-card"
            >
              <img src={ilias} />
              <div className="project-details">
                <p>E-commerce Website</p>
              </div>
              <a
                href="https://inspiring-joliot-f65422.netlify.app"
                target="_blank"
                className="project-btton"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </Element>
    </>
  );
};

export default Projects;
