import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Iframe from "react-iframe";
import axios from "axios";

interface Data {
  id: number;
  date: string;
  description: string;
  messageCustomer: string;
  messageHost: string;
  status: string;
}

interface IReport {
  data: Data[];
}

export default function Report() {
  const [openCards, setOpenCards] = useState<boolean[]>([]);
  const [data, setData] = useState<IReport>();

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://swpbirdboardingv1.azurewebsites.net/api/Bookings/GetBookingReportList?bookingid=1&pagesize=50&pagenumber=1",
    })
      .then((rs) => {
        setData(rs.data);
        setOpenCards(new Array(rs.data.data.length).fill(false));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCardClick = (index: number) => {
    setOpenCards((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <div style={{ height: "600px", overflowY: "scroll" }}>
      {data?.data.map((item, index) => {
        const isOpen = openCards[index];
        return (
          <Card
            key={index}
            sx={{
              minWidth: 700,
              border: "1px solid rgba(211,211,211,0.6)",
              marginBottom: "15px",
            }}
          >
            <CardHeader
              title={item.date.split('T')[0]}
              action={
                <IconButton
                  onClick={() => handleCardClick(index)}
                  aria-label="expand"
                  size="small"
                >
                  {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              }
            ></CardHeader>
            <div style={{ backgroundColor: "rgba(211,211,211,0.4)" }}>
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <CardContent style={{ height: "500px" }}>
                  <Container sx={{ height: 36, lineHeight: 2 }}>
                    <Typography
                      sx={{ fontWeight: "bold", marginBottom: "20px" }}
                    >
                      {item.description}
                    </Typography>
                    <Iframe
                      url="https://www.sdrive.app/embed/1ptBQD"
                      width="640px"
                      height="320px"
                      id=""
                      className=""
                      display="block"
                      position="relative"
                    />
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        sx={{ fontWeight: "bold", marginTop: "20px" }}
                      >
                        Host:
                      </Typography>
                      <Typography
                        sx={{ marginTop: "20px", marginLeft: "10px" }}
                      >
                        {item.messageHost}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex" }}>
                      <Typography
                        sx={{ fontWeight: "bold", marginTop: "20px" }}
                      >
                        Customer:
                      </Typography>
                      <Typography
                        sx={{ marginTop: "20px", marginLeft: "10px" }}
                      >
                        Hello
                      </Typography>
                    </Box>
                  </Container>
                </CardContent>
              </Collapse>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
