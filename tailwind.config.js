/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "#2577E3",
        "primary-light": "#4A9CF7",
        "primary-dark": "#1A5FBD",
        accent: "#00C2A0",
        background: "#F5F7FA",
        surface: "#FFFFFF",
        "surface-hover": "#F0F4F8",
        border: "#E8ECF0",
        "border-light": "#F0F2F5",
        "text-primary": "#1A1A2E",
        "text-secondary": "#4A5568",
        "text-muted": "#8B95A5",
        "text-light": "#A0AAB8",
      },
      fontFamily: {
        heading: ['"Inter"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "12px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
      },
      boxShadow: {
        card: "0 2px 12px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 32px rgba(37, 119, 227, 0.12)",
        soft: "0 4px 20px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
