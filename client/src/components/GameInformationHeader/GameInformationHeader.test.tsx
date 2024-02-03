import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GameInformationHeader from "./GameInformationHeader.tsx";

const mockProps = {
  throwsRemaining: 3,
  setsToWin: 2,
  legsForSet: 3,
  modeIn: "501",
  modeOut: "Double Out"
};

const getByTextContent = (content) => {
  return screen.getByText((text, node) => {
    const hasTextContent = (element) => element.textContent === content;
    const childrenDontHaveTextContent = Array.from(node.children).every((child) => !hasTextContent(child));

    return hasTextContent(node) && childrenDontHaveTextContent;
  });
};

describe("GameInformationHeader", () => {
  it("renders with provided props and classes", () => {
    render(<GameInformationHeader {...mockProps} />);

    expect(getByTextContent(`Remaining throws: ${mockProps.throwsRemaining}`)).toBeInTheDocument();
    expect(
      getByTextContent(`First to: ${mockProps.setsToWin} ${mockProps.setsToWin > 1 ? "Sets" : "Set"}`)
    ).toBeInTheDocument();
    expect(getByTextContent(`Legs per set: ${mockProps.legsForSet}`)).toBeInTheDocument();
    expect(getByTextContent(`${mockProps.modeIn} in`)).toBeInTheDocument();
    expect(getByTextContent(`${mockProps.modeOut} out`)).toBeInTheDocument();

    expect(getByTextContent(`Remaining throws: ${mockProps.throwsRemaining}`)).toHaveClass("is-size-6 mr-4");
    expect(
      getByTextContent(`First to: ${mockProps.setsToWin} ${mockProps.setsToWin > 1 ? "Sets" : "Set"}`)
    ).toHaveClass("is-size-6 mr-4");
    expect(getByTextContent(`Legs per set: ${mockProps.legsForSet}`)).toHaveClass("is-size-6 mr-4");

    expect(getByTextContent(`${mockProps.modeIn} in`).closest("p")).toHaveClass("is-size-6 mr-4");
    expect(getByTextContent(`${mockProps.modeOut} out`).closest("p")).toHaveClass("is-size-6 mr-0");
  });
});
