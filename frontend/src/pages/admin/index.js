import AdminLayout from "@/components/layout";
import { BasicCompanyRequestTable } from "@/components/requestTable";
import { fetcher } from "@/utils/swr_fetcher";
import { Container, Typography } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { Search } from "@mui/icons-material";

function SearchBar({ setData}) {
  const handleChange = (event) => {
    setData(event.target.value)
  }
  return (
    <TextField
      variant="outlined"
      size="small"
      name="search"
      sx={{
        bgcolor: (theme) => theme.palette.background.paper,
        width: { xs: "100%", md: "40%" },
      }}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search fontSize="small" />
          </InputAdornment>
        ),
      }}
      placeholder="Search"
    />
  );
}




export default function Index() {
  const [query, setQuery] = useState("")
  const { data, error, isLoading } = useSWR(`/admin/companies?q=${query}`, fetcher);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Recent Requests
      </Typography>
      <SearchBar setData={setQuery} />
      <BasicCompanyRequestTable data={data ? data : []} />
    </Container>
  );
}

Index.getLayout = function (page) {
  return <AdminLayout>{page}</AdminLayout>;
};
