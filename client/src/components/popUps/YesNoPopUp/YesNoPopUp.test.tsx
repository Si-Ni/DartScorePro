import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import YesNoPopUp from "./YesNoPopUp.tsx";

const mockProps = {
  content: "Test Content",
  cbYesClicked: vi.fn(),
  cbNoClicked: vi.fn()
};

describe("YesNoPopUp", () => {
  beforeEach(() => {
    render(<YesNoPopUp {...mockProps} />);
  });
  it("renders content and buttons with correct classes and labels", () => {
    const contentElement = screen.getByText("Test Content");
    const yesButton = screen.getByText("Yes");
    const noButton = screen.getByText("No");

    expect(contentElement).toBeInTheDocument();
    expect(yesButton).toBeInTheDocument();
    expect(noButton).toBeInTheDocument();

    expect(yesButton).toHaveClass("button is-success m-1 is-large");
    expect(noButton).toHaveClass("button is-danger m-1 is-large");
  });

  it("calls cbYesClicked when the Yes button is clicked", () => {
    const yesButton = screen.getByText("Yes");

    fireEvent.click(yesButton);

    expect(mockProps.cbYesClicked).toHaveBeenCalled();
  });

  it("calls cbNoClicked when the No button is clicked", () => {
    const noButton = screen.getByText("No");

    fireEvent.click(noButton);

    expect(mockProps.cbNoClicked).toHaveBeenCalled();
  });
});
