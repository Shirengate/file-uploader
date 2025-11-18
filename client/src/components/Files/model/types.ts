export interface UploadedFile {
  name: string;
  url: string;
  isPicked: boolean;
  onFileClick?: (name: string, url: string) => void;
}

export interface BaseFileProps {
  fileName: string;
  iconSize: "small" | "medium" | "large";
  actions: React.ReactNode;
  icon: React.ReactNode;
}
