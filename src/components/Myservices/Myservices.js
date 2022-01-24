import React from "react";
import "./Myservices.css";
import { useInView } from "react-intersection-observer";
import { Element } from "react-scroll";

const Myservices = () => {
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  return (
    <>
      <Element id="services" name="services">
        <div className="myservices">
          <div className="myservices-header">
            <h2>
              My<span> Services</span>
            </h2>
            <div className="sm_border"></div>
          </div>
          <div
            ref={ref}
            className={
              inView ? "myservices-card-container bounce-in-top" : "displayoff"
            }
          >
            <div className="myservices-card ">
              <i class="fas fa-laptop-code"></i>
              <h4>Front-End Deveoloper</h4>
            </div>
            <div className="myservices-card">
              <i class="fas fa-server"></i>
              <h4>Back-End Devoloper</h4>
            </div>
            <div className="myservices-card">
              <i class="fas fa-layer-group"></i>
              <h4>ui ux developer</h4>
            </div>
          </div>
        </div>
      </Element>
    </>
  );
};

export default Myservices;
