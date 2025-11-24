import { Box, useTheme } from "@mui/material";
import { Header } from "@/components/header";
import Controllers from "@/components/controller";
import { FilesList } from "@/modules/files-profile/";
import { useCallback, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FileModal } from "@/modules/upload-files/";

type FilesFilters = "any" | "docs" | "media";

const RootPage = () => {
  const theme = useTheme();

  const [filter, setFilter] = useState<FilesFilters>("any");

  const changeFilterValue = useCallback((filterValue: FilesFilters) => {
    setFilter(filterValue);
  }, []);

  return (
    <>
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
          <Header ModalWindow={FileModal} />
          <Controllers changeValue={changeFilterValue} />
          <FilesList filter={filter} />
        </Box>
      </Box>
      <Toaster />
    </>
  );
};

export default RootPage;
