import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AppBar from "../Appbar/Appbar";
import Footer from "../Footer/Footer";
import { Box } from "@mui/system";
interface Article {
  id: number;
  title: string;
  imageUrl: string;
}

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://swpbirdboardingv1.azurewebsites.net/api/Home/GetArticle"
        );
        setArticles(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <AppBar />
      <Box sx={{ pt: 8, pb: 6 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Bài viết cửa hàng
        </Typography>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={article.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  style={{ height: "300px" }}
                  component="img"
                  height="40"
                  src={article.imageUrl}
                  alt="green iguana"
                />
                <Typography variant="h4" color="primary" sx={{ flexGrow: 1 }}>
                  {article.title}
                </Typography>
                <Link
                  to={`/article/${article.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Read More
                  </Typography>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};
export default ArticleList;
