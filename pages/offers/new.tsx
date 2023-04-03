import { margins } from "../../src/theme";
import { Paper, Box, useTheme, Typography, TextField, FormGroup, InputLabel, FormLabel, Button, Divider } from "@mui/material";
import Header from "../../src/components/Header";
import CreateOfferForm from "../../src/scenes/offer-form";
import RuleBuilder from "../../src/scenes/rulebuilder";
import type { RuleGroupType } from 'react-querybuilder';
import { useState } from "react";

import { QueryBuilder } from 'react-querybuilder';
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
import { QueryBuilderMaterial } from "@react-querybuilder/material";

import ItemConditions from "../../src/scenes/offer-form/ItemConditions";
import OfferMethod from "../../src/scenes/offer-form/OfferMethod";
import OrderDiscountConditions from "../../src/scenes/offer-form/OrderDiscountConditions";
import ShippingDiscountConditions from "../../src/scenes/offer-form/ShippingDiscountConditions";
import OrderDiscountActions from "../../src/scenes/offer-form/OrderDiscountActions";

const Builder = ({ fields, components }) => {

  const initialQuery: RuleGroupType = { combinator: 'and', rules: [] };

  const [query, setQuery] = useState(initialQuery);
  const theme = useTheme();
  return (<Box>
    <Typography variant="h5">Query Builder</Typography>

    <QueryBuilderMaterial>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={(q) => {
          console.log(q);
          setQuery(q);
        }}
        showCloneButtons
        showCombinatorsBetweenRules
        showNotToggle
        controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}


      />
    </QueryBuilderMaterial>

  </Box>
  );
};
const OtherBuilder = ({ fields, onSubmit }) => {
  return (
    <Box m="40px 0 0 0" height="75vh">
      <RuleBuilder
        title="Rule Builder"
        fields={fields}
        onSubmit={onSubmit}
      ></RuleBuilder>
    </Box>
  )

}
export default function NewOffersPage() {
  const fields2 = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "email", label: "Email" },
    { name: "contact", label: "Contact" },
    { name: "address1", label: "Address 1" },
  ];
  const onSubmit = (data) => {
    console.log(data);
  };

  const muiComponents = {
    Checkbox,
    //DragIndicator,
    FormControl,
    FormControlLabel,
    Input,
    ListSubheader,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Switch,
    TextareaAutosize,
    TextField
  };


  const initialValues: Offer = {
    "name": "10% OFF $150",
    "enabled": true,
    "type": "ORDER_DISCOUNT",
    "method": "automatic",
    "conditions": [
      {
        "name": "offerCond",
        "propertyName": "cart.order",
        "type": "GREATER_THAN_OR_EQUAL",
        "value": 0
      }
    ],
    "actions": [
      {
        "name": "orderDiscount",
        "type": "percent",
        "value": 5
      }
    ]
  };

  const [age, setAge] = useState("ITEM_DISCOUNT");

  const handleFormSubmit = (values) => {
    console.log("form submitted")
    console.log(values);
  };
  const isWideScreen = useMediaQuery("(min-width: 600px)");
  interface OfferSchema {
    method: string;
    code?: string;
  }
  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    enabled: yup.boolean(),
    type: yup.string().required('Offer Type is required'),
    method: yup.string().required('Offer Method is required'),
    code: yup.string().when('method', (method, schema) => {
      return method === "code"
        ? schema.required("Code is required when method is 'code'")
        : schema;
    }),
    conditions: yup.array().of(
      yup.object().shape({
        name: yup.string().required('Name is required'),
        propertyName: yup.string().required('Property Name is required'),
        type: yup.string().required('Type is required'),
        value: yup.number().required('Value is required'),
      })
    ),
    actions: yup.array().of(
      yup.object().shape({
        name: yup.string().required('Name is required'),
        type: yup.string().required('Type is required'),
        value: yup.number().required('Value is required'),
      })
    ),
  });

  interface Offer extends yup.InferType<typeof validationSchema> {
  }

  const buttons = [
    {
      label: "Save Offer",
      color: "secondary",
      onClick: () => {
        console.log("save offer clicked");
      },
    },
  ];

  const typeToLabel = (type: string) => {
    switch (type) {
      case "ITEM_DISCOUNT":
        return "Discount items in cart.";
      case "ORDER_DISCOUNT":
        return "Discount order total.";
      case "SHIPPING_DISCOUNT":
        return "Discount shipping costs.";
      default:
        return "Type not yet chosen.";
    }
  };

  const methodToLabel = (method: string, code: string) => {
    code = code || "(not yet chosen)";
    switch (method) {
      case "automatic":
        return "Automatically applied offer.";
      case "code":
        return `Apply offer with code ${code}`;
      default:
        return "Method not yet chosen.";
    }
  };

  return (
    <Box m={margins["page-boundary"]}>
      <Header title="Create Offer" buttons={buttons} subtitle="Create a new offer" />
      <Box >
        <Formik
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (

            <form onSubmit={handleSubmit}>
              <span>{`${JSON.stringify(errors)}`}</span>
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
                  <Typography variant="h5">Summary</Typography>
                  <Divider sx={{ my: "10px" }} />
                  <Typography color="secondary" variant="body1">{values.name || "No title yet."}</Typography>
                  <Typography mt="5px" variant="h5">Offer Type</Typography>
                  <Typography color="secondary" variant="body1">{typeToLabel(values.type)}</Typography>
                  <Typography mt="5px" variant="h5">Offer Method</Typography>
                  <Typography color="secondary" variant="body1">{methodToLabel(values.method, values.code)}</Typography>
                  <Typography mt="5px" variant="h5">Offer Conditions</Typography>
                  {values.type === "ORDER_DISCOUNT" && values.orderMinimumPurchaseType === "minimum-purchase" &&  
                    <Typography color="secondary" variant="body1">Order total is greater than ${values.conditions[0].value}</Typography>
                  }
                  {values.type === "ORDER_DISCOUNT" && values.orderMinimumPurchaseType === "none" &&  
                    <Typography color="secondary" variant="body1">No minimum purchase requirements.</Typography>
                  }


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

      { /*<Builder fields={fields} components={muiComponents} /> */}

    </Box >
  );
}
