export interface UploadedFile {
  name: string;
  url: string;
  isPicked: boolean;
  onFileClick?: (name: string, url: string) => void;
}
export interface DownloadedFile {
  url: string;
  name: string;
}
