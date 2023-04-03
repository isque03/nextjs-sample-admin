import { Box, FormControl, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup, TextField, Typography } from "@mui/material";


export default function OrderDiscountConditions({ handleBlur, handleChange, values, touched, errors }) {
  return (
    <Box>
      <Typography variant="h5">Minimum Purchase Requirements</Typography>
      <FormControl sx={{ mt: "10px" }}>
        <FormLabel id="minimum-purchase-requirements">Choose Requirements</FormLabel>
        <RadioGroup
          aria-labelledby="minimum-purchase-requirements"
          name="orderMinimumPurchaseType"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.orderMinimumPurchaseType}
        >
          <FormControlLabel value="none" control={<Radio />} label="No minimum purchase" />
          <FormControlLabel value="minimum-purchase" control={<Radio />} label="Minimum purchase ($)" />
        </RadioGroup>
      </FormControl>
      {values.orderMinimumPurchaseType === "minimum-purchase" && (
        <>
          <TextField
            fullWidth
            InputProps={{
              startAdornment:< InputAdornment position="start" >$</InputAdornment>
            }}
      variant="filled"
      type="number"
      label="Minimum Purchase"
      onBlur={handleBlur}
      onChange={handleChange}
      value={values.conditions[0].value}
      name="conditions[0].value"
      error={touched.orderMinimumPurchase && !values.orderMinimumPurchase}
      helperText={touched.orderMinimumPurchase && errors.orderMinimumPurchase}
      sx={{ gridColumn: "span 2" }}
          />
      <Typography color="secondary" variant="body2">
        Customers must spent at least this amount to receive the discount.
      </Typography>
    </>
  )
}
    </Box >
  );
}