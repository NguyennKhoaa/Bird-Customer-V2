import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import logo from "../../images/luffy.jpg";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";

interface Data {
  hostId: string;
  hostName: string;
  hostImage: string;
  price: number;
  unit: string;
  amount: number;
  description: string;
  service: [];
}

interface ICarousel {
  statusCode: string;
  content: string;
  data: Data[];
}

export default function CardCarousel(props: any) {
  // const [data, setData] = useState<ICarousel>();
  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: "https://swpbirdboardingv1.azurewebsites.net/api/Home/GetHostList?pagesize=10&pagenumber=1",
  //   })
  //     .then((rs) => {
  //       console.log(rs.data);

  //       setData(rs.data);
  //     })
  //     .catch();
  // }, []);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div style={{ marginLeft: "30px" }}>
      <Carousel responsive={responsive}>
        {/* {data?.data.map((item, index) => {
          return <div>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                style={{ height: "300px" }}
                component="img"
                height="40"
                src={logo}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.hostName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Box style={{ display: "flex" }}>
                  <Box>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        paddingTop: "15px",
                      }}
                    >
                      {item.price}K/{item.unit}
                    </Typography>
                  </Box>
                  <Box>
                    <Box
                      style={{
                        display: "flex",
                        paddingTop: "15px",
                        paddingLeft: "50px",
                      }}
                    >
                      <Box style={{ color: "orange" }}>
                        <StarIcon />
                      </Box>
                      <Box>
                        <Typography style={{ marginTop: "4px" }}>
                          4.6
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        })} */}

        <div>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                style={{ height: "300px" }}
                component="img"
                height="40"
                src={logo}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  CLB Chim cảnh Thủ Đức
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  100 lồng | Sân thoáng mát
                </Typography>
                <Box style={{ display: "flex" }}>
                  <Box>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        paddingTop: "15px",
                      }}
                    >
                      100K/ngày
                    </Typography>
                  </Box>
                  <Box>
                    <Box
                      style={{
                        display: "flex",
                        paddingTop: "15px",
                        paddingLeft: "50px",
                      }}
                    >
                      <Box style={{ color: "orange" }}>
                        <StarIcon />
                      </Box>
                      <Box>
                        <Typography style={{ marginTop: "4px" }}>
                          4.6
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                style={{ height: "300px" }}
                component="img"
                height="40"
                src={logo}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  CLB Chim cảnh Thủ Đức
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  100 lồng | Sân thoáng mát
                </Typography>
                <Box style={{ display: "flex" }}>
                  <Box>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        paddingTop: "15px",
                      }}
                    >
                      100K/ngày
                    </Typography>
                  </Box>
                  <Box>
                    <Box
                      style={{
                        display: "flex",
                        paddingTop: "15px",
                        paddingLeft: "50px",
                      }}
                    >
                      <Box style={{ color: "orange" }}>
                        <StarIcon />
                      </Box>
                      <Box>
                        <Typography style={{ marginTop: "4px" }}>
                          4.6
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                style={{ height: "300px" }}
                component="img"
                height="40"
                src={logo}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  CLB Chim cảnh Thủ Đức
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  100 lồng | Sân thoáng mát
                </Typography>
                <Box style={{ display: "flex" }}>
                  <Box>
                    <Typography
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        paddingTop: "15px",
                      }}
                    >
                      100K/ngày
                    </Typography>
                  </Box>
                  <Box>
                    <Box
                      style={{
                        display: "flex",
                        paddingTop: "15px",
                        paddingLeft: "50px",
                      }}
                    >
                      <Box style={{ color: "orange" }}>
                        <StarIcon />
                      </Box>
                      <Box>
                        <Typography style={{ marginTop: "4px" }}>
                          4.6
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Carousel>
    </div>
  );
}
