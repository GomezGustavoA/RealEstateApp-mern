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
          "scrollbar-color": "#4a4a4a #e0e0e0",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
