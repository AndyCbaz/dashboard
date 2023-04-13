import Card from "@mui/material/Card/Card";
import CardActionArea from "@mui/material/CardActionArea/CardActionArea";
import React from "react";
import Lottie from "lottie-react";
import CardContent from "@mui/material/CardContent/CardContent";
import Typography from "@mui/material/Typography";
import { themeColors } from "../../../helpers/theme/theme.colors";
import { Box } from "@mui/material";
// import { CircleSlider } from "./CircleSlider";
// import { Link } from "react-router-dom";

interface CardProp {
  variable: string;
  valor: number;
  unidad: string;
  setLabel: any;
}

export const CardVariables: React.FC<CardProp> = ({
  variable,
  valor,
  unidad,
  setLabel,
}) => {
  return (
    <Card
      key={1}
      sx={{
        display: "flex",
        boxShadow: 8,
        borderRadius: 5,
        width: "100%",
        background: themeColors.WHITE,
      }}
    >
      <CardActionArea
        onClick={() => setLabel(variable)}
        sx={{ display: "flex" }}
      >
        <CardContent
          sx={{
            // border: "solid",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <Box sx={{textAlign:'center'}}>
              <Typography
                sx={{
                  // border: "solid",
                  borderRadius: 4,
                  color: themeColors.BLUE1,
                  p: 1,
                  textAlign: "center",
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                {variable}
              </Typography>
              {/* <Typography>Valor Actual</Typography> */}
            </Box>
            {/* <CircleSlider valor={valor} circleWidth={100} unidad={unidad} /> */}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
