import { Box, Button, Paper, Stack } from "@mui/material";
import React from "react";
// import DrawerAppBar from "./topBar";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import umat_logo from "../../public/umat_logo.png";

// import Footer from "./footer";

const footerContent = [
  { name: "À propos", url: "/contact" },
  { name: "Contact", url: "/contact" },
  { name: "Mentions légales", url: "#" },
];
export default function AuthLayout({ children }) {
  const router = useRouter();
  const path = router.pathname;
  return (
    <Stack
      flexDirection={"column"}
      sx={{
        minHeight: "100vh",
      }}
    >
      <Box px={2}>
      <Image src={umat_logo} alt="logo" height={60} width={250} />
      </Box>
      <Paper
        sx={{
          flexGrow: 2,
          borderRadius: 0,
          bgcolor: "transparent",
        }}
        elevation={0}
      >
        {children}
      </Paper>
      {/* <Footer /> */}
    </Stack>
  );
}
