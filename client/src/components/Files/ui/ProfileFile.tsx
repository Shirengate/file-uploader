import FileDownloadIcon from "@mui/icons-material/FileDownload";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { IconButton, Stack } from "@mui/material";
import type { FC } from "react";
import { BaseFile } from "./BaseFile";
import type { UploadedFile } from "../model/types";
import { proccessFile } from "../../../utils/process-file";
import { useMutation } from "@tanstack/react-query";

export const ProfileFile: FC<UploadedFile> = ({ name, url }) => {
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
      icon={<Icon />}
      fileName={name}
      iconSize="medium"
      actions={
        <Stack direction="row" spacing={0.5}>
          <IconButton onClick={handleGet} size={"medium"} color="primary">
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
