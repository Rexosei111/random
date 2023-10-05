import AdminLayout, { CompanyLayout } from "@/components/layout";
import { BasicCompanyRecentRequestTable } from "@/components/requestTable";
import { fetcher } from "@/utils/swr_fetcher";
import { Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

export default function Index() {
  const { data, error, isLoading } = useSWR("/companies/recents", fetcher);
  console.log(data);
  return (
    <Container maxWidth="lg">
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        my={2}
      >
        <Typography variant="h4">Recent Certificates</Typography>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize", color: "white" }}
          component={Link}
          href="/company/certificates"
        >
          Check certificate
        </Button>
      </Stack>

      <BasicCompanyRecentRequestTable data={data && data} />
    </Container>
  );
}

Index.getLayout = function (page) {
  return <CompanyLayout>{page}</CompanyLayout>;
};
