import {
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback, useState, type FC } from "react";
import type { BaseModalProps } from "@/core";

interface HeaderProps {
  ModalWindow: FC<BaseModalProps>;
}
export const Header: FC<HeaderProps> = ({ ModalWindow }) => {
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
      <ModalWindow onClose={handleClose} open={open} />
    </>
  );
};
