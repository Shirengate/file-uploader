import { Box, useTheme } from "@mui/material";
import Header from "./components/Header";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./api/helpers";
import Controllers from "./components/Controllers";
import { FilesList } from "./components/FilesList";
import { useCallback, useMemo, useState } from "react";
import { getFileType } from "./utils/getIcons";
import { FILE_TYPE_CATEGORIES } from "./consts/media-types";
import type { UploadedFile } from "./components/Files/model/types";
type FilesFilters = "any" | "docs" | "media";

const App = () => {
  const theme = useTheme();

  const [filter, setFilter] = useState<FilesFilters>("any");

  const changeFilterValue = useCallback((filterValue: FilesFilters) => {
    setFilter(filterValue);
  }, []);
  const { data, isError, isLoading } = useQuery<UploadedFile[]>({
    queryKey: ["files"],
    queryFn: fetchData,
  });

  const filteredData = useMemo(() => {
    if (!data || filter === "any") return data;
    return data.filter((item) => {
      const type = getFileType(item.name);

      const resolvedExt = FILE_TYPE_CATEGORIES[filter];
      if (resolvedExt.includes(type as never)) {
        return item;
      }
    });
  }, [data, filter]);
  console.log(data);
  return (
    <Box
      sx={{
        color: theme.palette.primary.contrastText,
        bgcolor: "lightgray",
        p: "10px",
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          borderRadius: "20px",
          boxShadow: 5,
          minHeight: "100vh",
          height: "100%",
          width: "100%",
          bgcolor: "white",
        }}
      >
        <Header />
        <Controllers changeValue={changeFilterValue} />
        <FilesList files={filteredData} />
      </Box>
    </Box>
  );
};

export default App;
