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
        quaternary: "#777777",
        quinary: "black",
        senary: "#555555",
        septary: "#343434",
        octary: "#e88504",
        nonary: "#aaaaaa",
        decary: "#444444",
        eleventhry: "#337733",
      },
      fontFamily: {
        title: ["Poppins", "sans-serif"],
        body: ["Nunito", "sans-serif"],
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
