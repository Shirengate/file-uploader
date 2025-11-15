import {
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
const Header = () => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        bgcolor: theme.palette.primary.main,
        padding: 2,
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">File picker</Typography>
      <Tooltip title={"Upload file"}>
        <IconButton>
          <EditIcon color={"secondary"} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default Header;
