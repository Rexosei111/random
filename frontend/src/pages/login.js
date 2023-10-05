import React from "react";
import { Container } from "@mui/material";
import Head from "next/head";
import AuthLayout from "@/components/authLayout";
import LoginForm from "@/components/forms/login";

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
