import { useContext } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { CarDataContext } from "../Context/CarDataContext";

export default function YearSelect() {
  const { selectedModel, selectedYear, years, handleChangeYear } =
    useContext(CarDataContext);

  return (
    <>
      {selectedModel && (
        <Autocomplete
          id="years"
          options={years}
          sx={{
            width: 400,
            m: 1,
            "@media (max-width: 700px)": {
              width: 250,
            },
          }}
          renderInput={(params) => <TextField {...params} label="Ano" />}
          value={selectedYear}
          onChange={(event: any, newYear: any) => {
            handleChangeYear(newYear);
          }}
        />
      )}
    </>
  );
}
