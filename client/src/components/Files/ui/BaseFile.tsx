import { Paper, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import type { BaseFileProps } from "../model/types";
import { getFileIcon } from "../../../utils/getIcons";
export const BaseFile: FC<BaseFileProps> = ({
  actions,
  fileName,
  iconSize,
  onFileClick,
}) => {
  const Icon = getFileIcon(fileName);
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{
        p: 1,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <Icon />
      <Paper
        variant="outlined"
        sx={{
          flex: 1,
          py: 1,
          px: 2,
          backgroundColor: "transparent",
          minWidth: 0,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          noWrap
        >
          {fileName}
        </Typography>
      </Paper>
      {actions}
    </Stack>
  );
};
