import { Paper, Stack, Typography } from "@mui/material";
import type { FC } from "react";

interface BaseFileProps {
  fileName: string;
  iconSize: "small" | "medium" | "large";
  actions: React.ReactNode;
  icon: React.ReactNode;
}

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
