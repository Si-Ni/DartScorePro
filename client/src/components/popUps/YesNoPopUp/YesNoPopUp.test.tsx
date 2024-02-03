import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import YesNoPopUp from "./YesNoPopUp.tsx";

const mockProps = {
  content: "Test Content",
  cbYesClicked: vi.fn(),
  cbNoClicked: vi.fn()
};

describe("YesNoPopUp", () => {
  it("renders content and buttons with correct classes and labels", () => {
    render(<YesNoPopUp {...mockProps} />);

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
    render(<YesNoPopUp {...mockProps} />);

    const yesButton = screen.getByText("Yes");

    fireEvent.click(yesButton);

    expect(mockProps.cbYesClicked).toHaveBeenCalled();
  });

  it("calls cbNoClicked when the No button is clicked", () => {
    render(<YesNoPopUp {...mockProps} />);

    const noButton = screen.getByText("No");

    fireEvent.click(noButton);

    expect(mockProps.cbNoClicked).toHaveBeenCalled();
  });
});
