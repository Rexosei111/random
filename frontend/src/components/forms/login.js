import React, { useState } from "react";
import {
  Alert,
  Button,
  Divider,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import Link from "@/Link";
import { useRouter } from "next/router";
import { APIClient } from "@/utils/axios";
import { isAxiosError } from "axios";
import useToken from "@/hooks/token";
const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default function LoginForm() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useToken("app-token", null);
  const router = useRouter();
  const handleOpen = (message) => {
    setErrorMessage(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new URLSearchParams();
    formData.append("username", data.email);
    formData.append("password", data.password);
    let url = "/admin/auth/login";
    if (router.pathname.startsWith("/login")) {
      url = "/companies/auth/login";
    }
    try {
      const { data: tokenData } = await APIClient.post(url, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      setToken(tokenData.access_token);
      if (router.pathname.startsWith("/admin")) {
        router.push("/admin");
      } else {
        router.push("/company");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        handleOpen("Invalid Credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={0} sx={{ width: { xs: "100%", md: 400 }, p: 4 }}>
      <Typography variant="h3" textAlign={"center"}>
        {router.pathname.startsWith("/login") ? "Company" : "Admin"} Login
      </Typography>
      <Typography variant="subtitle1" my={2} textAlign="center">
        Please log in with your credentials
      </Typography>
      <form method="POST" action="#" onSubmit={handleSubmit(onSubmit)}>
        <Stack flexDirection={"column"} gap={2}>
          <TextField
            {...register("email")}
            variant="outlined"
            type={"email"}
            label="Email"
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email?.message : null}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            fullWidth
            focused
            placeholder="example@provider.com"
          />
          <TextField
            {...register("password")}
            variant="outlined"
            type={"password"}
            label="Password"
            placeholder="****************"
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password?.message : null}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            focused
            fullWidth
          />
          <LoadingButton
            loadingPosition="start"
            loading={loading}
            startIcon={<LoginIcon />}
            variant="contained"
            type="submit"
            sx={{ textTransform: "capitalize", color: "white" }}
          >
            Login
          </LoadingButton>
          {/* <Link href="#" style={{ marginLeft: "auto", fontSize: 15 }}>
            forgot your password?
          </Link> */}
          {router.pathname.startsWith("/login") && (
            <>
              <Divider>or</Divider>
              <Button component={Link} href="register">
                Verify company details
              </Button>
            </>
          )}
        </Stack>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
