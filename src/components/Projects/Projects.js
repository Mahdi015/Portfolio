import React from "react";
import "./Projects.css";
import test from "./1.PNG";
import noimg from "./noimg.png";
import covid from "./covid-project.PNG";
import { Element } from "react-scroll";
import { useInView } from "react-intersection-observer";
const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  return (
    <>
      <Element id="projects" name="projects">
        <div className="projects">
          <div className="projects-header">
            <h2>
              My<span> Projects</span>
            </h2>
            <div className="sm_border"></div>
          </div>
          <p
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
          </p>
          <div
            ref={ref}
            className={inView ? "project-card-container fade-in" : "displayoff"}
          >
            <div className="project-card ">
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
            <div className="project-card">
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
            <div className="project-card">
              <img src={noimg} />
              <div className="project-details">
                <p>E-commerce Website</p>
              </div>
              <a href="#" className="project-btton">
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
