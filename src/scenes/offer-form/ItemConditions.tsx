import { Box, Typography } from "@mui/material";

export default function ItemConditions() {
  return (
    <Box>
      <Typography variant="h5">Item Conditions</Typography>
      <Typography variant="body1">
        Item conditions are used to define the conditions under which an item
        can be offered. For example, you can define a condition that an item
        must be in good condition and have a price of at least $10.
      </Typography>
      <Typography variant="body1">
        You can define as many conditions as you like. When an item is offered,
        it will be matched against all of your conditions. If it matches any of
        them, it will be offered.
      </Typography>
      </Box>
  );
}