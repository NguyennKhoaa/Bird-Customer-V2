import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Modal } from "@mui/material";
import logo from "../../images/luffy.jpg";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";

interface Data {
  id: number;
  imageUrl: string;
  title: string;
  status: string;
  description: string;
  dateCreate: string;
}

interface ICarousel {
  statusCode: string;
  content: string;
  data?: Data[];
}

export default function CardCarousel(props: any) {
  const [data, setData] = useState<Data[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<Data | null>(null);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://swpbirdboardingv1.azurewebsites.net/api/Home/GetArticle",
    })
      .then((rs) => {
        console.log(rs.data.data);

        setData(rs.data.data);
      })
      .catch();
  }, []);

  const responsive = {
    superLargeDesktop: {
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

  const handleCardClick = (id: number) => {
    // Fetch details for the selected card using API call
    axios({
      method: "GET",
      url: `https://swpbirdboardingv1.azurewebsites.net/api/Home/GetArticleDetail?id=${id}`,
    })
      .then((rs) => {
        setSelectedDetails(rs.data.data[0]);
        setSelectedId(id);
      })
      .catch();
  };

  return (
    <div style={{ marginLeft: "30px" }}>
      <Carousel responsive={responsive}>
        {data.length > 0 &&
          data.map((item, index) => {
            return (
              <div key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea onClick={() => handleCardClick(item.id)}>
                    <CardMedia
                      style={{ height: "300px" }}
                      component="img"
                      height="40"
                      src={item.imageUrl}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.title}
                      </Typography>
                      <Box style={{ display: "flex" }}>
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
            );
          })}
      </Carousel>
      <Modal
        open={selectedId !== null}
        onClose={() => setSelectedId(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",

            boxShadow: 24,
            p: 4,
          }}
        >
          {/* imageUrl */}
          <CardMedia
            style={{ height: "300px" }}
            component="img"
            height="40"
            src={selectedDetails?.imageUrl}
            alt="green iguana"
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedDetails?.title}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedDetails?.description}
          </Typography>
          {/* {selectedDetails?.dateCreate} */}
        </Box>
      </Modal>
    </div>
  );
}
