import React, {useEffect} from "react";
import SignalWifi0BarIcon from "@mui/icons-material/SignalWifi0Bar";
import SignalWifi1BarIcon from "@mui/icons-material/SignalWifi1Bar";
import SignalWifi2BarIcon from "@mui/icons-material/SignalWifi2Bar";
import SignalWifi3BarIcon from "@mui/icons-material/SignalWifi3Bar";
import SignalWifi4BarIcon from "@mui/icons-material/SignalWifi4Bar";
import { Box } from "@mui/material";
import { themeColors } from "../../../helpers/theme/theme.colors";
import Typography from "@mui/material/Typography";


interface props  {
    value: number,
}

const RatingCustom = (props: props) => {
  const [signalValue, setSignalValue] = React.useState(0);

useEffect(()=>{
setSignalValue(props.value)
},[props.value]);
  
  return (
    <Box sx={{display:"flex"}}  >
      {(signalValue >= 0) && (signalValue < 10) ? (
        <>
        <Typography sx={{color: themeColors.RED3}}>{`${signalValue}%`}</Typography>
        <SignalWifi0BarIcon sx={{color: themeColors.RED3}}/>
        <Typography sx={{color:themeColors.RED3}}>!</Typography>
        </>
      ) : (signalValue >= 10) && (signalValue < 25) ? (
        <>
        <Typography sx={{color: themeColors.RED3}}>{`${signalValue}%`}</Typography>
        <SignalWifi1BarIcon sx={{color: themeColors.RED3}}/>
        
        </>
      ) : (signalValue >= 25) && (signalValue < 51) ? (
        <>
        <Typography >{`${signalValue}%`}</Typography>
        <SignalWifi2BarIcon />
        </>
      ) : (signalValue >= 5) && (signalValue < 91) ? (
        <>
        <Typography >{`${signalValue}%`}</Typography>
        <SignalWifi3BarIcon />
        </>
      ) : (
        <>
        <Typography >{`${signalValue}%`}</Typography>
        <SignalWifi4BarIcon />
        </>
      )}
    </Box>
  );
};

export default RatingCustom;
