import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
//   import { LayoutContext } from "./agencyLayout";
//   import MenuIcon from "@mui/icons-material/Menu";
import { ConsultantLayoutContext } from "./layout";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";

//   export default function TopBar({ title }) {
//     const {
//       mobileOpen,
//       setMobileOpen,
//       handleDrawerToggle,
//       drawerWidth,
//       topbarTitle,
//     } = useContext(LayoutContext);
//     return (
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//           bgcolor: "white",
//           color: (theme) => theme.palette.text.primary,
//         }}
//         elevation={0}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Box width={"100%"}>
//             <Typography
//               variant="h6"
//               textAlign={"center"}
//               textOverflow={"ellipsis"}
//               noWrap
//               component="div"
//             >
//               {topbarTitle}
//             </Typography>
//           </Box>
//         </Toolbar>
//       </AppBar>
//     );
//   }

export function ConsultantTopBar({ title }) {
  const { mobileOpen, setMobileOpen, handleDrawerToggle, drawerWidth } =
    useContext(ConsultantLayoutContext);
  const router = useRouter();

  const handlePreviousPage = () => {
    if (router.pathname !== "/a" && router.pathname !== "/a") {
      router.back();
    }
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "white",
        color: (theme) => theme.palette.text.primary,
      }}
      elevation={0}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="go to previous page"
          edge="start"
          onClick={handlePreviousPage}
          sx={{ mr: 2 }}
        >
          <ArrowBack />
        </IconButton>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
        >
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
