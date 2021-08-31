module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        "3-auto": "auto 1fr auto",
      },
      gridTemplateColumns: {
        border: "repeat(auto-fill, minmax(120px, 1fr))",
      },
    },
    flex: {
      4: "4 4 0%",
    },
    fontFamily: {
      body: ["Comfortaa"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
