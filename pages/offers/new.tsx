import { margins, tokens } from "../../src/theme";
import { Paper, Box, useTheme, Typography, TextField, FormGroup, InputLabel, FormLabel, Button, Divider, AppBar, Toolbar, Stack, Snackbar } from "@mui/material";
import Header from "../../src/components/Header";
import CreateOfferForm from "../../src/scenes/offer-form";
import RuleBuilder from "../../src/scenes/rulebuilder";
import { useState } from "react";

import { fields } from './fields';
import 'react-querybuilder/dist/query-builder.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";

import Checkbox from '@mui/material/Checkbox';
//import DragIndicator from '@mui/material/DragIndicator';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import ItemConditions from "../../src/scenes/offer-form/ItemConditions";
import OfferMethod from "../../src/scenes/offer-form/OfferMethod";
import OrderDiscountConditions from "../../src/scenes/offer-form/OrderDiscountConditions";
import ShippingDiscountConditions from "../../src/scenes/offer-form/ShippingDiscountConditions";
import OrderDiscountActions from "../../src/scenes/offer-form/OrderDiscountActions";
import OfferSummary from "../../src/scenes/offer-form/OfferSummary";
import ActionBar from "../../src/components/ActionBar";
import { useRouter } from "next/router";

export default function NewOffersPage() {


  

  const initialValues: Offer = {
    "name": null,
    "enabled": true,
    "type": "ORDER_DISCOUNT",
    "method": "code",
    "orderMinimumPurchaseType": "minimum-purchase",
    "conditions": [
      {
        "name": "offerCond",
        "propertyName": "cart.order",
        "type": "GREATER_THAN_OR_EQUAL",
        "value": null,
      }
    ],
    "actions": [
      {
        "name": "orderDiscount",
        "type": "AMOUNT",
        "discountAmount": null
      }
    ]
  };


  const router = useRouter();
  const ENDPOINT = "http://localhost:8081/v1/rules/offers";

  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormError, setIsFormError] = useState(false);

  // Submit form to server
  const handleFormSubmit = async (values) => {
    console.log(values);
    const payload = {
      "name": values.name,
      "enabled": values.enabled ? 1 : 0,
      "type": values.type,
      "conditions": values.conditions,
      "actions": values.actions,
    };
    console.log(JSON.stringify(payload));
    try {
      setIsSubmitting(true);
      setIsFormError(false);
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log(response);
      setFormSubmitSuccess(true);
      router.push("/offers");
    } catch (error) {
      console.error(error);
      setFormSubmitSuccess(false);
      setIsFormError(true);
    } finally {
      setIsSubmitting(false);
    }
  };


  const isWideScreen = useMediaQuery("(min-width: 600px)");
  interface OfferSchema {
    method: string;
    code?: string;
  }

  // Form Validation
  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    enabled: yup.boolean(),
    type: yup.string().required('Offer Type is required'),
    method: yup.string().required('Offer Method is required'),
    orderMinimumPurchaseType: yup.string().required('Select a minimum purchase type'),
    code: yup.string().when('method', ([method], schema) => {
      return method === "code"
        ? schema.required("Discount Code is required")
        : schema;
    }),
    conditions: yup.array().of(
      yup.object().shape({
        name: yup.string().required('Name is required'),
        propertyName: yup.string().required('Property Name is required'),
        type: yup.string().required('Type is required'),
        value: yup.number().typeError('Value is required').moreThan(0, 'Value must be greater than 0').required('Value is required'),
      })
    ),
    actions: yup.array().of(
      yup.object().shape({
        name: yup.string().required('Name is required'),
        type: yup.string().required('Type is required'),
        discountAmount: yup.number().typeError('Discount amount is required').moreThan(0, 'Discount amount must be greater than 0.').required('Discount amount is required'),
      })
    ),
  });

  interface Offer extends yup.InferType<typeof validationSchema> {
  }

  const formId = "new-offer-form";
  // grab the color mode from the context
  const theme = useTheme();
  // grab the color mode from the context for the current theme (light or dark)
  const colors = tokens(theme.palette.mode);


  // Action Bar Buttons
  const buttons = [
    {
      label: "Cancel",
      color: "inherit",
      variant: "outlined",
      url: "/offers",
      sx: { minWidth: "100px" }
    },
    {
      label: "Save Offer",
      color: "primary",
      form: formId,     
      type: "submit",
      sx: {
        backgroundColor: colors.greenAccent[400],
        minWidth: "100px",
        "&:hover": {
          backgroundColor: colors.greenAccent[300]
        }
      }
    },
  ];


  return (
    <Box m={margins["page-boundary"]}>
      <Header title="Create Offer" buttons={[]} subtitle="Create a new offer" />
      <ActionBar buttons={buttons} title="Offer not yet saved." />
      <Snackbar open={isFormError} message="There was a problem saving your offer." autoHideDuration={5000} onClose={() => setIsFormError(false)}/>
      <Box >
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (

            <form onSubmit={handleSubmit} id={formId}>

              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0,1fr))"
                sx={{
                  "& > div": { gridColumn: isWideScreen ? undefined : "span 4" },
                }}>
                <Paper
                  elevation={3}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, minmax(0,1fr))",
                    gap: "5px",
                    gridColumn: "1 / 4",
                    gridRow: "1 / 2",
                    p: "20px",
                  }}>
                  <Typography sx={{ gridColumn: "1 / 4" }} variant="h5">Offer Details</Typography>


                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Offer Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={touched.name && !values.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 2", mt: "10px" }}
                  />

                  <FormGroup
                    sx={{
                      gridColumn: "span 2",
                    }}
                  >
                    <FormControlLabel control={<Switch defaultChecked value={values.enabled} />} label="Enabled" />
                  </FormGroup>


                  <FormControl fullWidth sx={{ mt: "20px", gridColumn: "span 4" }}>
                    <InputLabel id="demo-simple-select-label">Offer Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.type}
                      label="Offer Type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.type && !values.type}
                      helperText={touched.type && errors.type}
                      name="type"
                    >
                      <MenuItem value="ITEM_DISCOUNT">Item Discount</MenuItem>
                      <MenuItem value="ORDER_DISCOUNT">Order Discount</MenuItem>
                      <MenuItem value="SHIPPING_DISCOUNT">Shipping Discount</MenuItem>
                    </Select>
                  </FormControl>

                </Paper>
                <Paper
                  elevation={3}
                  sx={{
                    gridColumn: "4",
                    gridRow: "span 3",
                    p: "20px"
                  }}>
                  <OfferSummary values={values} />
                </Paper>

                <Paper
                  elevation={3}
                  sx={{
                    gridColumn: "1 / 4",
                    gridRow: "span 2",
                    p: "20px"
                  }}>
                  <OfferMethod
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                    touched={touched}
                    errors={errors}
                  />
                </Paper>

                <Paper
                  elevation={3}
                  sx={{
                    gridColumn: "1 / 4",
                    gridRow: "span 2",
                    p: "20px"
                  }}>
                  {values.type === "ORDER_DISCOUNT" &&
                    <OrderDiscountConditions handleBlur={handleBlur}
                      handleChange={handleChange}
                      values={values}
                      touched={touched}
                      errors={errors} />
                  }
                  {values.type === "ITEM_DISCOUNT" &&
                    <ItemConditions />
                  }
                  {values.type === "SHIPPING_DISCOUNT" &&
                    <ShippingDiscountConditions />
                  }

                </Paper>

                <Paper
                  elevation={3}
                  sx={{
                    gridColumn: "1 / 4",
                    gridRow: "span 2",
                    p: "20px"
                  }}>
                  {values.type === "ORDER_DISCOUNT" &&
                    <OrderDiscountActions handleBlur={handleBlur}
                      handleChange={handleChange}
                      values={values}
                      touched={touched}
                      errors={errors} />
                  }
                </Paper>
                <Divider sx={{ gridColumn: "span 4" }} />
                <Box display="flex" justifyContent="end" mt="20px"
                  sx={{ gridColumn: "1 / 5" }}
                >
                  <Button
                    variant="contained"
                    type="submit"
                    color="secondary"

                  >Save Offer
                  </Button>
                </Box>
              </Box>

            </form>
          )}
        </Formik>
      </Box>
    </Box >
  );
}
