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

describe("NavigationButtons", () => {
  it("renders navigation buttons with correct classes and labels", () => {
    render(<NavigationButtons {...mockProps} />);

    const backButton = screen.getByText("Back");
    const nextButton = screen.getByText("Next");

    expect(backButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    expect(backButton).toHaveClass("button is-danger m-1 is-medium uniformButton");
    expect(nextButton).toHaveClass("button is-primary m-1 is-medium uniformButton");

    expect(backButton).toHaveTextContent("Back");
    expect(nextButton).toHaveTextContent("Next");
  });

  it("calls cbBackBtnClicked when the Back button is clicked", () => {
    render(<NavigationButtons {...mockProps} />);

    const backButton = screen.getByText("Back");

    fireEvent.click(backButton);

    expect(mockProps.cbBackBtnClicked).toHaveBeenCalled();
  });

  it("calls cbNextBtnClicked when the Next button is clicked", () => {
    render(<NavigationButtons {...mockProps} />);

    const nextButton = screen.getByText("Next");

    fireEvent.click(nextButton);

    expect(mockProps.cbNextBtnClicked).toHaveBeenCalled();
  });

  it("disables the Next button when nextBtnDisabled is true", () => {
    render(<NavigationButtons {...mockProps} nextBtnDisabled={true} />);

    const nextButton = screen.getByText("Next");

    expect(nextButton).toBeDisabled();
  });
});
