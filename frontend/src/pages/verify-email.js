import AuthLayout from "@/components/authLayout";
import { Title } from "@mui/icons-material";
import { Container, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function VerifyEmail() {
  const router = useRouter();
  const [email, setEmail] = useState(null);
  useEffect(() => {
    if (router.isReady === true) {
      setEmail(router.query.email);
    }
  }, [router.isReady]);
  return (
    <>
      <Head>
        <Title>Verify your email address</Title>
      </Head>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          fontSize={28}
          fontWeight={700}
          align="center"
        >
          Verify your email address
        </Typography>
        <Typography variant="subtitle2" align="center" fontSize={18}>
          A link to verify your email has been sent to your email address (
          {email}
          ). Click on the link to verify.
        </Typography>
      </Container>
    </>
  );
}

VerifyEmail.getLayout = function (page) {
  return <AuthLayout>{page}</AuthLayout>;
};
