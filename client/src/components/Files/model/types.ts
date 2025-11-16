export interface UploadedFile {
  name: string;
  url: string;
}

export interface BaseFileProps {
  fileName: string;
  iconSize: "small" | "medium" | "large";
  actions: React.ReactNode;
  onFileClick?: () => void;
}
