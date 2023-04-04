import { Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Divider } from "@mui/material";

export default function OfferMethod({ handleBlur, handleChange, values, touched, errors }) {
  return (
    <>
      <Typography variant="h5">Method</Typography>

      <FormControl
        sx={{ mt: "10px" }}
      >
        <FormLabel id="demo-radio-buttons-group-label">Method Types</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          name="method"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.method}
        >
          <FormControlLabel value="code" control={<Radio />} label="Discount Code" />
          <FormControlLabel value="automatic" control={<Radio />} label="Automatic" />
        </RadioGroup>
      </FormControl>
      {values.method === "code" && (
        <>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Discount Code"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.code}
            name="code"
            error={touched.code && !values.code}
            helperText={errors.code}            
            sx={{ gridColumn: "span 2" }}
          />
          <Typography color="secondary" variant="body2">
            Customers must enter this code at checkout to receive the discount.
          </Typography>
        </>
      )}
    </>
  )
};