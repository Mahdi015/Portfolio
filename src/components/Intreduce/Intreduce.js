import React from "react";
import { useInView } from "react-intersection-observer";
import "./Intreduce.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import cv from "./CV.pdf";
import { Element } from "react-scroll";
import "react-lazy-load-image-component/src/effects/blur.css";

const Intreduce = ({ theme }) => {
  const [ref1, inView1] = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  const [ref2, inView2] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <>
      <Element id="about" name="about">
        <div className="intreduce-container">
          {
            <div
              ref={ref1}
              className={
                inView1 ? "intreduce-img slide-in-blurred-left" : "displayoff"
              }
            >
              <LazyLoadImage
                effect="blur"
                src={
                  "https://res.cloudinary.com/ds5eqdcxk/image/upload/v1661893169/3dchar_cfepdx.png"
                }
              />
            </div>
          }

          <div
            ref={ref2}
            className={
              inView2 ? "intreduce-text slide-in-blurred-left" : "displayoff"
            }
          >
            <h4>Hello, i Am Mahdi Feriani</h4>
            <p>
              Computer Science student recently got my diploma from the Higher
              Institute of Computer Science of Mahdia, I have experience in
              HTML, CSS, and JavaScript. I am dedicated to building easy-to-use,
              user-friendly E-commerce Apps , dynamic websites, and
              applications.After graduation, I hope to start my first job or
              internship to grow my experience.
            </p>
            <div className="about_details">
              <div className="ct-about">
                <span>Name :</span>Mahdi
              </div>
              <div className="ct-about">
                <span>Age :</span>23
              </div>
              <div className="ct-about">
                <span>Adresse :</span>Tunisia, Sfax
              </div>
              <div className="ct-about">
                <span>Phone Number :</span>(+216) 22 890 202
              </div>
              <div className="ct-about">
                <span>Email :</span>ferianimahdi93@gmail.com
              </div>
            </div>
            <a
              className="cv-btton"
              target="_blank"
              rel="noopener noreferrer"
              href={cv}
            >
              View Cv
            </a>
          </div>
        </div>
      </Element>
    </>
  );
};

export default Intreduce;
