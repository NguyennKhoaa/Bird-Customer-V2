import React from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

export default function GiamGia() {
  return (
    <Card
      style={{
        boxShadow: "none",
        textAlign: "left",
        backgroundColor: "whitesmoke",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: "grey.800",
        }}
      >
        <Typography gutterBottom variant="h4" style={{ paddingTop: "40px" }}>
          Giảm giá 30% cho lần hẹn đầu tiên!
        </Typography>

        <Typography
          variant="body2"
          sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: "auto" }}
        >
          Liên hệ với chúng tôi ngay bây giờ và đặt một cuộc hẹn ngày hôm nay
        </Typography>
      </CardContent>

      <Box>
        <Button style={{ background: "orange" }} variant="contained">
          Hẹn gặp ngay
        </Button>
      </Box>
    </Card>
  );
}
