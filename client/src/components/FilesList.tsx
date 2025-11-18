import { useCallback, useState, type FC } from "react";
import {
  Box,
  Checkbox,
  Stack,
  Typography,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ProfileFile } from "./Files/ui/ProfileFile";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

interface DownloadedFile {
  url: string;
  name: string;
}

const FilesList: FC<{ files: DownloadedFile[] | undefined }> = ({ files }) => {
  const [pickedFiles, setPickedFiles] = useState<Map<string, string>>(
    new Map()
  );

  const togglePick = useCallback(
    (name: string, file: string) => {
      if (pickedFiles.has(name)) {
        setPickedFiles((prev) => {
          const newMap = new Map(prev);
          newMap.delete(name);
          return newMap;
        });
      } else {
        setPickedFiles((prev) => new Map(prev).set(name, file));
      }
    },
    [pickedFiles]
  );

  const pickAllFiles = () => {
    if (!files) return;

    if (pickedFiles.size > 0) {
      setPickedFiles(new Map());
      return;
    }
    const map = new Map<string, string>();

    files.forEach((file) => {
      map.set(file.name, file.url);
    });
    setPickedFiles(map);
  };
  const [parent] = useAutoAnimate();
  const theme = useTheme();

  const handleDownload = () => {
    console.log("Загрузка файлов...");
  };

  return (
    <Stack
      sx={{
        mx: 3,
        boxShadow: 4,
        p: 2,
        borderRadius: 4,
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FolderOutlinedIcon fontSize="large" color="disabled" />
          <Typography
            variant="h5"
            color={theme.palette.text.primary}
            sx={{ p: 1, fontWeight: "bolder", textAlign: "center" }}
          >
            Ваши файлы
          </Typography>
        </Stack>

        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Checkbox
            onChange={pickAllFiles}
            sx={{
              stroke: "#ffffff",
              strokeWidth: 1,
            }}
          />

          <Typography
            variant="h6"
            sx={{
              fontFamily: "Arial",
            }}
            color="black"
          >
            Pick all files
          </Typography>

          <Tooltip title="Загрузить" arrow>
            <IconButton
              onClick={handleDownload}
              sx={{
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.action.hover,
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  transform: "scale(1.1)",
                  transition: "all 0.2s ease-in-out",
                },
                width: 40,
                height: 40,
              }}
            >
              <CloudDownloadIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Box ref={parent} mt={2}>
        {files?.map((file) => (
          <ProfileFile
            onFileClick={() => togglePick(file.name, file.url)}
            key={file.name}
            name={file.name}
            url={file.url}
            isPicked={pickedFiles.has(file.name)}
          />
        ))}
      </Box>
    </Stack>
  );
};

export { FilesList };
