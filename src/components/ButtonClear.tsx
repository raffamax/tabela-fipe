import React, { useContext } from "react";
import { CarDataContext } from "../Context/CarDataContext";
import { Button } from "@mui/material";
import { useRouter } from "next/router";


export default function ButtonClear() {
  const router = useRouter();

  const {
    showPrice,
    setSelectedMake,
    setModels,
    setSelectedModel,
    setSelectedYear,
    setYears,
    setShowPrice,
    setPrice,
  } = useContext(CarDataContext);

  const clearSearch = () => {
    setSelectedMake(null);
    setShowPrice(false);
    setPrice("");
    setSelectedYear(null);
    setYears([]);
    setSelectedModel(null);
    setModels([]);
    localStorage.clear();
    router.back();
  };

  return (
    <>
      {showPrice && (
        <Button
          variant="contained"
          onClick={clearSearch}
          style={{ textTransform: "none" }}
          sx={{
            m: 1,
            width: 155,
            bgcolor: "#5D01BE",
            "&:hover": {
              backgroundColor: "#45018C",
            },
          }}
        >
          Voltar
        </Button>
      )}
    </>
  );
}
