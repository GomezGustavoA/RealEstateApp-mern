import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaBriefcase,
  FaPhoneAlt,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gray-900 text-white p-10 rounded-lg shadow-lg mt-[120px] mx-auto max-w-4xl">
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/mern-estate-53a82.appspot.com/o/17240408870531708352616554-removebg-preview.png?alt=media&token=98de3435-7ee9-4caa-a6f4-aac5e6e21312"
            alt="Gustavo A. Gómez"
            className="h-48 w-48 rounded-full object-cover border-4 border-blue-600 shadow-lg"
          />
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 animate-pulse"></div>
        </div>
        <h2 className="text-4xl font-bold text-blue-500 mt-6">
          Gustavo A. Gómez
        </h2>
        <h3 className="text-2xl font-semibold text-gray-400 mt-2">
          Full Stack Developer
        </h3>
        <p className="text-lg text-gray-300 mt-4 text-center max-w-2xl">
          I am an enthusiastic Full Stack Developer specializing in creating
          dynamic and functional web experiences. My passion for frontend
          development, combined with my ability to handle backend tasks, allows
          me to deliver complete solutions that stand out both in functionality
          and design.
        </p>
        <p className="text-lg text-gray-300 mt-4 text-center max-w-2xl">
          With experience in HTML, CSS, JavaScript, and frameworks like React,
          as well as backend technologies like Node.js and Express.js, I am
          prepared to tackle any challenge in web development.
        </p>
      </div>

      <div className="flex justify-center mt-8 space-x-8">
        <a
          href="https://www.linkedin.com/in/gomezgustavoa/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-300 text-3xl transition"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/GomezGustavoA"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-300 text-3xl transition"
        >
          <FaGithub />
        </a>

        <a
          href="https://my-portfolio-alpha-ivory.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-300 text-3xl transition"
        >
          <FaBriefcase />
        </a>
      </div>
    </div>
  );
};

export default About;
