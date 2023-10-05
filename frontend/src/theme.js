import { Roboto } from "next/font/google";
import { Poppins } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { Lato } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF8300",
    },
    secondary: {
      main: "#000000",
    },
    //   error: {
    //     main: red.A400,
    //   },
    // },
    // text: {
    //   primary: "#171A20",
    //   secondary: "#F8FAFC",
    // },
  },
  typography: {
    fontFamily: lato.style.fontFamily,
  },
});

export default theme;
