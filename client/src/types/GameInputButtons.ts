export interface GameInputButtonsProps {
  values: number[];
  cbHandleButtonClicked(number: number): void;
  showMissButton: boolean;
  btnSize: number;
}
