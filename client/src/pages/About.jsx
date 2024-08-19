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
          Soy un desarrollador Full Stack entusiasta, especializado en crear
          experiencias web dinámicas y funcionales. Mi pasión por el desarrollo
          frontend, combinada con mi habilidad para manejar el backend, me
          permite desarrollar soluciones completas que destacan tanto en
          funcionalidad como en diseño.
        </p>
        <p className="text-lg text-gray-300 mt-4 text-center max-w-2xl">
          Con experiencia en HTML, CSS, JavaScript y frameworks como React, así
          como en tecnologías backend como Node.js y Express.js, estoy preparado
          para enfrentar cualquier desafío en el desarrollo web.
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
