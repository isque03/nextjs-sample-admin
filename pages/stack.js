import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import Header from "../src/components/Header";

export default function StackPage() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Header
          title="Stacking Rules"
          subtitle="Manager offer stacking rules."
        ></Header>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          <Item>Offer 1</Item>
          <Item>Offer 2</Item>
          <Item>Offer 3</Item>
        </Stack>
      </Box>
    </Box>
  );
}
