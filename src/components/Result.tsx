import React, { useContext, useEffect } from "react";
import { CarDataContext } from "../Context/CarDataContext";
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";

export default function Result() {
  const {
    selectedYear,
    price,
    selectedMake,
    selectedModel,
  } = useContext(CarDataContext);

  

  return (
    <>
      <Typography
        variant="h6"
        component={"h2"}
        fontWeight={700}
        color={"grey.700"}
        sx={{ m: 1 }}
      >
        Tabela Fipe: Preço {selectedMake?.label} {selectedModel?.label} ano{" "}
        {selectedYear?.label}
      </Typography>
      <Chip
        label={
          <Typography variant="h6" component={"h2"} fontWeight={700}>
            {price}
          </Typography>
        }
        color="success"
        sx={{ backgroundColor: "#00A48C", m: 1 }}
      />
      <Typography
        variant="body2"
        component={"h2"}
        fontWeight={400}
        color={"grey.700"}
        sx={{ m: 1 }}
      >
        Este é o preço de compra do veículo
      </Typography>
    </>
  );
}
