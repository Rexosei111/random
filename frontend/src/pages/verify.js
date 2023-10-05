import AuthLayout from "@/components/authLayout";
import { APIClient } from "@/utils/axios";
import { Box, Button, Container, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Verify() {
  const router = useRouter();
  const [verified, setVerified] = useState(null);
  const [credentials, setCredentials] = useState(null)

  useEffect(() => {
    const verifyEmail = async (email) => {
      try {
        const { data } = await APIClient.post(
          `/companies/verify-email?email=${email}`
        );
        if (data !== null) {
          setVerified(true);
          setCredentials(data)
        } else {
          setVerified(false);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error);
          setVerified(false);
        }
      }
    };

    if (router.isReady === true) {
      const email = router.query.email;
      verifyEmail(email);
    }
  }, [router.isReady]);
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {verified === null && (
        <Typography variant="h3" gutterBottom align="center">
          Verifying ...
        </Typography>
      )}
      {verified === false && (
        <Typography
          variant="h3"
          gutterBottom
          sx={{ color: "#F0000E" }}
          align="center"
        >
          Unable to verify email address!
        </Typography>
      )}
      {verified === true && (
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{ color: "#00C408" }}
            align="center"
          >
            Verification completed!
          </Typography>
          <Typography
            variant="caption"
            gutterBottom
            align="center"
            fontSize={18}
          >
            Waiting for administrators to verify your details. An email will be
            sent to you when the verification process is completed.
          </Typography>
          {credentials && credentials !== null &&
          <>
          <Typography variant="h4" gutterBottom align="center" fontSize={20} mt={2}>
            Your login credentials
          </Typography>          
          <List dense>
            <ListItem disableGutters disablePadding>
              <ListItemText primary={"Email"} secondary={credentials?.email} primaryTypographyProps={{
                fontSize: 18
              }} secondaryTypographyProps={{
                fontSize: 17
              }}/>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText primary={"Password"} secondary={credentials?.plain_password} primaryTypographyProps={{
                fontSize: 18
              }} secondaryTypographyProps={{
                fontSize: 17
              }}/>
            </ListItem>
          </List>
          </>
          }
            <Button
            component={Link}
            href="/login"
            variant="contained"
            sx={{ textTransform: "capitalize" }}
            color="secondary"
          >
            Login
          </Button>
        </Stack>
      )}
    </Container>
  );
}

Verify.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};
