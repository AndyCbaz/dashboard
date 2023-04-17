import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";

import FormControl from "@mui/material/FormControl";
import { themeColors } from "../../helpers/theme/theme.colors";

export const SearchSection = () => {
  return (
    <FormControl variant="standard" sx={{ flexGrow: 1 }}>
      <Input
        sx={{
          border: { sm: "none", xs: "solid" },
          borderColor: { xs: themeColors.BLUE1 },
          borderRadius: 2,
          p: 0.5,
          // "&:hover": {color: themePalette.GREEN_C}
        }}
        id="input-search"
        disableUnderline
        placeholder="Buscar..."
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon
              sx={{
                
                borderRadius: 3,
                scale: "130%",
                minWidth: 0,
                color: themeColors.BLUE1,
              }}
            />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
