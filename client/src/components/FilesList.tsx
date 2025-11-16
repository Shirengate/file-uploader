import type { FC } from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import { ProfileFile } from "./Files/ui/ProfileFile";

interface DownloadedFile {
  link: string;
  name: string;
}

const FilesList: FC<{ files: DownloadedFile[] | undefined }> = ({ files }) => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        mx: 3,
      }}
    >
      <Typography
        variant="h5"
        color={theme.palette.text.primary}
        sx={{ p: 1, textAlign: "center" }}
      >
        Ваши файлы
      </Typography>
      {files?.map((file) => (
        <ProfileFile key={file.name} name={file.name} url={file.link} />
      ))}
    </Stack>
  );
};

export { FilesList };
