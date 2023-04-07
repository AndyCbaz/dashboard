import React, {useEffect} from "react";
import SignalWifi0BarIcon from "@mui/icons-material/SignalWifi0Bar";
import SignalWifi1BarIcon from "@mui/icons-material/SignalWifi1Bar";
import SignalWifi2BarIcon from "@mui/icons-material/SignalWifi2Bar";
import SignalWifi3BarIcon from "@mui/icons-material/SignalWifi3Bar";
import SignalWifi4BarIcon from "@mui/icons-material/SignalWifi4Bar";
import { Box } from "@mui/material";


interface props  {
    value: number,
}

const RatingCustom = (props: props) => {
  const [signalValue, setSignalValue] = React.useState(0);

useEffect(()=>{
setSignalValue(props.value)
},[props.value]);
  
  return (
    <Box sx={{display:'flex'}}>
      {signalValue === 0 ? (
        <SignalWifi0BarIcon />
      ) : signalValue === 1 ? (
        <SignalWifi1BarIcon />
      ) : signalValue === 2 ? (
        <SignalWifi2BarIcon />
      ) : signalValue === 3 ? (
        <SignalWifi3BarIcon />
      ) : (
        <SignalWifi4BarIcon />
      )}
    </Box>
  );
};

export default RatingCustom;
