import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <div className="banner">
            <div className="top">
              <h1 className="heading">ABOUT US</h1>
              <p>The only thing we're serious about is food.</p>
            </div>
            <p className="mid">
            Welcome to our restaurant, where every dish is crafted with passion and precision.
            We pride ourselves on offering a diverse menu that blends 
            fresh, locally sourced ingredients with rich flavors from around the world.
            Whether you're here for a casual lunch, a romantic dinner, or a special celebration,
            our inviting atmosphere and attentive service create the perfect dining experience.
            From signature entrees to decadent desserts, every meal is made to delight your senses. 
            Join us for an unforgettable culinary journey that will keep you coming back for more!
            </p>
            <Link to={"/"}>
              Explore Menu{" "}
              <span>
                <HiOutlineArrowRight />
              </span>
            </Link>
          </div>
          <div className="banner">
            <img src="about.png" alt="about" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
