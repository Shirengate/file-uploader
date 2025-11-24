import { Box, Checkbox, IconButton, Stack } from "@mui/material";
import { BaseFile } from "@core/index";
import { proccessFile } from "@core/utils/process-file";
import { DownloadRounded } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useDownloadFile } from "@core/hooks/use-download-flle";
import { type FC } from "react";
import type { UploadedFile } from "@/modules/files-profile/model/types";
export const ProfileFile: FC<UploadedFile> = ({
  name,
  url,
  onFileClick,
  isPicked,
}) => {
  const { Icon, extenction, type } = proccessFile(name);
  const { downloadSingleFile } = useDownloadFile();

  const handleGet = async () => {
    toast.promise(
      () => downloadSingleFile({ ext: extenction, name, url, type }),
      {
        loading: "Loading",
        success: "Success",
        error: "Save error, try again",
      },
      {
        position: "bottom-right",
        style: {
          fontFamily: "Arial",
        },
      }
    );
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
              p: 0.5,
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
          <IconButton
            disabled={isPicked}
            onClick={handleGet}
            size={"medium"}
            color="default"
          >
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
