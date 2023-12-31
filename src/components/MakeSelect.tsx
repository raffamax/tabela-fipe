import { useContext } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { CarDataContext } from "../Context/CarDataContext";

export default function MakeSelect() {
  const { makes, selectedMake, handleChangeMake } = useContext(CarDataContext);

  return (
    <Autocomplete
      id="makes"
      options={makes}
      sx={{
        width: 400,
        m: 1,
        "@media (max-width: 700px)": {
          width: 250,
        },
      }}
      renderInput={(params) => <TextField {...params} label="Marca" />}
      value={selectedMake}
      onChange={(event: any, newMake: any) => {
        handleChangeMake(newMake);
      }}
    />
  );
}
