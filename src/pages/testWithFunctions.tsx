import Head from "next/head";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

interface Make {
  label: string;
  id: number;
}

interface Model {
  label: string;
  id: number;
}

interface Year {
  id: string;
  label: string;
}

export default function testWithFunctions() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState<Make | null>(null);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState<Year | null>(null);
  const [price, setPrice] = useState<string>("");
  const [showPrice, setShowPrice] = useState(false);

  useEffect(() => {
    axios
      .get("https://parallelum.com.br/fipe/api/v1/carros/marcas")
      .then((response) => {
        setMakes(
          response.data.map((make: { codigo: string; nome: string }) => {
            return {
              label: make.nome,
              id: Number(make.codigo),
            };
          })
        );
      });
  }, []);

  function handleChangeMake(newMake: Make | null) {
    setSelectedMake(newMake);
    setShowPrice(false);
    setPrice("");
    setSelectedYear(null);
    setYears([]);
    setSelectedModel(null);
    setModels([]);
    if (newMake) {
      axios
        .get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${newMake?.id}/modelos`
        )
        .then((response) => {
          const newModels = response.data.modelos.map(
            (model: { codigo: string; nome: string }) => {
              return {
                label: model.nome,
                id: Number(model.codigo),
              };
            }
          );
          setModels(newModels);
        });
    }
  }

  function handleChangeModel(newModel: Model | null) {
    setSelectedModel(newModel);
    setYears([]);
    setSelectedYear(null);
    setPrice("");
    setShowPrice(false);
    if (selectedMake && newModel) {
      axios
        .get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedMake?.id}/modelos/${newModel?.id}/anos`
        )
        .then((response) => {
          setYears(
            response.data.map((year: { codigo: string; nome: string }) => {
              return {
                label: year.nome,
                id: year.codigo,
              };
            })
          );
        });
    }
  }

  function hangleChangeYear(newYear: Year | null) {
    setSelectedYear(newYear);
    setPrice("");
    setShowPrice(false);
    if (selectedMake && selectedModel && newYear) {
      axios
        .get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedMake?.id}/modelos/${selectedModel?.id}/anos/${newYear.id}`
        )
        .then((response) => {
          setPrice(response.data.Valor);
        });
    }
  }

  const handleSearch = () => {
    if (selectedYear) {
      setShowPrice(true);
    }
  };

  const clearSearch = () => {
    setSelectedMake(null);
    setShowPrice(false);
    setPrice("");
    setSelectedYear(null);
    setYears([]);
    setSelectedModel(null);
    setModels([]);
  };

  return (
    <>
      <Head>
        <title>Tabela Fipe</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="car-wash.png" />
      </Head>
      <main style={{ fontFamily: "Roboto, sans-serif" }}>
        <h1>Tabela Fipe</h1>
        <h3>Consulte o valor de um veículo de forma gratuita</h3>
        <Autocomplete
          id="makes"
          options={makes}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Marca" />}
          value={selectedMake}
          onChange={(event: any, newMake: Make | null) => {
            handleChangeMake(newMake);
          }}
        />
        <Autocomplete
          id="models"
          options={models}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Modelo" />}
          disabled={!selectedMake}
          value={selectedModel}
          onChange={(event: any, newModel: Model | null) => {
            handleChangeModel(newModel);
          }}
        />
        {selectedModel && (
          <Autocomplete
            id="years"
            options={years}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Ano" />}
            value={selectedYear}
            onChange={(event: any, newYear: Year | null) => {
              hangleChangeYear(newYear);
            }}
          />
        )}
        <Button
          variant="contained"
          disabled={!selectedYear}
          onClick={handleSearch}
        >
          Consultar Preço
        </Button>

        {showPrice && (
          <Button variant="contained" onClick={clearSearch}>
            Limpar
          </Button>
        )}

        {showPrice && (
          <p>
            Tabela Fipe: Preço {selectedMake?.label} {selectedModel?.label} ano{" "}
            {selectedYear?.label} {price}
          </p>
        )}
      </main>
    </>
  );
}
