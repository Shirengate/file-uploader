export interface FileModalProps {
  onClose: () => void;
  open: boolean;
}
export interface AttachFileProps {
  filename: string;
  deleteItem: (filename: string) => void;
}
