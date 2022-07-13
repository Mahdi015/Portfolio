import React, { useEffect } from "react";
import "./Header.css";
import Text from "./text";
import { Element } from "react-scroll";
import ena from "./p1.png";
import react from "./react.png";
import next from "./next.png";
import mongo from "./mongo.png";
import node from "./node.png";
import mui from "./mui.png";
const Header = ({ theme }) => {
  useEffect(() => {
    function carousel() {
      let carouselSlider = document.querySelector(".carousel__slider");
      let list = document.querySelector(".carousel__list");
      let item = document.querySelectorAll(".carousel__item");
      let list2;

      const speed = 0.6;

      const width = list.offsetWidth;
      let x = 0;
      let x2 = width;

      function clone() {
        list2 = list.cloneNode(true);
        carouselSlider.appendChild(list2);
        list2.style.left = `${width}px`;
      }

      function moveFirst() {
        x -= speed;

        if (width >= Math.abs(x)) {
          list.style.left = `${x}px`;
        } else {
          x = width;
        }
      }

      function moveSecond() {
        x2 -= speed;

        if (list2.offsetWidth >= Math.abs(x2)) {
          list2.style.left = `${x2}px`;
        } else {
          x2 = width;
        }
      }

      function hover() {
        clearInterval(a);
        clearInterval(b);
      }

      function unhover() {
        a = setInterval(moveFirst, 10);
        b = setInterval(moveSecond, 10);
      }

      clone();

      let a = setInterval(moveFirst, 10);
      let b = setInterval(moveSecond, 10);

      carouselSlider.addEventListener("mouseenter", hover);
      carouselSlider.addEventListener("mouseleave", unhover);
    }

    carousel();
  }, []);
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

          <div className="portfolio-header-img">
            <img alt="img" src={ena} />
          </div>
        </div>

        <div className="carousel">
          <div className="carousel-fade"></div>
          <div className="carousel__slider">
            <ul className="carousel__list">
              <li className="carousel__item">
                <img src={react} />
              </li>
              <li className="carousel__item">
                <img src={next} />
              </li>
              <li className="carousel__item">
                <img style={{ width: "200px", height: "auto" }} src={mongo} />
              </li>
              <li className="carousel__item">
                <img style={{ width: "150px", height: "auto" }} src={node} />
              </li>
              <li className="carousel__item">
                <img style={{ width: "100px", height: "50px" }} src={mui} />
              </li>
            </ul>
          </div>
        </div>
      </Element>
    </>
  );
};

export default Header;
