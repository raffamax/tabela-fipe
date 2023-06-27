import { useContext, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { CarDataContext, Model } from "../Context/CarDataContext";

export default function ModelSelect() {
  const { selectedMake, models, selectedModel, handleChangeModel } =
    useContext(CarDataContext);

  return (
    <Autocomplete
      id="models"
      options={models}
      sx={{
        width: 400,
        m: 1,
        "@media (max-width: 700px)": {
          width: 250,
        },
      }}
      renderInput={(params) => <TextField {...params} label="Modelo" />}
      disabled={!selectedMake}
      value={selectedModel}
      onChange={(event: any, newModel: any) => {
        handleChangeModel(newModel);
      }}
    />
  );
}
