import {
  Modal,
  Box,
  Stack,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { memo, useCallback, useState, type FC } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Dropzone from "react-dropzone";
import { AttachFile } from "./attach-file";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BaseModalProps } from "@/core";
import { API_BASE_URL } from "@/core/config/api.config";
import { API_ENDPOINTS } from "@/core/consts/endpoints";

const FileModalComponent: FC<BaseModalProps> = ({ onClose, open }) => {
  const queryClient = useQueryClient();

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const deleteItem = useCallback((filename: string) => {
    setFiles((prev) => {
      return prev.filter((item) => item.name !== filename);
    });
  }, []);

  const getFilesFromDnd = (file: File[]) => {
    setFiles((prev) => [...prev, ...file]);
  };

  const fetchData = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    await fetch(API_BASE_URL + API_ENDPOINTS.UPLOAD, {
      method: "POST",
      body: data,
    });
  };

  const { mutateAsync } = useMutation({
    mutationFn: fetchData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["files"],
      });
    },
  });

  const publishFiles = async () => {
    setLoading(true);
    await Promise.all(files.map(async (file) => await mutateAsync(file)));
    setLoading(false);
    setFiles([]);
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
                <AttachFile
                  deleteItem={deleteItem}
                  filename={fileItem.name}
                  key={fileItem.name}
                />
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
          disabled={files.length === 0 || loading}
          fullWidth
          size="large"
        >
          {loading ? <CircularProgress size={30} /> : "Отправить"}
        </Button>
      </Box>
    </Modal>
  );
};

export const FileModal = memo(FileModalComponent);
