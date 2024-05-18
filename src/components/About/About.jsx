import React from "react";
import carPng from "../../assets/car1.png";

function About() {
  return (
    <div className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300 dark:text-white text-black">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={carPng}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                About US
              </h1>
              <p data-aos="fade-up">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                voluptatibus, reiciendis sunt modi veritatis velit enim, vitae
                illum corporis inventore similique ullam perspiciatis,
                laboriosam assumenda accusamus ratione laudantium cumque sed?
              </p>
              <p data-aos="fade-up">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius
                ratione nihil quis repellendus ipsum incidunt vitae ipsa,
                delectus, labore fugiat perspiciatis animi. Vitae nemo autem
                quibusdam aliquam corrupti! Facere, quo.
              </p>
              <button data-aos="fade-up" className="button-outline">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
