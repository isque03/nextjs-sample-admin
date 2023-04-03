import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

interface FieldProps {
  name: string;
  label: string;
  type?: string;
}

interface RuleBuilderProps {
  fields: FieldProps[];
  onSubmit: (values: any) => void;
  title: string;
  subtitle: string;
}

const RuleBuilder: React.FC<RuleBuilderProps> = ({
  fields,
  onSubmit,
  title,
  subtitle,
}) => {
  const isWideScreen = useMediaQuery("(min-width: 600px)");
  const initialValues = fields.reduce((obj, field) => {
    obj[field.name] = undefined;
    return obj;
  }, {});

  const validationSchema = yup.object().shape(
    fields.reduce((obj, field) => {
      obj[field.name] = yup.string().required(`${field.label} is required`);
      return obj;
    }, {})
  );

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };

  return (
    <Box m="20px">
      <Typography variant="h4" component="h1" align="center">
        {title}
      </Typography>
      <Typography variant="subtitle1" align="center">
        {subtitle}
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {fields.map((field) => (
                <Grid item xs={12} sm={6} key={field.name}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type={field.type || "text"}
                    label={field.label}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values[field.name]}
                    name={field.name}
                    error={touched[field.name] && !!errors[field.name]}
                    helperText={touched[field.name] && errors[field.name]}
                  />
                </Grid>
              ))}
            </Grid>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RuleBuilder;
