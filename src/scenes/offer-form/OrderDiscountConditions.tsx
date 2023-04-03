import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function OrderDiscountConditions() {
  return (
    <Box>
      <Typography variant="h5">Order Discount Conditions</Typography>
      <Typography variant="body1">
        Order discount conditions are used to define the conditions under which
        an order can be offered. For example, you can define a condition that an
        order must have a subtotal of at least $10.
      </Typography>
      <Typography variant="body1">
        You can define as many conditions as you like. When an order is offered,
        it will be matched against all of your conditions. If it matches any of
        them, it will be offered.
      </Typography>
    </Box>
  );
}