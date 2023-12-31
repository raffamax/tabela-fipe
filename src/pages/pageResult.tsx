import Head from "next/head";
import Result from "../components/Result";
import { Box } from "@mui/material";
import ButtonClear from "@/components/ButtonClear";

const PageResult = () => {
  return (
    <>
    <Head>
    <title>Resultado | Tabela Fipe</title>
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
        backgroundColor: "#DCF5F2",
        "@media (max-width: 700px)": {
          mx: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Result />
      <ButtonClear />
    </Box>
    </>
  );
};

export default PageResult;
