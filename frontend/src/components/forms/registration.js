import React from "react";
import {
  Alert,
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
// import Link from "@/components/Link";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/router";
import Link from "@/Link";
import {
  BusinessOutlined,
  LanguageOutlined,
  LocationOn,
  PhoneAndroidOutlined,
} from "@mui/icons-material";
// import Link from "next/link";

const loginSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone_number: yup.string().required(),
    location: yup.string().required(),
    digital_address: yup.string().required(),
    website_url: yup.string(),
  })
  .required();

export default function RegistrationForm() {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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
    setErrorMessage("");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);

    try {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/companies/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      router.push(`/verify-email?email=${data.email}`);
    } catch (e) {
      setLoading(false);
      if (isAxiosError(e)) {
        if (
          e.response.status === 400 &&
          e.response.data.detail instanceof String
        ) {
          handleOpen(e.response.data.detail);
        } else if (
          e.response.status === 400 &&
          e.response.data.detail instanceof Object
        ) {
          handleOpen(e.response.data.detail.reason);
        } else {
          handleOpen("Unable to register user at this time.");
        }
      }
    }
  };

  return (
    <Paper elevation={0} sx={{ width: { xs: "100%", md: 800 }, p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }} textAlign={"center"} gutterBottom>
        Details of Company
      </Typography>
      <form method="POST" action="#" onSubmit={handleSubmit(onSubmit)}>
        <Stack flexDirection={"row"} gap={2} width={"100%"}>
          <Stack flexDirection={"column"} gap={2} width={"100%"}>
            <TextField
              {...register("name")}
              variant="outlined"
              type={"text"}
              label="Name of company"
              error={errors.name ? true : false}
              helperText={errors.name ? errors.name?.message : null}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              fullWidth
              placeholder=""
            />
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
              placeholder="example@provider.com"
            />
            <TextField
              {...register("phone_number")}
              variant="outlined"
              type={"text"}
              label="Phone number"
              error={errors.phone_number ? true : false}
              helperText={
                errors.phone_number ? errors.phone_number?.message : null
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneAndroidOutlined fontSize="small" />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Stack>
          <Stack flexDirection={"column"} gap={2} width={"100%"}>
            <TextField
              {...register("location")}
              variant="outlined"
              type={"text"}
              label="Location"
              error={errors.location ? true : false}
              helperText={errors.location ? errors.location?.message : null}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn fontSize="small" />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />

            <TextField
              {...register("digital_address")}
              variant="outlined"
              type={"text"}
              label="Digital address"
              error={errors.digital_address ? true : false}
              helperText={
                errors.digital_address ? errors.digital_address?.message : null
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessOutlined fontSize="small" />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />

            <TextField
              {...register("website_url")}
              variant="outlined"
              type={"text"}
              label="Website URL"
              error={errors.website_url ? true : false}
              helperText={
                errors.website_url ? errors.website_url?.message : null
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LanguageOutlined fontSize="small" />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Stack>
        </Stack>
        <Stack flexDirection={"column"} mt={2} gap={2}>
          <LoadingButton
            loadingPosition="start"
            loading={loading}
            startIcon={<LoginIcon />}
            variant="contained"
            type="submit"
            sx={{ textTransform: "capitalize", color: "white" }}
          >
            Submit
          </LoadingButton>
          <Link href="login" style={{ marginLeft: "auto", fontSize: 15 }}>
            login
          </Link>
        </Stack>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
