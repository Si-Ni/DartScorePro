import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GameInputButtons from "./GameInputButtons.tsx";

describe("GameInputButtons Component", () => {
  it("renders buttons with provided values", () => {
    const mockValues = [1, 2, 3];
    const mockBtnSize = 40;

    render(
      <GameInputButtons
        values={mockValues}
        btnSize={mockBtnSize}
        showMissButton={false}
        cbHandleButtonClicked={() => {}}
      />
    );

    mockValues.forEach((value) => {
      const button = screen.getByText(value.toString());
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("button is-primary m-1 is-size-5");
      expect(button).toHaveStyle(`width: ${mockBtnSize}px`);
    });
  });

  it("renders Miss button when showMissButton is true", () => {
    const mockValues = [1, 2, 3];
    const mockBtnSize = 40;

    render(
      <GameInputButtons
        values={mockValues}
        btnSize={mockBtnSize}
        showMissButton={true}
        cbHandleButtonClicked={() => {}}
      />
    );

    const missButton = screen.getByText("Miss");
    expect(missButton).toBeInTheDocument();
    expect(missButton).toHaveClass("button is-danger m-1 is-size-5");
    expect(missButton).toHaveStyle(`width: ${mockBtnSize}px`);
  });

  it("calls cbHandleButtonClicked with correct number when a button is clicked", () => {
    const mockValues = [1, 2, 3];
    const mockBtnSize = 40;
    const mockCallback = vi.fn();

    render(
      <GameInputButtons
        values={mockValues}
        btnSize={mockBtnSize}
        showMissButton={false}
        cbHandleButtonClicked={mockCallback}
      />
    );

    mockValues.forEach((value) => {
      const button = screen.getByText(value.toString());
      fireEvent.click(button);
      expect(mockCallback).toHaveBeenCalledWith(value);
    });
  });

  it("calls cbHandleButtonClicked with 0 when Miss button is clicked", () => {
    const mockBtnSize = 40;
    const mockCallback = vi.fn();

    render(
      <GameInputButtons
        values={[1, 2, 3]}
        btnSize={mockBtnSize}
        showMissButton={true}
        cbHandleButtonClicked={mockCallback}
      />
    );

    const missButton = screen.getByText("Miss");
    fireEvent.click(missButton);
    expect(mockCallback).toHaveBeenCalledWith(0);
  });
});
