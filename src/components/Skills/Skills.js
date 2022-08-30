import React, { useEffect } from "react";
import react from "./react.png";
import next from "./next.png";
import mongo from "./mongo.png";
import node from "./node.png";
import mui from "./mui.png";
function Skills({ theme }) {
  useEffect(() => {
    function carousel() {
      let carouselSlider = document.querySelector(".carousel__slider");
      let list = document.querySelector(".carousel__list");
      let list2;
      const speed = 0.6;
      const width = 1536;
      console.log(width);
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

        if (list2.offsetWidth / 0.5 >= Math.abs(x2)) {
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
    <div className="carousel">
      <div
        style={
          theme != "dark"
            ? { visibility: "hidden", opacity: 0 }
            : { visibility: "visible", opacity: 1 }
        }
        className="carousel-fade"
      ></div>
      <div id="carousel__slider" className="carousel__slider">
        <ul id="carousel__list" className="carousel__list">
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
  );
}

export default Skills;
