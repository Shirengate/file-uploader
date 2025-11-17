import type { FC } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { ProfileFile } from "./Files/ui/ProfileFile";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface DownloadedFile {
  url: string;
  name: string;
}

const FilesList: FC<{ files: DownloadedFile[] | undefined }> = ({ files }) => {
  const [parent] = useAutoAnimate();
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
      <Box ref={parent}>
        {files?.map((file) => (
          <ProfileFile key={file.name} name={file.name} url={file.url} />
        ))}
      </Box>
    </Stack>
  );
};

export { FilesList };
