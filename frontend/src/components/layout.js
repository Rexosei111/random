import { Box, Paper, Toolbar } from "@mui/material";
import React from "react";
import { createContext } from "react";
import { ConsultantTopBar } from "./TopBar";
import { MobileResponsiveDrawer, ResponsiveDrawer } from "./drawer";
import Head from "next/head";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import { useRouter } from "next/router";
import { useTokenValidation } from "@/hooks/token";

export const ConsultantLayoutContext = createContext(null);
const drawerWidth = 240;

export default function AdminLayout({ children, title = "Welcome" }) {
  useTokenValidation();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const sideNavItems = [
    {
      label: "Verifications",
      icon: (
        <HomeOutlinedIcon
          fontSize="small"
          htmlColor={router.pathname === "/admin" ? "white" : null}
        />
      ),
      url: "/admin",
    },
    {
      label: "Companies",
      icon: (
        <AssignmentOutlinedIcon
          fontSize="small"
          htmlColor={
            router.pathname.startsWith("/admin/companies") ? "white" : null
          }
        />
      ),
      url: "/admin/companies",
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ConsultantLayoutContext.Provider
        value={{ mobileOpen, setMobileOpen, handleDrawerToggle, drawerWidth }}
      >
        <Box sx={{ display: "flex" }}>
          <ConsultantTopBar title={title} />
          <MobileResponsiveDrawer sideNavItems={sideNavItems} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              // p: 2,
              mb: 5,
              width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>
        ;
      </ConsultantLayoutContext.Provider>
    </>
  );
}

export function CompanyLayout({ children, title = "Welcome" }) {
  useTokenValidation();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const sideNavItems = [
    {
      label: "Certificates",
      icon: (
        <HomeOutlinedIcon
          fontSize="small"
          htmlColor={router.pathname === "/company" ? "white" : null}
        />
      ),
      url: "/company",
    },
    // {
    //   label: "Companies",
    //   icon: (
    //     <AssignmentOutlinedIcon
    //       fontSize="small"
    //       htmlColor={
    //         router.pathname.startsWith("/admin/companies") ? "white" : null
    //       }
    //     />
    //   ),
    //   url: "/admin/companies",
    // },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ConsultantLayoutContext.Provider
        value={{ mobileOpen, setMobileOpen, handleDrawerToggle, drawerWidth }}
      >
        <Box sx={{ display: "flex" }}>
          <ConsultantTopBar title={title} />
          <MobileResponsiveDrawer sideNavItems={sideNavItems} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              // p: 2,
              mb: 5,
              width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>
        ;
      </ConsultantLayoutContext.Provider>
    </>
  );
}
