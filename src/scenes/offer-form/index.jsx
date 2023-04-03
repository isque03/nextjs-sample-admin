import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  type: Yup.string().required('Type is required'),
  'conditions.0.value': Yup.number().required('Condition value is required'),
  'actions.0.type': Yup.string().required('Action type is required'),
  'actions.0.value': Yup.number().required('Action value is required'),
});

const initialValues = {
  name: '',
  enabled: true,
  type: 'ITEM_DISCOUNT',
  conditions: [
    {
      name: 'offerCond',
      propertyName: 'cart.order',
      type: 'GREATER_THAN_OR_EQUAL',
      value: 10,
    },
  ],
  actions: [
    {
      name: 'orderDiscount',
      type: 'PERCENT',
      value: 5,
    },
  ],
};

const OfferNameField = ({ error, touched }) => (
  <Field as={TextField} name="name" label="Name" fullWidth margin="normal" error={touched && Boolean(error)} helperText={touched && error} />
);

const OfferTypeField = ({ error, touched }) => (
  <FormControl fullWidth margin="normal" error={touched && Boolean(error)}>
    <InputLabel>Type</InputLabel>
    <Field as={Select} name="type">
      <MenuItem value="ITEM_DISCOUNT">Item Discount</MenuItem>
      <MenuItem value="ORDER_DISCOUNT">Order Discount</MenuItem>
      <MenuItem value="SHIPPING_DISCOUNT">Shipping Discount</MenuItem>
    </Field>
    {touched && error && <div>{error}</div>}
  </FormControl>
);

const ConditionValueField = ({ error, touched }) => (
  <Field as={TextField} name="conditions[0].value" label="Condition value" fullWidth margin="normal" error={touched && Boolean(error)} helperText={touched && error} />
);

const ActionTypeField = ({ error, touched }) => (
  <FormControl fullWidth margin="normal" error={touched && Boolean(error)}>
    <InputLabel>Action type</InputLabel>
    <Field as={Select} name="actions[0].type">
      <MenuItem value="PERCENT">Percent</MenuItem>
      <MenuItem value="ABSOLUTE">Absolute</MenuItem>
      <MenuItem value="FIXED">Fixed</MenuItem>
    </Field>
    {touched && error && <div>{error}</div>}
  </FormControl>
);

const ActionValueField = ({ error, touched }) => (
  <Field as={TextField} name="actions[0].value" label="Action value" fullWidth margin="normal" error={touched && Boolean(error)} helperText={touched && error} />
);

const CreateOfferForm = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, errors, touched }) => (
        <Form>
          <OfferNameField error={errors.name} touched={touched.name} />
          <OfferTypeField error={errors.type} touched={touched.type} />
          {values.type === 'ITEM_DISCOUNT' && (
            <>
              <ConditionValueField error={errors.conditions?.[0]?.value} touched={touched.conditions?.[0]?.value} />
              <ActionTypeField error={errors.actions?.[0]?.type} touched={touched.actions?.[0]?.type} />
              <ActionValueField error={errors.actions?.[0]?.value} touched={touched.actions?.[0]?.value} />
            </>
          )}
          {values.type === 'ORDER_DISCOUNT' && (
            <>
              <ActionTypeField error={errors.actions?.[0]?.type} touched={touched.actions?.[0]?.type} />
              <ActionValueField error={errors.actions?.[0]?.value} touched={touched.actions?.[0]?.value} />
            </>
          )}
          <Button type="submit" variant="contained" color="primary" disabled={!values.name || !values.type || Object.keys(errors).length > 0}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
};

export default CreateOfferForm;
