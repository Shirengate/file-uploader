import {
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback, useState } from "react";
import { FileModal } from "./Modal";

const Header = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
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
          <IconButton onClick={handleOpen}>
            <EditIcon color={"secondary"} />
          </IconButton>
        </Tooltip>
      </Stack>
      <FileModal open={open} onClose={handleClose} />
    </>
  );
};

export default Header;
