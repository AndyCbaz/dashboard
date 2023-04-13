import React from "react";
import Battery0BarIcon from "@mui/icons-material/Battery0Bar";
import BatteryCharging20Icon from "@mui/icons-material/BatteryCharging20";
import BatteryCharging50Icon from "@mui/icons-material/BatteryCharging50";
import BatteryCharging80Icon from "@mui/icons-material/BatteryCharging80";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import { Box } from "@mui/material";
import { themeColors } from "../../../helpers/theme/theme.colors";
import Typography from "@mui/material/Typography";

interface props {
  value: number;
}

export const BatteryLevel = (props: props) => {
  const [batteryValue, setBatteryValue] = React.useState(0);

  React.useEffect(() => {
    setBatteryValue(props.value);
  }, [props.value]);

  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      {batteryValue >= 0 && batteryValue < 10 ? (
        <>
          <Typography sx={{ color: themeColors.RED3 }}>
            {`${batteryValue}%`}
          </Typography>
          <Battery0BarIcon sx={{ color: themeColors.RED3 }} />
          <Typography sx={{ color: themeColors.RED3 }}>!</Typography>
        </>
      ) : batteryValue >= 10 && batteryValue < 25 ? (
        <>
          
          <Typography sx={{ color: themeColors.RED3 }}>
            {`${batteryValue}%`}
          </Typography>
          <BatteryCharging20Icon sx={{ color: themeColors.RED3 }} />
          
        </>
      ) : batteryValue >= 25 && batteryValue < 51 ? (
        <>
          
          <Typography >
            {`${batteryValue}%`}
          </Typography>
          <BatteryCharging50Icon  />
          
        </>
      ) : batteryValue >= 50 && batteryValue < 91 ? (
        <>
          
          <Typography >
            {`${batteryValue}%`}
          </Typography>
          <BatteryCharging80Icon  />
          
        </>
      ) : (
        <>
          
          <Typography >
            {`${batteryValue}%`}
          </Typography>
          <BatteryChargingFullIcon  />
          
        </>
      )}
    </Box>
  );
};
