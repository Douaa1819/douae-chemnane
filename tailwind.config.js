/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#3B82F6",
          glow: "#60A5FA",
          muted: "#93C5FD",
        },
        surface: {
          dark: "#0A0A0F",
          card: "#11121A",
          border: "#1F2230",
        },
        ink: {
          DEFAULT: "#EDEDED",
          muted: "#A1A1AA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightish: "-0.02em",
      },
      boxShadow: {
        "card-hover":
          "0 24px 48px -12px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(96, 165, 250, 0.08)",
        "glow-sm": "0 0 40px -8px rgba(96, 165, 250, 0.35)",
        "glow-md": "0 0 60px -12px rgba(59, 130, 246, 0.25)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-dark":
          "radial-gradient(ellipse 80% 60% at 50% -30%, rgba(59, 130, 246, 0.22), transparent 55%), radial-gradient(ellipse 60% 50% at 100% 0%, rgba(96, 165, 250, 0.12), transparent 50%), radial-gradient(ellipse 50% 40% at 0% 20%, rgba(59, 130, 246, 0.08), transparent 45%)",
        "mesh-light":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(59, 130, 246, 0.12), transparent 55%), radial-gradient(ellipse 60% 50% at 100% 10%, rgba(96, 165, 250, 0.08), transparent 50%)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
        },
      },
      screens: {
        "4k": "1980px",
      },
    },
  },
  plugins: [],
};
