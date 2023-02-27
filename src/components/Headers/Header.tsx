import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import React from "react";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Header = (): JSX.Element => {
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container>
          <div className="header-body">
            {/* Card stats */}
            <TableRow>
              <Grid>
                <Card className="card-stats mb-4 mb-xl-0">
                  <TableRow>
                    <div className="col">
                      <Typography>Traffic</Typography>
                      <span className="h2 font-weight-bold mb-0">350,897</span>
                    </div>
                    <Grid className="col-auto">
                      <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i className="fas fa-chart-bar" />
                      </div>
                    </Grid>
                  </TableRow>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-success mr-2">
                      <i className="fa fa-arrow-up" /> 3.48%
                    </span>{" "}
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </Card>
              </Grid>
              <Grid>
                <Card className="card-stats mb-4 mb-xl-0">
                  <TableRow>
                    <div className="col">
                      <Typography>New users</Typography>
                      <span className="h2 font-weight-bold mb-0">2,356</span>
                    </div>
                    <Grid className="col-auto">
                      <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                        <i className="fas fa-chart-pie" />
                      </div>
                    </Grid>
                  </TableRow>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-danger mr-2">
                      <i className="fas fa-arrow-down" /> 3.48%
                    </span>{" "}
                    <span className="text-nowrap">Since last week</span>
                  </p>
                </Card>
              </Grid>
              <Grid>
                <Card className="card-stats mb-4 mb-xl-0">
                  <TableRow>
                    <div className="col">
                      <Typography>Sales</Typography>
                      <span className="h2 font-weight-bold mb-0">924</span>
                    </div>
                    <Grid className="col-auto">
                      <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                        <i className="fas fa-users" />
                      </div>
                    </Grid>
                  </TableRow>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-warning mr-2">
                      <i className="fas fa-arrow-down" /> 1.10%
                    </span>{" "}
                    <span className="text-nowrap">Since yesterday</span>
                  </p>
                </Card>
              </Grid>
              <Grid>
                <Card className="card-stats mb-4 mb-xl-0">
                  <TableRow>
                    <div className="col">
                      <Typography>Performance</Typography>
                      <span className="h2 font-weight-bold mb-0">49,65%</span>
                    </div>
                    <Grid className="col-auto">
                      <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                        <i className="fas fa-percent" />
                      </div>
                    </Grid>
                  </TableRow>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-success mr-2">
                      <i className="fas fa-arrow-up" /> 12%
                    </span>{" "}
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </Card>
              </Grid>
            </TableRow>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
