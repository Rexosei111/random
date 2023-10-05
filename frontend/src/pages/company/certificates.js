import AdminLayout, { CompanyLayout } from "@/components/layout";
import { APIClient } from "@/utils/axios";
import { CloseRounded, HighlightOff, NumbersOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { isAxiosError } from "axios";
import React, { useState } from "react";

export default function Certificates() {
  const [certID, setCertId] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [certificate, setCertificate] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (certID === "") {
      setIsValid(false);
      return null;
    }
    try {
      const { data } = await APIClient.get("/certificates/" + certID);
      setCertificate(data);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response.status === 404) {
          setCertificate(null);
        }
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setCertId(event.target.value);
    if (certID.length > 0) {
      setIsValid(true);
    }
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        // gap={2}
        width={"100%"}
        component={"form"}
        action={"#"}
        method="POST"
        onSubmit={handleSubmit}
      >
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          width={{ xs: "100%", md: 500 }}
        >
          <Typography variant="h4" fontWeight={700}>
            Check certificate validity
          </Typography>
          <TextField
            // {...register("email")}
            variant="outlined"
            required
            type={"text"}
            label="Certificate ID"
            value={certID}
            onChange={handleChange}
            // error={errors.email ? true : false}
            // helperText={errors.email ? errors.email?.message : null}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <NumbersOutlined fontSize="small" />
                </InputAdornment>
              ),
            }}
            fullWidth
            placeholder=""
          />
          <LoadingButton
            loading={loading}
            disabled={!isValid}
            sx={{ textTransform: "capitalize" }}
            variant="contained"
            type="submit"
            color="secondary"
          >
            Check
          </LoadingButton>
        </Stack>
      </Stack>
      <Divider sx={{ my: 3 }} variant="middle" />
      {certificate === null && (
        <Stack flexDirection={"column"} gap={2} alignItems={"center"} width={"100%"} justifyContent={"center"}>
          <Typography
            variant="h4"
            fontSize={25}
            fontWeight={700}
            align="center"
          >
            Certificate does not exist
          </Typography>
          <HighlightOff fontSize="large" sx={{ height: 45, width: 45}} color="error" />
        </Stack>
      )}
      {certificate !== "" && certificate !== null && (
        <Box>
          <Typography
            variant="h5"
            textTransform={"uppercase"}
            sx={{ textDecoration: "underline" }}
            align="center"
            gutterBottom
          >
            Validation of student certificate
          </Typography>
          <Typography
            component={"p"}
            variant="caption"
            lineHeight={2}
            sx={{ textIndent: "10%" }}
            fontSize={17}
          >
            We verify that the certificate with an identification number{" "}
            <b>{certificate?.certificate_id}</b> was awarded to{" "}
            <b>{certificate?.name_of_student}</b> with the index number{" "}
            <b>{certificate?.index_number}</b>, completed in the year{" "}
            <b>{certificate?.year_of_completion}</b> with Cummulative Weighted
            Average of <b>{(certificate?.cwa / 4) * 100}</b>, degree
            classisifcation <b>{certificate?.degree_classification}</b> and
            programme <b>{certificate?.programme}</b> at the{" "}
            <b>{certificate?.department}</b> department.
          </Typography>
        </Box>
      )}
    </Container>
  );
}

Certificates.getLayout = (page) => {
  return <CompanyLayout>{page}</CompanyLayout>;
};
