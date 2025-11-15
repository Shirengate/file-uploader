import AttachFileIcon from "@mui/icons-material/AttachFile";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import type { FC } from "react";

interface FileProps {
  file: File;
  isDownloaded: boolean;
}

export const File: FC<FileProps> = ({ file, isDownloaded }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{
        p: 1,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <AttachFileIcon
        color="action"
        fontSize={isDownloaded ? "small" : "large"}
      />

      <Paper
        variant="outlined"
        sx={{
          flex: 1,
          py: 1,
          px: 2,
          backgroundColor: "transparent",
          minWidth: 0,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          noWrap
        >
          {file.name}
        </Typography>
      </Paper>

      <Stack direction="row" spacing={0.5}>
        <IconButton size={isDownloaded ? "small" : "large"} color="primary">
          <DeleteIcon fontSize={isDownloaded ? "small" : "large"} />
        </IconButton>
        {isDownloaded && (
          <>
            <IconButton size={isDownloaded ? "small" : "large"} color="primary">
              <FileDownloadIcon fontSize={isDownloaded ? "small" : "large"} />
            </IconButton>
            <IconButton size={isDownloaded ? "small" : "large"} color="primary">
              <OpenInFullIcon fontSize={isDownloaded ? "small" : "large"} />
            </IconButton>
          </>
        )}
      </Stack>
    </Stack>
  );
};
