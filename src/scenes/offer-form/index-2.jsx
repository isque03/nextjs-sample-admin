import React, { useState } from 'react';
import { TextField, FormControlLabel, Checkbox, Button, Grid, Typography, Paper } from '@mui/material';

const CreateOfferForm = () => {
  const [offerData, setOfferData] = useState({
    name: '',
    enabled: true,
    type: 'ITEM_DISCOUNT',
    conditions: [
      {
        name: '',
        propertyName: '',
        type: 'GREATER_THAN_OR_EQUAL',
        value: 0,
      },
    ],
    actions: [
      {
        name: '',
        type: 'percent',
        value: 0,
      },
    ],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOfferData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setOfferData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleConditionInputChange = (event, index) => {
    const { name, value } = event.target;
    setOfferData((prevState) => {
      const conditions = [...prevState.conditions];
      conditions[index] = {
        ...conditions[index],
        [name]: value,
      };
      return {
        ...prevState,
        conditions,
      };
    });
  };

  const handleConditionCheckboxChange = (event, index) => {
    const { name, checked } = event.target;
    setOfferData((prevState) => {
      const conditions = [...prevState.conditions];
      conditions[index] = {
        ...conditions[index],
        [name]: checked,
      };
      return {
        ...prevState,
        conditions,
      };
    });
  };

  const handleActionInputChange = (event, index) => {
    const { name, value } = event.target;
    setOfferData((prevState) => {
      const actions = [...prevState.actions];
      actions[index] = {
        ...actions[index],
        [name]: value,
      };
      return {
        ...prevState,
        actions,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(offerData); // You can replace this with your own submission logic
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create New Offer
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Offer Name"
              fullWidth
              value={offerData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="enabled"
                  checked={offerData.enabled}
                  onChange={handleCheckboxChange}
                />
              }
              label="Enabled"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="type"
              label="Offer Type"
              fullWidth
              value={offerData.type}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Conditions
            </Typography>
            {offerData.conditions.map((condition, index) => (
              <div key={index}>
                <TextField
                  name="name" label="Condition Name"
                  fullWidth
                  value={condition.name}
                  onChange={(event) => handleConditionInputChange(event, index)}
                />
                <TextField
                  name="propertyName"
                  label="Property Name"
                  fullWidth
                  value={condition.propertyName}
                  onChange={(event) => handleConditionInputChange(event, index)}
                />
                <TextField
                  name="type"
                  label="Condition Type"
                  fullWidth
                  value={condition.type}
                  onChange={(event) => handleConditionInputChange(event, index)}
                />
                <TextField
                  name="value"
                  label="Condition Value"
                  type="number"
                  fullWidth
                  value={condition.value}
                  onChange={(event) => handleConditionInputChange(event, index)}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="enabled"
                      checked={condition.enabled}
                      onChange={(event) => handleConditionCheckboxChange(event, index)}
                    />
                  }
                  label="Enabled"
                />
              </div>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                setOfferData((prevState) => ({
                  ...prevState,
                  conditions: [
                    ...prevState.conditions,
                    {
                      name: '',
                      propertyName: '',
                      type: 'GREATER_THAN_OR_EQUAL',
                      value: 0,
                    },
                  ],
                }))
              }
            >
              Add Condition
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Actions
            </Typography>
            {offerData.actions.map((action, index) => (
              <div key={index}>
                <TextField
                  name="name"
                  label="Action Name"
                  fullWidth
                  value={action.name}
                  onChange={(event) => handleActionInputChange(event, index)}
                />
                <TextField
                  name="type"
                  label="Action Type"
                  fullWidth
                  value={action.type}
                  onChange={(event) => handleActionInputChange(event, index)}
                />
                <TextField
                  name="value"
                  label="Action Value"
                  type="number"
                  fullWidth
                  value={action.value}
                  onChange={(event) => handleActionInputChange(event, index)}
                />
              </div>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                setOfferData((prevState) => ({
                  ...prevState,
                  actions: [
                    ...prevState.actions,
                    {
                      name: '',
                      type: 'percent',
                      value: 0,
                    },
                  ],
                }))
              }
            >
              Add Action
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
};

export default CreateOfferForm;

