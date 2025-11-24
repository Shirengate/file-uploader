import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Stack } from "@mui/material";
import { memo, type FC } from "react";
import { BaseFile } from "@/core";
import { proccessFile } from "@core/utils/process-file";
import type { AttachFileProps } from "@/modules/upload-files/model/types";

const AttachFileComponent: FC<AttachFileProps> = ({ filename, deleteItem }) => {
  const { Icon } = proccessFile(filename);
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
