import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function ShippingDiscountConditions() {
  return (
    <Box>
      <Typography variant="h5">Shipping Discount Conditions</Typography>
      <Typography variant="body1">
        Shipping discount conditions are used to define the conditions under
        which a shipping discount can be offered. For example, you can define a
        condition that a shipping discount must be for a shipping method that
        costs at least $10.
      </Typography>
      <Typography variant="body1">
        You can define as many conditions as you like. When a shipping discount is
        offered, it will be matched against all of your conditions. If it matches
        any of them, it will be offered.
      </Typography>
    </Box>
  );
}