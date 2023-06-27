import * as React from "react";
import Box, { BoxProps } from "@mui/material/Box";

export default function BoxContainer(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 2,
        m: 1,
        boxShadow: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "white",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        minWidth: 350,
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
      {...other}
    />
  );
}
