import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GameInputButtons from "./GameInputButtons.tsx";

describe("GameInputButtons Component", () => {
  const mockValues = [1, 2, 3];
  const mockBtnSize = 40;
  const mockCallback = vi.fn();

  const renderComponent = (showMissButton) =>
    render(
      <GameInputButtons
        values={mockValues}
        btnSize={mockBtnSize}
        showMissButton={showMissButton}
        cbHandleButtonClicked={mockCallback}
      />
    );

  it("renders buttons with provided values", () => {
    renderComponent(false);
    mockValues.forEach((value) => {
      const button = screen.getByText(value.toString());
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("button is-primary m-1 is-size-5");
      expect(button).toHaveStyle(`width: ${mockBtnSize}px`);
    });
  });

  it("renders Miss button when showMissButton is true", () => {
    renderComponent(true);
    const missButton = screen.getByText("Miss");
    expect(missButton).toBeInTheDocument();
    expect(missButton).toHaveClass("button is-danger m-1 is-size-5");
    expect(missButton).toHaveStyle(`width: ${mockBtnSize}px`);
  });

  it("calls cbHandleButtonClicked with correct number when a button is clicked", () => {
    renderComponent(false);
    mockValues.forEach((value) => {
      fireEvent.click(screen.getByText(value.toString()));
      expect(mockCallback).toHaveBeenCalledWith(value);
    });
  });

  it("calls cbHandleButtonClicked with 0 when Miss button is clicked", () => {
    renderComponent(true);
    fireEvent.click(screen.getByText("Miss"));
    expect(mockCallback).toHaveBeenCalledWith(0);
  });
});
