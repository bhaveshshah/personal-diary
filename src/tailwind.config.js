/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind scans these files to know which classes you used (so it can generate CSS)
  content: [
    "./index.html",          // scan index.html
    "./src/**/*.{js,jsx}",   // scan all JS/JSX files in src
  ],

  // theme settings (we keep defaults)
  theme: {
    extend: {},
  },

  // enable DaisyUI as a Tailwind plugin
  plugins: [require("daisyui")],

  // optional DaisyUI config
  daisyui: {
    // themes you can use (you can change this)
    themes: ["light", "dark"],
  },
};
