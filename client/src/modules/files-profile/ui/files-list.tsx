import { useCallback, useMemo, useState, type FC } from "react";
import {
  Box,
  Checkbox,
  Stack,
  Typography,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ProfileFile } from "@/modules/files-profile/ui/profile-file";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useDownloadFile } from "@/core/hooks/use-download-flle";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@core/api/helpers";
import type { DownloadedFile } from "@/modules/files-profile/model/types";
import { FILE_TYPE_CATEGORIES } from "@/core/consts/media-types";
import { getFileExtType } from "@/core/utils/get-file-info";
import type { FilesFilters } from "@/core/types/types";

interface FilesListProps {
  filter: FilesFilters;
}
const FilesList: FC<FilesListProps> = ({ filter }) => {
  const theme = useTheme();
  const [parent] = useAutoAnimate();
  const { downloadZipFile } = useDownloadFile();

  const { data: files } = useQuery<DownloadedFile[]>({
    queryKey: ["files"],
    queryFn: fetchData,
  });

  const currentFiles = useMemo(() => {
    if (!files) return [];

    if (filter === "any") return files;

    const allowedTypes = FILE_TYPE_CATEGORIES[filter];

    return files.filter((file) => {
      const type = getFileExtType(file.name);
      return allowedTypes.includes(type as never);
    });
  }, [files, filter]);

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
    if (!currentFiles) return;

    if (pickedFiles.size === currentFiles.length) {
      setPickedFiles(new Map());
      return;
    }
    const map = new Map<string, string>();

    currentFiles.forEach((file) => {
      map.set(file.name, file.url);
    });
    setPickedFiles(map);
  };

  const handleDownload = async () => {
    try {
      await downloadZipFile(pickedFiles);
    } catch (error) {
      return error;
    }
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

          {pickedFiles.size > 0 && (
            <Tooltip title="Download" arrow>
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
          )}
        </Stack>
      </Stack>
      <Box ref={parent} mt={2}>
        {currentFiles?.map((file) => (
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
