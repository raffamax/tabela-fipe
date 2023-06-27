import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export interface Make {
  label: string;
  id: number;
}

export interface Model {
  label: string;
  id: number;
}

export interface Year {
  id: string;
  label: string;
}

export interface CarDataProviderProps {
  children: React.ReactNode;
}

export interface CarDataContextProps {
  makes: Make[];
  selectedMake: Make | null;
  selectedModel: Model | null;
  selectedYear: Year | null;
  models: Model[];
  years: Year[];
  price: string;
  showPrice: boolean;
  setMakes: (makes: Make[]) => void;
  setSelectedMake: (make: Make | null) => void;
  setSelectedModel: (model: Model | null) => void;
  setSelectedYear: (year: Year | null) => void;
  setModels: (models: Model[]) => void;
  setYears: (years: Year[]) => void;
  setPrice: (price: string) => void;
  setShowPrice: (showPrice: boolean) => void;
  handleChangeMake: (make: Make | null) => void;
  handleChangeModel: (model: Model | null) => void;
  handleChangeYear: (year: Year | null) => void;
}

export const CarDataContext = createContext<CarDataContextProps>(
  {} as CarDataContextProps
);

export const CarDataProvider: React.FC<CarDataProviderProps> = ({
  children,
}) => {
  const [makes, setMakes] = useState<Make[]>([]);
  const [selectedMake, setSelectedMake] = useState<Make | null>(null);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [years, setYears] = useState<Year[]>([]);
  const [selectedYear, setSelectedYear] = useState<Year | null>(null);
  const [price, setPrice] = useState<string>("");
  const [showPrice, setShowPrice] = useState(false);

  useEffect(() => {
    const storedResult = localStorage.getItem("searchResult");
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult);
      setSelectedMake(parsedResult.selectedMake);
      setSelectedModel(parsedResult.selectedModel);
      setSelectedYear(parsedResult.selectedYear);
      setPrice(parsedResult.price);
      setShowPrice(parsedResult.showPrice);
    }

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

  function handleChangeYear(newYear: Year | null) {
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

  return (
    <CarDataContext.Provider
      value={{
        makes,
        selectedMake,
        selectedModel,
        selectedYear,
        models,
        years,
        price,
        showPrice,
        setMakes,
        setSelectedMake,
        setSelectedModel,
        setSelectedYear,
        setModels,
        setYears,
        setPrice,
        setShowPrice,
        handleChangeMake,
        handleChangeModel,
        handleChangeYear,
      }}
    >
      {children}
    </CarDataContext.Provider>
  );
};
