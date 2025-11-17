import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Stack } from "@mui/material";
import { memo, type FC } from "react";
import { BaseFile } from "./BaseFile";
import { proccessFile } from "../../../utils/process-file";
interface AttachFileProps {
  filename: string;
  deleteItem: (filename: string) => void;
}

const AttachFileComponent: FC<AttachFileProps> = ({ filename, deleteItem }) => {
  const { Icon, extenction } = proccessFile(filename);
  return (
    <BaseFile
      fileName={filename}
      icon={<Icon />}
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
