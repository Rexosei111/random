import React from "react";
import Head from "next/head";
import AuthLayout from "@/components/authLayout";
import RegistrationForm from "@/components/forms/registration";
import { Container } from "@mui/material";

export default function Register() {
  return (
    <>
      <Head>
        <title>Submit details for verification</title>
      </Head>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "89vh",
        }}
      >
        <RegistrationForm />
      </Container>
    </>
  );
}

Register.getLayout = function (page) {
  return <AuthLayout>{page}</AuthLayout>;
};
