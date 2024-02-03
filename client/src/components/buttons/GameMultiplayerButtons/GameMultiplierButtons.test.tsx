import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GameMultiplierButtons from "./GameMultiplierButtons.tsx";

const mockProps = {
  multiplier: 1,
  cbHandleMultiplierClicked: vi.fn()
};

describe("GameMultiplierButtons", () => {
  it("renders buttons with correct labels and selected class", () => {
    render(<GameMultiplierButtons {...mockProps} />);

    const singleButton = screen.getByText("Single");
    const doubleButton = screen.getByText("Double");
    const tripleButton = screen.getByText("Triple");

    expect(singleButton).toBeInTheDocument();
    expect(doubleButton).toBeInTheDocument();
    expect(tripleButton).toBeInTheDocument();

    expect(singleButton).toHaveClass("selectedButton");
    expect(doubleButton).not.toHaveClass("selectedButton");
    expect(tripleButton).not.toHaveClass("selectedButton");

    expect(singleButton).toHaveClass("button is-info m-1 is-size-5 uniformButton");
    expect(doubleButton).toHaveClass("button is-success m-1 is-size-5 uniformButton");
    expect(tripleButton).toHaveClass("button is-warning m-1 is-size-5 uniformButton");
  });

  it("calls cbHandleMultiplierClicked with the correct value when a button is clicked", () => {
    render(<GameMultiplierButtons {...mockProps} />);

    const doubleButton = screen.getByText("Double");

    fireEvent.click(doubleButton);

    expect(mockProps.cbHandleMultiplierClicked).toHaveBeenCalledWith(2);
  });

  it("listens to keyboard events and calls cbHandleMultiplierClicked with the correct value", () => {
    render(<GameMultiplierButtons {...mockProps} />);

    fireEvent.keyDown(document, { key: "3" });

    expect(mockProps.cbHandleMultiplierClicked).toHaveBeenCalledWith(3);
  });
});
