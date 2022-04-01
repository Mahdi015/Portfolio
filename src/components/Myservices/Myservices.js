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
              <div>
                <h4>web development</h4>
              </div>
              <div className="span-container">
                {" "}
                <span>
                  Creating easy to use, user-friendly ecommerce apps , dynamic
                  websites, and applications with best practices.
                </span>
              </div>
            </div>
            <div className="myservices-card">
              <i class="fas fa-server"></i>
              <div>
                {" "}
                <h4>Market Analysis</h4>
              </div>
              <div className="span-container">
                <span>
                  I create intercative admin dashboard for your business, easy
                  to use,display real-time and performance indicators.
                </span>
              </div>
            </div>
            <div className="myservices-card">
              <i class="fas fa-layer-group"></i>
              <h4>User experience</h4>
              <span>
                I create intercative and fully responsive websites design on
                multiple devices.
              </span>
            </div>
          </div>
        </div>
      </Element>
    </>
  );
};

export default Myservices;
