import { Modal, Box, Stack, Typography, Button } from "@mui/material";
import { memo, useState, type FC } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Dropzone from "react-dropzone";
import { File } from "./File";
interface FileModalProps {
  onClose: () => void;
  open: boolean;
}
const FileModalComponent: FC<FileModalProps> = ({ onClose, open }) => {
  const [files, setFiles] = useState<File[]>([]);

  const getFilesFromDnd = (file: File[]) => {
    setFiles((prev) => [...prev, ...file]);
  };

  const fetchData = async (file: File) => {
    const data = new FormData();

    data.append("file", file);

    await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: data,
    });
  };

  const publishFiles = async () => {
    files.forEach(async (file) => {
      await fetchData(file);
    });
  };
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="upload-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
          <AttachFileIcon color="primary" />
          <Typography id="upload-modal-title" variant="h6">
            Прикрепить файлы
          </Typography>
        </Stack>

        <Dropzone onDrop={getFilesFromDnd}>
          {({ getRootProps, getInputProps, isDragAccept, isDragActive }) => (
            <Box
              {...getRootProps()}
              sx={{
                minHeight: 200,
                border: "2px dashed",
                borderColor: isDragActive
                  ? isDragAccept
                    ? "success.main"
                    : "error.main"
                  : "grey.300",
                borderRadius: 2,
                p: 2,
                mb: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                bgcolor: "grey.50",
              }}
            >
              <input {...getInputProps()} />
              {files?.map((fileItem) => (
                <File file={fileItem} isDownloaded={true} />
              ))}
              {files.length === 0 && (
                <Typography
                  color="text.secondary"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Файлы будут отображаться здесь
                </Typography>
              )}
            </Box>
          )}
        </Dropzone>

        <Button
          onClick={publishFiles}
          variant="contained"
          disabled={files.length === 0}
          fullWidth
          size="large"
        >
          Отправить
        </Button>
      </Box>
    </Modal>
  );
};

export const FileModal = memo(FileModalComponent);
