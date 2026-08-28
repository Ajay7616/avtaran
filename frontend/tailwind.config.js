/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      screens: {
        tab: { max: "960px" },
        mob: { max: "720px" },
      },

      colors: {
        teal: {
          900: "#214C5F",
          800: "#214C5F",
          700: "#2A6076",
          500: "#367B94",
        },

        slate: {
          DEFAULT: "#5C8299",
        },

        gold: {
          1: "#D4A017",
          2: "#F2C94C",
          deep: "#B8860B",
        },

        cream: {
          DEFAULT: "#FDFEFF",
          2: "#F4F8FA",
        },

        ink: "#214C5F",
        muted: "#5A7079",
        line: "rgba(33,76,95,0.14)",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Fraunces", "serif"],
      },

      backgroundImage: {
        "grad-gold":
          "linear-gradient(135deg,#B8860B 0%,#D4A017 45%,#F2C94C 100%)",

        "grad-teal": "linear-gradient(150deg,#0E4D66 0%,#0B2E3D 100%)",

        "grad-hero":
          "linear-gradient(165deg,#FFFFFF 0%,#FDFEFF 55%,#F4F8FA 100%)",

        "grad-cta": "linear-gradient(120deg,#B8860B,#D4A017 60%,#F2C94C)",

        "grad-ic-teal": "linear-gradient(150deg,#0E4D66,#0B2E3D)",

        "grad-ic-slate": "linear-gradient(150deg,#6A93A8,#4E7488)",

        "grad-ic-gold": "linear-gradient(150deg,#E0B534,#C69214)",

        "grad-text-gold": "linear-gradient(120deg,#B8860B,#D4A017)",

        "grid-pattern":
          "linear-gradient(rgba(18,60,74,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(18,60,74,.05) 1px,transparent 1px)",
      },

      boxShadow: {
        "brand-sm":
          "0 1px 3px rgba(11,46,61,.08),0 8px 24px rgba(11,46,61,.07)",

        "brand-md": "0 12px 44px rgba(11,46,61,.16)",
      },

      borderRadius: {
        brand: "14px",
      },

      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        6.5: "1.625rem",
        7.5: "1.875rem",
        13: "3.25rem",
      },

      keyframes: {
        "fade-in": {
          from: {
            opacity: 0,
            transform: "translateY(10px)",
          },
          to: {
            opacity: 1,
            transform: "none",
          },
        },

        "marquee-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
      },

      animation: {
        "fade-in": "fade-in .4s ease",

        "marquee-left": "marquee-left 120s linear infinite",
  "marquee-right": "marquee-right 120s linear infinite",
      },
    },
  },
  plugins: [],
};
