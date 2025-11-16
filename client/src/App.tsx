import { Box, Typography, useTheme } from "@mui/material";
import Header from "./components/Header";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./api/helpers";
import Controllers from "./components/Controllers";
import { FilesList } from "./components/FilesList";

const App = () => {
  const theme = useTheme();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["files"],
    queryFn: fetchData,
  });

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
        <Controllers />
        <FilesList files={data} />
      </Box>
    </Box>
  );
};

export default App;
