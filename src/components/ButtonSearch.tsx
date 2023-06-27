import React, { useContext } from "react";
import { CarDataContext } from "../Context/CarDataContext";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function ButtonSearch() {
  const router = useRouter();

  const {
    selectedMake,
    selectedModel,
    selectedYear,
    price,
    setShowPrice,
    setPrice,
  } = useContext(CarDataContext);

  const handleSearch = () => {
    if (selectedYear) {
      setPrice(price);
      setShowPrice(true);
      router.push("/pageResult");
    }
    const searchResult = {
      selectedMake,
      selectedModel,
      selectedYear,
      price,
      showPrice: true,
    };
    localStorage.setItem("searchResult", JSON.stringify(searchResult));
  };

  return (
    <>
      <Button
        variant="contained"
        style={{ textTransform: "none" }}
        sx={{
          m: 1,
          bgcolor: "#5D01BE",
          "&:hover": {
            backgroundColor: "#45018C",
          },
        }}
        disabled={!selectedYear}
        onClick={handleSearch}
      >
        Consultar preço
      </Button>
    </>
  );
}
