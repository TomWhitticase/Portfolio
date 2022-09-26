/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./public/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        secondary: "#509c3d",
        tertiary: "#eeeeee",
        quaternary: "#999999",
        quinary: "black",
        senary: "#555555",
        septary: "#343434",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};

/*



*/
