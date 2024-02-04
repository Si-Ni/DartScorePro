import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import GameInputButtons from "./GameInputButtons.tsx";

const mockProps = {
  values: [1, 2, 3],
  btnSize: 40,
  showMissButton: false,
  cbHandleButtonClicked: vi.fn()
};

const assertButton = (value, extraClass = "", width = mockProps.btnSize) => {
  const button = screen.getByText(value.toString());
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass(`button ${extraClass} is-size-5`);
  expect(button).toHaveStyle(`width: ${width}px`);
};

describe("GameInputButtons", () => {
  beforeEach(() => {
    render(<GameInputButtons {...mockProps} />);
  });

  it("renders buttons with provided values", () => {
    mockProps.values.forEach((value) => assertButton(value, "is-primary m-1"));
  });

  it("calls cbHandleButtonClicked with correct number when a button is clicked", () => {
    mockProps.values.forEach((value) => {
      fireEvent.click(screen.getByText(value.toString()));
      expect(mockProps.cbHandleButtonClicked).toHaveBeenCalledWith(value);
    });
  });

  it("renders Miss button when showMissButton is true", () => {
    render(<GameInputButtons {...mockProps} showMissButton={true} />);
    assertButton("Miss", "is-danger m-1");
  });

  it("calls cbHandleButtonClicked with 0 when Miss button is clicked", () => {
    render(<GameInputButtons {...mockProps} showMissButton={true} />);
    fireEvent.click(screen.getByText("Miss"));
    expect(mockProps.cbHandleButtonClicked).toHaveBeenCalledWith(0);
  });
});
