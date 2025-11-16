import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Stack } from "@mui/material";
import { memo, type FC } from "react";
import { BaseFile } from "./BaseFile";
interface AttachFileProps {
  filename: string;
  deleteItem: (filename: string) => void;
}

const AttachFileComponent: FC<AttachFileProps> = ({ filename, deleteItem }) => {
  return (
    <BaseFile
      fileName={filename}
      iconSize="small"
      actions={
        <Stack direction="row" spacing={0.5}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              deleteItem(filename);
            }}
            size={"small"}
            color="primary"
          >
            <DeleteIcon fontSize={"small"} />
          </IconButton>
        </Stack>
      }
    />
  );
};

export const AttachFile = memo(AttachFileComponent);
