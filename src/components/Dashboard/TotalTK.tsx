import React from "react";
import { Box, Card, Typography } from "@mui/material";

const TotalTK = (): JSX.Element => {
  return (
    <Card
      sx={{ display: "flex", alignItems: "center", p: 3, borderRadius: "20px" }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
          Total Active Tour Guide
        </Typography>

        <Typography variant="h3">1000</Typography>
      </Box>
    </Card>
  );
};

export default TotalTK;
