import React, { useEffect, useState } from "react";
import "./Experience.css";
import { FaGraduationCap } from "react-icons/fa";

import { MdWork } from "react-icons/md";

const Experience = ({ theme }) => {
  const [spanColor, setspanColor] = useState("");
  useEffect(() => {
    {
      theme == "light" ? setspanColor("#7A77B9") : setspanColor("#ababab");
    }
  }, [theme]);
  return (
    <div className="experiencecontainer">
      <div className="experience-header">
        <h2 style={theme == "light" ? { color: "#7A77B9" } : { color: "#fff" }}>
          My<span> Experience</span>
        </h2>
        <div className="sm_border"></div>
      </div>

      <div className="experiencecontent">
        <div
          style={
            theme == "light"
              ? { backgroundColor: "#E3E2DF" }
              : { backgroundColor: "#1f2235" }
          }
          className="experiencecol"
        >
          <div className="line"></div>
          <div className="timeline-container">
            <div className="graduate-icon">
              {" "}
              <FaGraduationCap />
            </div>
            <span style={{ color: spanColor }}>2019/2021</span>
            <h3>Bachelor of Computer Science</h3>
            <span style={{ color: spanColor }}>
              Higher Institute of Computer Science Mahdia
            </span>
          </div>

          <div className="timeline-container">
            <div className="graduate-icon">
              {" "}
              <FaGraduationCap />
            </div>
            <span style={{ color: spanColor }}>2016/2018</span>
            <h3>High School Diploma</h3>
            <span style={{ color: spanColor }}>
              Hedi Soussi Secondary School
            </span>
          </div>

          <div className="timeline-container">
            <div className="graduate-icon">
              {" "}
              <FaGraduationCap />
            </div>
            <span style={{ color: spanColor }}>2014/2016</span>
            <h3>High School</h3>
            <span style={{ color: spanColor }}>
              Mongi Slim School Secondary
            </span>
          </div>
        </div>
        <div
          style={
            theme == "light"
              ? { backgroundColor: "#E3E2DF" }
              : { backgroundColor: "#1f2235" }
          }
          className="experiencecol"
        >
          <div className="line"></div>

          <div className="timeline-container">
            <div className="graduate-icon" style={{ left: "3px" }}>
              {" "}
              <MdWork />
            </div>
            <span style={{ color: spanColor }}>2021/Present</span>
            <h3>HEROI: Frontend Developer</h3>
            <span style={{ color: spanColor }}>
              Working on building and designing B2B platform and CRM dashboard
            </span>
          </div>

          <div className="timeline-container">
            <div className="graduate-icon" style={{ left: "3px" }}>
              {" "}
              <MdWork />
            </div>
            <span style={{ color: spanColor }}>2022</span>
            <h3>Sparks Foundation Internship</h3>
            <span style={{ color: spanColor }}>
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
            <h3 style={{ color: spanColor }}>Graduation Year Internship</h3>
            <span style={{ color: spanColor }}>
              Working on graduation Year project(E-commerce Website)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
