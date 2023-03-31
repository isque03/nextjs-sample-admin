import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// LockOpenOutlinedIcon
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// SecurityOutlinedIcon
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left" },
    { field: "phone", headerName: "Mobile Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "access", headerName: "Access Level", flex: 1, renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin" ? colors.greenAccent[400] : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        )
      }
    },
  ];
  const buttons = [
    
    {
      label: "Cancel",
      color: "secondary",
      onClick: () => console.log("Cancel")
    },
    {
      label: "Create Campaign",
      color: "primary",
      onClick: () => console.log("New Campaign")
    },
  ]
  return (
    <Box m="20px">
      <Header title="Team" subtitle="Manage your team members" buttons={buttons} />
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid rows={mockDataTeam} columns={columns} pageSize={5} />
      </Box>
    </Box>
  )
}

export default Team;