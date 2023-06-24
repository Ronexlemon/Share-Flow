/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bgbank': "url('../src/assets/defibg.webp')",
       
      }
    },
  },
  plugins: [],
}