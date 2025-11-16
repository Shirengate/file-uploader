import FileDownloadIcon from "@mui/icons-material/FileDownload";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { IconButton, Stack } from "@mui/material";
import type { FC } from "react";
import { BaseFile } from "./BaseFile";
import type { UploadedFile } from "../model/types";

export const ProfileFile: FC<UploadedFile> = ({ name, url }) => {
  return (
    <BaseFile
      fileName={name}
      iconSize="medium"
      actions={
        <Stack direction="row" spacing={0.5}>
          <IconButton size={"medium"} color="primary">
            <FileDownloadIcon fontSize={"medium"} />
          </IconButton>
          <IconButton size={"medium"} color="primary">
            <OpenInFullIcon fontSize={"medium"} />
          </IconButton>
        </Stack>
      }
    />
  );
};
