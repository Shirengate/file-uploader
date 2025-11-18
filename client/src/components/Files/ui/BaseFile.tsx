import { Paper, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import type { BaseFileProps } from "../model/types";
export const BaseFile: FC<BaseFileProps> = ({ actions, fileName, icon }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{
        p: 1,
        borderColor: "divider",
        borderRadius: 1,
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      {icon}
      <Paper
        variant="outlined"
        sx={{
          border: "none",
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
