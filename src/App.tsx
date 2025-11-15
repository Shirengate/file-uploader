import { Box, useTheme } from "@mui/material";
import Header from "./components/Header";
const App = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        color: theme.palette.primary.contrastText,
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
        }}
      >
        <Header />
      </Box>
    </Box>
  );
};

export default App;
