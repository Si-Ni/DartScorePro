export interface ErrorMessageBoxButtonProps {
  btnContent: string;
  messageContent: string;
  cbBtnClicked(): void;
  disabled: boolean;
  className?: string;
}

export interface ErrorButtonMessageBoxProps {
  x: number;
  y: number;
  content: string;
}
