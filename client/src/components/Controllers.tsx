import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  type SelectChangeEvent,
} from "@mui/material";
import { memo, useState, type ChangeEvent, type FC } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { FILE_CATEGORY } from "../consts/media-types";
type FilesFilters = "any" | "docs" | "media";
interface ControllersProps {
  changeValue: (filterValue: FilesFilters) => void;
}
const Controllers: FC<ControllersProps> = ({ changeValue }) => {
  const [isFocused, setIsFocused] = useState(false);

  const changeValue2 = (e: SelectChangeEvent) => {
    const type = e.target.value as FilesFilters;
    changeValue(type);
  };
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
          onChange={changeValue2}
          labelId="filter-select-label"
          id="filter-select"
          label="Категория"
          defaultValue=""
        >
          <MenuItem value="any">Все</MenuItem>
          <MenuItem value={FILE_CATEGORY.DOCS}>Документы</MenuItem>
          <MenuItem value={FILE_CATEGORY.MEDIA}>Медиа</MenuItem>
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

export default memo(Controllers);
