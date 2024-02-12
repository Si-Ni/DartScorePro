import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import GameMultiplierButtons from "./GameMultiplierButtons.tsx";

const mockProps = { multiplier: 1, cbHandleMultiplierClicked: vi.fn() };

describe("GameMultiplierButtons", () => {
  beforeEach(() => {
    render(<GameMultiplierButtons {...mockProps} />);
  });

  it("renders buttons with correct labels classes", () => {
    const assertButton = (button, label, classList) => {
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(button).toHaveClass(...classList);
    };

    assertButton(screen.getByText("Single"), "Single", [
      "selectedButton",
      "button",
      "is-info",
      "m-1",
      "is-size-5",
      "uniformButton"
    ]);
    assertButton(screen.getByText("Double"), "Double", ["button", "is-success", "m-1", "is-size-5", "uniformButton"]);
    assertButton(screen.getByText("Triple"), "Triple", ["button", "is-warning", "m-1", "is-size-5", "uniformButton"]);
  });

  it("calls cbHandleMultiplierClicked with the correct value when a button is clicked", () => {
    fireEvent.click(screen.getByText("Double"));
    expect(mockProps.cbHandleMultiplierClicked).toHaveBeenCalledWith(2);
  });

  it("listens to keyboard events and calls cbHandleMultiplierClicked with the correct value", () => {
    fireEvent.keyDown(document, { key: "3" });
    expect(mockProps.cbHandleMultiplierClicked).toHaveBeenCalledWith(3);
  });
});
