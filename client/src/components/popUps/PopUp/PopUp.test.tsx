import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PopUp from "./PopUp.tsx";

const mockProps = {
  content: "Test Content",
  btnContent: "OK",
  cbBtnClicked: vi.fn()
};

describe("PopUp", () => {
  beforeEach(() => {
    render(<PopUp {...mockProps} />);
  });

  it("renders content and button with correct classes and labels", () => {
    const contentElement = screen.getByText("Test Content");
    const buttonElement = screen.getByText("OK");

    expect(contentElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();

    expect(buttonElement).toHaveClass("button is-primary m-1 is-large");
  });

  it("calls cbBtnClicked when the button is clicked", () => {
    const buttonElement = screen.getByText("OK");

    fireEvent.click(buttonElement);

    expect(mockProps.cbBtnClicked).toHaveBeenCalled();
  });
});
