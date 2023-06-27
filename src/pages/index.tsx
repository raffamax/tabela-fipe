import Head from "next/head";
import MakeSelect from "../components/MakeSelect";
import ModelSelect from "../components/ModelSelect";
import YearSelect from "../components/YearSelect";
import ButtonSearch from "@/components/ButtonSearch";
import { Box, Typography } from "@mui/material";
import BoxContainer from "@/components/BoxContainer";

export default function Home() {


  return (
    <>
      <Head>
        <title>Consulta | Tabela Fipe</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="car-wash.png" />
      </Head>
      <Box
        sx={{
          m: 5,
          p: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F9F6FC",
        }}
      >
        <Typography
          variant="h4"
          component={"h2"}
          fontWeight={600}
          sx={{color: "#424242"}}
        >
          Tabela Fipe
        </Typography>
        <Typography
          variant="h5"
          component={"h2"}
          fontWeight={700}
          sx={{color: "#424242"}}
        >
          Consulte o valor de um veículo de forma gratuita
        </Typography>

        <BoxContainer>
          <MakeSelect />
          <ModelSelect />
          <YearSelect />

          <ButtonSearch />
        </BoxContainer>
      </Box>
    </>
  );
}
