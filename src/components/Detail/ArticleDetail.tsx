import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Appbar from "../Appbar/Appbar";
import Footer from "../Footer/Footer";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { Box, Typography, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
interface Data {
  id: number;
  imageUrl: string;
  title: string;
  status: string;
  description: string;
  dateCreate: string;
}

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDetails, setSelectedDetails] = useState<Data | null>(null);

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://swpbirdboardingv1.azurewebsites.net/api/Home/GetArticleDetail?id=${id}`,
    })
      .then((rs) => {
        console.log(rs.data.data[0]);
        setSelectedDetails(rs.data.data[0]);
      })
      .catch();
  }, []);

  return (
    <>
      <Appbar />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={6}>
          <Card sx={{ maxWidth: 800, width: "80%" }}>
            <CardHeader
              avatar={<Avatar aria-label="author">H</Avatar>}
              title={
                <Typography variant="h4" color="primary">
                  {selectedDetails?.title}
                </Typography>
              }
              subheader="March 23, 2023"
            />
            <CardMedia
              component="img"
              height="300"
              image={selectedDetails?.imageUrl}
              alt="article"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {selectedDetails?.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button size="small" startIcon={<FavoriteIcon />}>
                  Like
                </Button>
                <Button size="small" startIcon={<ShareIcon />}>
                  Share
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default ArticleDetail;
