import React from "react";
import { Container } from "@mui/material";
import Head from "next/head";
import LoginForm from "@/components/forms/login";
import AuthLayout from "@/components/authLayout";

export default function Login() {
  return (
    <>
      <Head>
        <title>Welcome | Login to your account</title>
      </Head>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "transparent",
          minHeight: "89vh",
        }}
      >
        <LoginForm />
      </Container>
    </>
  );
}

Login.getLayout = function (page) {
  return <AuthLayout>{page}</AuthLayout>;
};
