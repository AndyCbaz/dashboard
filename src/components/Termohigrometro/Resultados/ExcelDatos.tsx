import React from "react";
import { Box } from "@mui/system";
import MUIDataTable from "mui-datatables";
import { Button } from "@mui/material";
import BorderAllIcon from '@mui/icons-material/BorderAll';

type Props = {
  label: string;
};

export const ExcelDatos: React.FC<Props> = ({ label }) => {
  const optionsExcel: any = {
    filterType: "multiselect",
    download: false,
    rowsPerPage: 8,
    rowsPerPageOptions: [8, 25, 100],
    responsive: "standard",
  };
  //Columns
  const columns = [
    { name: label, label: label, option: { filter: true, sort: false } },
    { name: "fecha", label: "Fecha", option: { filter: true, sort: true } },
    { name: "Hora", label: "Cédula", option: { filter: true, sort: false } },
    // { name: "peso", label: "Peso", option: { filter: true, sort: true } },
  ];
  return (
    <Box
      sx={{ p: 2, boxShadow: "none", display: "flex", flexDirection: "column", gap:2 }}
    >
      {" "}
      <Box sx={{display:'flex', justifyContent:'start'}}>
        <Button startIcon={<BorderAllIcon/>}>Descargar</Button>
      </Box>
      <MUIDataTable
        title={label}
        data={[{}]}
        columns={columns}
        options={optionsExcel}
      />

    </Box>
  );
};
