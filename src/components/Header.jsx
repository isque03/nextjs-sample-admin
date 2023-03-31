import { Typography, Box, useTheme, ButtonGroup } from "@mui/material";
import { tokens } from "../theme";
import { Button } from "@mui/material";

const Header = ({ title, subtitle, buttons }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" justifyContent="space-between">
      <Box mb="30px">
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          {subtitle}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="end" mb="20px">
        {buttons && buttons.map((button) => (

          <Button
            onClick={button.onClick}
            variant="contained"
            type="submit"
            color={button.color || "success"}
            size="medium"            
            sx={{ height: "38px", padding: "0 20px", ml: "10px" }}
          >
            {button.label}
          </Button>


        ))}
      </Box>
    </Box>
  );
};

export default Header;