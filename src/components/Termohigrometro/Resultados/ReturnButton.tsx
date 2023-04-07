import Button from "@mui/material/Button/Button";
import { Box } from "@mui/system";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";

export const ReturnButton = () => {
  return (
    <Box>
      <Button component={Link} to="/" variant="outlined" startIcon={<ArrowBackIcon />}>
        Dispositivos
      </Button>
    </Box>
  );
};
