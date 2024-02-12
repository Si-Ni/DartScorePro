export interface GameMultiplierButtonsProps {
  cbHandleMultiplierClicked(multiplier: number): void;
  multiplier: number;
  disabled?: boolean;
}
