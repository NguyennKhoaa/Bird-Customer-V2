import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Detail() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6} columns={2}>
          <Grid xs={12}>
            <Item>1</Item>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid xs={12}>
            <Item>1</Item>
          </Grid>
          <Grid xs={12}>
            <Item>1</Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
