import React from "react";
import "./Experience.css";
import { FaGraduationCap } from "react-icons/fa";

import { MdWork } from "react-icons/md";

const Experience = () => {
  return (
    <div className="experiencecontainer">
      <div className="experience-header">
        <h2>
          My<span> Experience</span>
        </h2>
        <div className="sm_border"></div>
      </div>

      <div className="experiencecontent">
        <div className="experiencecol">
          <div className="line"></div>
          <div className="timeline-container">
            <div className="graduate-icon">
              {" "}
              <FaGraduationCap />
            </div>
            <span>2019/2021</span>
            <h3>Bachelor of Computer Science</h3>
            <span>Higher Institute of Computer Science Mahdia</span>
          </div>

          <div className="timeline-container">
            <div className="graduate-icon">
              {" "}
              <FaGraduationCap />
            </div>
            <span>2016/2018</span>
            <h3>High School Diploma</h3>
            <span>Hedi Soussi Secondary School</span>
          </div>

          <div className="timeline-container">
            <div className="graduate-icon">
              {" "}
              <FaGraduationCap />
            </div>
            <span>2014/2016</span>
            <h3>High School</h3>
            <span>Mongi Slim School Secondary</span>
          </div>
        </div>
        <div className="experiencecol">
          <div className="line"></div>

          <div className="timeline-container">
            <div className="graduate-icon" style={{ left: "3px" }}>
              {" "}
              <MdWork />
            </div>
            <span>2021/Present</span>
            <h3>Web Developer Freelancer</h3>
            <span>
              Building e-commerce website,and working on volunteer projects
            </span>
          </div>

          <div className="timeline-container">
            <div className="graduate-icon" style={{ left: "3px" }}>
              {" "}
              <MdWork />
            </div>
            <span>2022</span>
            <h3>Sparks Foundation Internship</h3>
            <span>
              Working on web development tasks and Collaborating with developers
              across the world{" "}
            </span>
          </div>
          <div className="timeline-container">
            <div className="graduate-icon" style={{ left: "3px" }}>
              {" "}
              <MdWork />
            </div>
            <span>2020/2021</span>
            <h3>Graduation Year Internship</h3>
            <span>Working on graduation Year project(E-commerce Website)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
