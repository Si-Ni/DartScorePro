export interface NavigationButtonsProps {
  cbBackBtnClicked?(): void;
  cbNextBtnClicked?(): void;
  contentBackBtn?: string;
  contentNextBtn?: string;
  nextBtnDisabled?: boolean;
  marginTop?: number;
  showNextBtn?: boolean;
}
