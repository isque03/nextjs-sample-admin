import { Box, Button, ButtonGroup, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";


export default function OrderDiscountActions({ handleBlur, handleChange, values, touched, errors }) {
  const percentSelected = () => {
    values.actions[0].type = "percent";
    setUsePercent(true);
  };
  const amountSelected = () => {
    values.actions[0].type = "amount";
    setUsePercent(false);
  };

  
  const [usePercent, setUsePercent] = useState(false);
  const adornment = usePercent ? "%" : "$";
  return (
    <Box>
      <Typography variant="h5">Discount Amount</Typography>
      <Box mt="20px" columnGap={"20px"} display="flex" justifyContent={"space-between"} alignItems={"center"}>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={amountSelected} color={usePercent ? "secondary" : "primary"}>Amount</Button>
          <Button onClick={percentSelected} color={usePercent ? "primary" : "secondary"}>Percent</Button>
        </ButtonGroup>        
        <TextField
          fullWidth
          InputProps={{
            startAdornment: < InputAdornment position="start" >{adornment}</InputAdornment>
          }}
          variant="filled"
          type="number"
          label="Amount"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.actions[0].value}
          name="actions[0].value"
          error={touched.actions && touched.actions[0].value && !values.actions[0].value}
          helperText={errors.actions && touched.actions && touched.actions[0].value && errors.actions[0].value}
        />
      </Box>
    </Box>
  );
}