import {
  EmailOutlined,
  History,
  LocationCityOutlined,
  Person2Outlined,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { useState } from "react";
import CompanyDetails, { CertDetails } from "./companyDetailsDialog";

export function BasicCompanyRequestTable({ data = [] }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleClickOpen = () => {
    setDetailsOpen(true);
  };
  const router = useRouter();
  const handleCompanyView = (company) => {
    setSelectedCompany(company);
    handleClickOpen();
    //   router.push(`${view}/cras/${craId}/edit`);
  };
  return (
    <Paper
      sx={{
        bgcolor: "transparent",
      }}
      elevation={0}
    >
      <TableContainer component={Paper} elevation={0} sx={{}}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead
            sx={{
              bgcolor: (theme) => theme.palette.background.default,
            }}
          >
            <TableRow>
              <TableCell sx={{ fontSize: 18 }}>Company</TableCell>
              <TableCell align="left" sx={{ fontSize: 18 }}>
                Email
              </TableCell>
              <TableCell sx={{ fontSize: 18 }}>Location</TableCell>
              <TableCell sx={{ fontSize: 18 }}>Verified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length > 0 &&
              data?.map((row, index) => (
                <TableRow
                  hover
                  onClick={() => handleCompanyView(row)}
                  tabIndex={-1}
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Stack
                      flexDirection={"row"}
                      gap={1}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                    >
                      <Typography
                        variant="subtitle2"
                        fontSize={16}
                        color={(theme) => theme.palette.secondary.main}
                      >
                        {row?.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Stack alignItems={"center"} flexDirection={"row"} gap={1}>
                      <EmailOutlined fontSize="small" />
                      <Typography variant="caption" fontSize={16}>
                        {row.email}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Stack alignItems={"center"} flexDirection={"row"} gap={1}>
                      <LocationCityOutlined fontSize="small" />
                      <Typography variant="caption">{row.location}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                      <Typography color={row.verified ? "#00C408" : "#F0000E"}>
                        {row.verified ? "Verified" : "Not verified"}{" "}
                      </Typography>
                      {row.verified ? (
                        <CheckCircleOutlineRoundedIcon
                          fontSize="small"
                          htmlColor="#00C408"
                        />
                      ) : (
                        <HighlightOffRoundedIcon
                          fontSize="small"
                          htmlColor="#F0000E"
                        />
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CompanyDetails
        handleClickOpen={handleClickOpen}
        open={detailsOpen}
        setOpen={setDetailsOpen}
        data={selectedCompany}
      />
    </Paper>
  );
}

export function BasicCompanyRecentRequestTable({ data = [] }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  const handleClickOpen = () => {
    setDetailsOpen(true);
  };

  const router = useRouter();
  const handleCertView = (company) => {
    setSelectedCert(company);
    handleClickOpen();
    //   router.push(`${view}/cras/${craId}/edit`);
  };
  return (
    <Paper
      sx={{
        bgcolor: "transparent",
      }}
      elevation={0}
    >
      <TableContainer component={Paper} elevation={0} sx={{}}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead
            sx={{
              bgcolor: (theme) => theme.palette.background.default,
            }}
          >
            <TableRow>
              <TableCell sx={{ fontSize: 18 }}>Certificate ID</TableCell>
              <TableCell align="left" sx={{ fontSize: 18 }}>
                Name of student
              </TableCell>
              <TableCell sx={{ fontSize: 18 }}>Degree classification</TableCell>
              <TableCell sx={{ fontSize: 18 }}>Year of completion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.length > 0 &&
              data?.map((row, index) => (
                <TableRow
                  hover
                  onClick={() => handleCertView(row.certificate)}
                  tabIndex={-1}
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Stack
                      flexDirection={"row"}
                      gap={1}
                      alignItems={"center"}
                      justifyContent={"flex-start"}
                    >
                      <WorkspacePremiumOutlined fontSize="small" />
                      <Typography
                        variant="subtitle2"
                        fontSize={16}
                        color={(theme) => theme.palette.secondary.main}
                      >
                        {row?.certificate.certificate_id}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Stack alignItems={"center"} flexDirection={"row"} gap={1}>
                      <Person2Outlined fontSize="small" />
                      <Typography variant="caption" fontSize={16}>
                        {row.certificate.name_of_student}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Stack alignItems={"center"} flexDirection={"row"} gap={1}>
                      <Typography variant="caption" fontSize={16}>
                        {row.certificate.degree_classification}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                      <Typography>
                        {row.certificate.year_of_completion}
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CertDetails
        handleClickOpen={handleClickOpen}
        open={detailsOpen}
        setOpen={setDetailsOpen}
        data={selectedCert}
      />
    </Paper>
  );
}
