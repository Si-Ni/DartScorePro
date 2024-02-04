import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NavigationButtons from "./NavigationButtons.tsx";

const mockProps = {
  marginTop: 5,
  cbBackBtnClicked: vi.fn(),
  cbNextBtnClicked: vi.fn(),
  nextBtnDisabled: false,
  contentBackBtn: "Back",
  contentNextBtn: "Next"
};

const assertButton = (button, expectedClass, expectedText, disabled = false) => {
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass(expectedClass);
  expect(button).toHaveTextContent(expectedText);
  if (disabled) expect(button).toBeDisabled();
};

describe("NavigationButtons", () => {
  it("renders navigation buttons with correct classes and labels", () => {
    render(<NavigationButtons {...mockProps} />);
    assertButton(screen.getByText("Back"), "button is-danger m-1 is-medium uniformButton", "Back");
    assertButton(screen.getByText("Next"), "button is-primary m-1 is-medium uniformButton", "Next");
  });

  it("calls cbBackBtnClicked when the Back button is clicked", () => {
    render(<NavigationButtons {...mockProps} />);
    fireEvent.click(screen.getByText("Back"));
    expect(mockProps.cbBackBtnClicked).toHaveBeenCalled();
  });

  it("calls cbNextBtnClicked when the Next button is clicked", () => {
    render(<NavigationButtons {...mockProps} />);
    fireEvent.click(screen.getByText("Next"));
    expect(mockProps.cbNextBtnClicked).toHaveBeenCalled();
  });

  it("disables the Next button when nextBtnDisabled is true", () => {
    render(<NavigationButtons {...mockProps} nextBtnDisabled={true} />);
    assertButton(screen.getByText("Next"), "button is-primary m-1 is-medium uniformButton", "Next", true);
  });
});
