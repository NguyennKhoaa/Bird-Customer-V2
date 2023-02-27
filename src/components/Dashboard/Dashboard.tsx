import React from "react";
import { Container, Grid } from "@mui/material";
import TotalTK from "./TotalTK";
import Layout from "../Appbar/Layout";
import Appbar from "../Appbar/Appbar";

const Dashboard = (): JSX.Element => {
  return (
    <Layout>
      <Appbar />
      <Container fixed style={{ marginTop: "75px", marginLeft: "70px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <TotalTK />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TotalTK />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TotalTK />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TotalTK />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Dashboard;
