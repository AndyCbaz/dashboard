import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import MUIDataTable from "mui-datatables";
import { Button } from "@mui/material";
import BorderAllIcon from "@mui/icons-material/BorderAll";
// Excel
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
//time
import date from "date-and-time";

type Props = {
  data: any;
};

export const ExcelDatos: React.FC<Props> = ({ data }) => {
  ////Parametros de la exportacion a EXCEL
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  // Declaro una constante reactiva para almacenar el objeto que exportare a excel
  const [excelValores, setExcelValores] = useState([]);

  ////Funcion para exportar datos a Excel
  const exportToCSV = (apiData: any, fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  ////Accion del boton descargar Excel
  const storeTemp = () => {
    exportToCSV(excelValores, "Datos Exportados");
  };
  //excel
  const optionsExcel: any = {
    filterType: "multiselect",
    download: false,
    rowsPerPage: 8,
    rowsPerPageOptions: [8],
    responsive: "standard",
  };
  //Columns
  const columns = [
    {
      name: "temperatura",
      label: "Temperatura",
      option: { filter: true, sort: false },
    },
    {
      name: "humedad",
      label: "Humedad",
      option: { filter: true, sort: false },
    },
    { name: "fecha", label: "Fecha", option: { filter: true, sort: true } },
    // { name: "Hora", label: "Cédula", option: { filter: true, sort: false } },
    // { name: "peso", label: "Peso", option: { filter: true, sort: true } },
  ];
 
  useEffect(() => {
    setExcelValores(data);
  }, []);
  return (
    <Box
      sx={{
        p: 2,
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {" "}
      <Box sx={{ display: "flex", justifyContent: "start" }}>
        <Button onClick={() => storeTemp()} startIcon={<BorderAllIcon />}>
          Descargar
        </Button>
      </Box>
      <MUIDataTable
        title={"Temperatura y Humedad"}
        data={excelValores}
        columns={columns}
        options={optionsExcel}
      />
    </Box>
  );
};
