import React from "react";
import { Typography, Divider } from "@mui/material";



function OfferSummary(props) {
  const { values } = props;



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
    <>
      <Typography variant="h5">Summary</Typography>
      <Divider sx={{ my: "10px" }} />
      <Typography color="secondary" variant="body1">
        {values.name || "No title yet."}
      </Typography>
      <Typography mt="5px" variant="h5">
        Offer Type
      </Typography>
      <Typography color="secondary" variant="body1">
        {typeToLabel(values.type)}
      </Typography>
      <Typography mt="5px" variant="h5">
        Offer Method
      </Typography>
      <Typography color="secondary" variant="body1">
        {methodToLabel(values.method, values.code)}
      </Typography>
      <Typography mt="5px" variant="h5">
        Offer Discount
      </Typography>
      {values.actions && values.actions[0].type === "PERCENT" && (
        <Typography color="secondary" variant="body1">
          Discount is {values.actions[0].discountAmount}%
        </Typography>
      )}
      {values.actions && values.actions[0].type === "AMOUNT" && (
        <Typography color="secondary" variant="body1">
          Discount is ${values.actions[0].discountAmount}
        </Typography>
      )}
      <Typography mt="5px" variant="h5">
        Offer Conditions
      </Typography>
      {values.type === "ORDER_DISCOUNT" &&
        values.orderMinimumPurchaseType === "minimum-purchase" && (
          <Typography color="secondary" variant="body1">
            Minimum spend is ${values.conditions[0].value}
          </Typography>
        )}
      {values.type === "ORDER_DISCOUNT" &&
        values.orderMinimumPurchaseType === "none" && (
          <Typography color="secondary" variant="body1">
            No minimum purchase requirements.
          </Typography>
        )}
    </>
  );
}

export default OfferSummary;
