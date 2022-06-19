import React from "react";
import ena from "./test.png";
import enanobg from "./enanobg.png";
import Spline from "@splinetool/react-spline";

import "./Header.css";
import Text from "./text";
import { Element } from "react-scroll";

const Header = ({ theme }) => {
  return (
    <>
      <Element id="home" name="home">
        <div className="portfolio-container">
          <div className="portfolio-header">
            <h2
              style={{
                color: "#EA7186",
                fontWeight: 900,
                fontSize: "25px",
                textTransform: "uppercase",
              }}
            >
              Welcome!
            </h2>{" "}
            <br />
            <div className="portfolio-text-translition">
              <Text />
            </div>
            <div>
              {" "}
              <p className="portfolio-header-p">
                I'm a Junior Web Developer.Currently open for joining job or
                intership experience.My expertise is to build interactive
                Websites.
              </p>
            </div>
            <div>
              <ul className="portfolio-social">
                <li>
                  {" "}
                  <a
                    target="_blank"
                    href="https://www.facebook.com/mahdi.feriani.7/"
                  >
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  {" "}
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/feriani-mahdi-996a0521a/"
                  >
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  {" "}
                  <a target="_blank" href="https://github.com/Mahdi015/">
                    <i class="fab fa-github"></i>
                  </a>
                </li>
                <li>
                  {" "}
                  <a
                    target="_blank"
                    href="https://www.instagram.com/mahdiferiani/"
                  >
                    <i class="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  {" "}
                  <a target="_blank" href="https://twitter.com/feriani_mahdi">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="portfolio-header-img">
            <img alt="img" src={enanobg} />
            
          </div> */}

          {/* <Spline
            style={{ marginTop: "-20px", width: "100%" }}
            scene="https://prod.spline.design/JP9IYZ0pGAh2s9AL/scene.splinecode"
          /> */}

          <div className="cotainer3d">
            <Spline
              style={{ marginTop: "-40px", width: "100%" }}
              scene="https://prod.spline.design/YxeN0-Yas1E2CsYI/scene.splinecode"
            />
          </div>
        </div>
      </Element>
    </>
  );
};

export default Header;
