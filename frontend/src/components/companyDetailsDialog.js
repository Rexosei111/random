import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  DialogActions,
  DialogContent,
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  BusinessOutlined,
  CardMembershipOutlined,
  EmailOutlined,
  Event,
  LanguageOutlined,
  LocationCityOutlined,
  LocationOn,
  NumbersOutlined,
  Person2Outlined,
  Phone,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { APIClient } from "@/utils/axios";

function SimpleDialog(props) {
  const { companyInfo } = props;
  const { onClose, open } = props;

  const handleVerification = async (companyId) => {
    try {
      const { data } = await APIClient.patch(`/admin/companies/${companyId}`);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (companyId) => {
    try {
      const { data } = await APIClient.delete(`/admin/companies/${companyId}`);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle component={Typography} variant="h4" fontSize={25}>
        Details of Company
      </DialogTitle>
      <Divider sx={{}} variant="middle" flexItem />

      <DialogContent>
        <List dense disablePadding>
          <ListItem disableGutters disablePadding>
            <ListItemIcon>
              <BusinessOutlined />
            </ListItemIcon>
            <ListItemText
              primary="Name of Company"
              secondary={companyInfo?.name}
              primaryTypographyProps={{
                fontSize: 18,
              }}
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemIcon>
              <EmailOutlined />
            </ListItemIcon>
            <ListItemText
              primary="Email"
              secondary={companyInfo?.email}
              primaryTypographyProps={{
                fontSize: 18,
              }}
              secondaryTypographyProps={{
                component: Link,
                href: `mailto:${companyInfo?.email}`,
              }}
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemIcon>
              <Phone />
            </ListItemIcon>
            <ListItemText
              primary="Phone number"
              secondary={companyInfo?.phone_number}
              primaryTypographyProps={{
                fontSize: 18,
              }}
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemIcon>
              <LocationCityOutlined />
            </ListItemIcon>
            <ListItemText
              primary="Location"
              secondary={companyInfo?.location}
              primaryTypographyProps={{
                fontSize: 18,
              }}
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemIcon>
              <LocationOn />
            </ListItemIcon>
            <ListItemText
              primary="Digital Address"
              secondary={companyInfo?.digital_address}
              primaryTypographyProps={{
                fontSize: 18,
              }}
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemIcon>
              <LanguageOutlined />
            </ListItemIcon>
            <ListItemText
              primary="Website URL"
              secondary={companyInfo?.website_url}
              primaryTypographyProps={{
                fontSize: 18,
              }}
              secondaryTypographyProps={{
                component: Link,
                href: `${companyInfo?.website_url}`,
              }}
            />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          sx={{ textTransform: "capitalize", color: "white" }}
          variant="contained"
          color="secondary"
          disableElevation
          onClick={() => handleDelete(companyInfo?.id)}
        >
          Delete
        </LoadingButton>
        {companyInfo?.verified !== true && (
          <LoadingButton
            sx={{ textTransform: "capitalize", color: "white" }}
            variant="contained"
            disableElevation
            onClick={() => handleVerification(companyInfo?.id)}
          >
            Verify
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default function CompanyDetails({
  open,
  setOpen,
  handleClickOpen,
  data,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <SimpleDialog
        selectedValue={data}
        open={open}
        companyInfo={data}
        onClose={handleClose}
      />
    </div>
  );
}

function SimpleCertDialog(props) {
  const { cert } = props;
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle component={Typography} variant="h4" fontSize={25}>
        Certiicate Details
      </DialogTitle>
      <Divider sx={{}} variant="middle" flexItem />

      <DialogContent>
        <List dense disablePadding>
          <ListItem disableGutters disablePadding>
            <ListItemIcon>
              <Person2Outlined />
            </ListItemIcon>
            <ListItemText
              primary="Name of student"
              secondary={cert?.name_of_student}
              primaryTypographyProps={{
                fontSize: 18,
              }}
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemIcon>
              <WorkspacePremiumOutlined />
            </ListItemIcon>
            <ListItemText
              primary="Certificate ID"
              secondary={cert?.certificate_id}
              primaryTypographyProps={{
                fontSize: 18,
              }}
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemIcon>
              <CardMembershipOutlined />
            </ListItemIcon>
            <ListItemText
              primary="Degree Classification"
              secondary={cert?.degree_classification}
              primaryTypographyProps={{
                fontSize: 18,
              }}
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            {/* <ListItemIcon>
              <LocationCityOutlined />
            </ListItemIcon> */}
            <ListItemText
              inset
              primary="Programme"
              secondary={cert?.programme}
              primaryTypographyProps={{
                fontSize: 18,
              }}
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemIcon>
              <LocationCityOutlined />
            </ListItemIcon>
            <ListItemText
              primary="Department"
              secondary={cert?.department}
              primaryTypographyProps={{
                fontSize: 18,
              }}
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemIcon>
              <NumbersOutlined />
            </ListItemIcon>
            <ListItemText
              primary="CWA"
              secondary={(cert?.cwa / 4) * 100}
              primaryTypographyProps={{
                fontSize: 18,
              }}
            />
          </ListItem>
          <ListItem disableGutters disablePadding>
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText
              primary="Year of completion"
              secondary={cert?.year_of_completion}
              primaryTypographyProps={{
                fontSize: 18,
              }}
            />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          sx={{ textTransform: "capitalize", color: "white" }}
          variant="contained"
          disableElevation
          onClick={handleClose}
        >
          Close
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export function CertDetails({ open, setOpen, handleClickOpen, data }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <SimpleCertDialog
        selectedValue={data}
        open={open}
        cert={data}
        onClose={handleClose}
      />
    </div>
  );
}
