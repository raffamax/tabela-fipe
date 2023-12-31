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
        variant="h5"
        component={"h2"}
        fontWeight={700}
        color={"grey.700"}
        sx={{ m: 1 , textAlign: "center" , "@media (max-width: 700px)": {
          fontSize: 17
        },}}
      >
        Tabela Fipe: Preço {selectedMake?.label} {selectedModel?.label} ano{" "}
        {selectedYear?.label}
      </Typography>
      <Chip
        label={
          <Typography variant="h5" component={"h2"} fontWeight={700} >
            {price}
          </Typography>
        }
        color="success"
        sx={{ backgroundColor: "#00A48C", m: 1 , p: 3 , borderRadius: 50}}
      />
      <Typography
        variant="body2"
        component={"h2"}
        fontWeight={400}
        color={"grey.700"}
        sx={{ m: 1 ,textAlign: "center" }}
      >
        Este é o preço de compra do veículo
      </Typography>
    </>
  );
}
