/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "screen-minus-90": "calc(100vh - 90px)", // Clase personalizada
      },
      scrollbar: {
        thin: {
          "scrollbar-width": "thin",
        },
      },
      theme: {
        extend: {},
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
