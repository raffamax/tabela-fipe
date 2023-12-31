import Head from "next/head";
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

export default function testWithUseEffect() {
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

  useEffect(() => {
    if (selectedMake) {
      axios
        .get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedMake?.id}/modelos`
        )
        .then((response) => {
          setModels(
            response.data.modelos.map(
              (model: { codigo: string; nome: string }) => {
                return {
                  label: model.nome,
                  id: Number(model.codigo),
                };
              }
            )
          );
        });
    }
  }, [selectedMake]);

  useEffect(() => {
    if (selectedMake && selectedModel) {
      axios
        .get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedMake?.id}/modelos/${selectedModel?.id}/anos`
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
  }, [selectedMake, selectedModel]);

  useEffect(() => {
    if (selectedMake && selectedModel && selectedYear) {
      axios
        .get(
          `https://parallelum.com.br/fipe/api/v1/carros/marcas/${selectedMake?.id}/modelos/${selectedModel?.id}/anos/${selectedYear.id}`
        )
        .then((response) => {
          setPrice(response.data.Valor);
        });
    }
  }, [selectedMake, selectedModel, selectedYear]);

  const handleSearch = () => {
    if (selectedYear) {
      setShowPrice(true);
    }
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
        <Autocomplete
          id="makes"
          options={makes}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Marca" />}
          value={selectedMake}
          onChange={(event: any, newMake: Make | null) => {
            setSelectedMake(newMake);
            setShowPrice(false);
            setPrice("");
            setSelectedYear(null);
            setYears([]);
            setSelectedModel(null);
            setModels([]);
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
            setSelectedModel(newModel);
            setYears([]);
            setSelectedYear(null);
            setPrice("");
            setShowPrice(false);
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
              setSelectedYear(newYear);
              setPrice("");
              setShowPrice(false);
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
          <p>
            Tabela Fipe: Preço {selectedMake?.label} {selectedModel?.label} ano{" "}
            {selectedYear?.label} {price}
          </p>
        )}
      </main>
    </>
  );
}
