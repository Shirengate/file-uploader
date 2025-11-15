import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Controllers = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 3,
        alignItems: "center",
      }}
    >
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="filter-select-label">Категория</InputLabel>
        <Select
          labelId="filter-select-label"
          id="filter-select"
          label="Категория"
          defaultValue=""
        >
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="documents">Документы</MenuItem>
          <MenuItem value="images">Изображения</MenuItem>
          <MenuItem value="videos">Видео</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label={"Search File"}
        fullWidth
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color={isFocused ? "primary" : "action"} />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default Controllers;
