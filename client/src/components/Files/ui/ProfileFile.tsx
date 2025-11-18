import { Box, Checkbox, IconButton, Stack } from "@mui/material";
import { useState, type FC } from "react";
import { BaseFile } from "./BaseFile";
import type { UploadedFile } from "../model/types";
import { proccessFile } from "../../../utils/process-file";
import { useMutation } from "@tanstack/react-query";
import { DownloadRounded } from "@mui/icons-material";

export const ProfileFile: FC<UploadedFile> = ({
  name,
  url,
  onFileClick,
  isPicked,
}) => {
  const { Icon, extenction } = proccessFile(name);

  const mutation = useMutation({
    mutationFn: (url: string) => {
      return fetch(url);
    },
  });

  const handleGet = async () => {
    await mutation.mutateAsync(url);
    const data = await mutation.data!.blob();

    const handle = await globalThis.showSaveFilePicker({
      suggestedName: name,
      types: [
        {
          accept: {
            [data.type]: [`.${extenction}`],
          },
        },
      ],
    });
    const writable = await handle.createWritable();
    await writable.write(data);
    await writable.close();
  };

  return (
    <BaseFile
      icon={
        isPicked ? (
          <Checkbox
            checked={true}
            onClick={() => {
              if (onFileClick) {
                onFileClick(name, url);
              }
            }}
            size="large"
            sx={{
              p: 0,
            }}
          />
        ) : (
          <Box
            onClick={() => {
              if (onFileClick) {
                onFileClick(name, url);
              }
            }}
            sx={{
              cursor: "pointer",
            }}
          >
            <Icon />
          </Box>
        )
      }
      fileName={name}
      iconSize="medium"
      actions={
        <Stack direction="row" spacing={0.5}>
          <IconButton onClick={handleGet} size={"medium"} color="default">
            <DownloadRounded fontSize={"medium"} />
          </IconButton>
          {/* <IconButton size={"medium"} color="primary">
            <OpenInFullIcon fontSize={"medium"} />
          </IconButton> */}
        </Stack>
      }
    />
  );
};
