import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PopUp from "./PopUp.tsx";

const mockProps = {
  content: "Test Content",
  btnContent: "OK",
  cbBtnClicked: vi.fn()
};

describe("PopUp Component", () => {
  it("renders content and button with correct labels and classes", () => {
    render(<PopUp {...mockProps} />);

    const contentElement = screen.getByText("Test Content");
    const buttonElement = screen.getByText("OK");

    expect(contentElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();

    expect(buttonElement).toHaveClass("button is-primary m-1 is-large");
  });

  it("calls cbBtnClicked when the button is clicked", () => {
    render(<PopUp {...mockProps} />);

    const buttonElement = screen.getByText("OK");

    fireEvent.click(buttonElement);

    expect(mockProps.cbBtnClicked).toHaveBeenCalled();
  });
});
