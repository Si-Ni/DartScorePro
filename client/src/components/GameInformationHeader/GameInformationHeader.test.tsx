import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GameInformationHeader from "./GameInformationHeader.tsx";

const mockProps = {
  throwsRemaining: 3,
  setsToWin: 2,
  legsForSet: 3,
  modeIn: "Double In",
  modeOut: "Double Out"
};

const getByTextContent = (content) => {
  return screen
    .getByText((text, node) => {
      const hasTextContent = (element) => element.textContent === content;
      const childrenDontHaveTextContent = Array.from(node.children).every((child) => !hasTextContent(child));

      return hasTextContent(node) && childrenDontHaveTextContent;
    })
    .closest("p");
};

const assertContent = (content, className = "is-size-6", marginRight = 4) => {
  const element = getByTextContent(content);
  expect(element).toBeInTheDocument();
  expect(element).toHaveClass(`${className} mr-${marginRight}`);
};

describe("GameInformationHeader", () => {
  it("renders with correct classes and labels", () => {
    render(<GameInformationHeader {...mockProps} />);

    assertContent(`Remaining throws: ${mockProps.throwsRemaining}`);
    assertContent(`First to: ${mockProps.setsToWin} ${mockProps.setsToWin > 1 ? "Sets" : "Set"}`);
    assertContent(`Legs per set: ${mockProps.legsForSet}`);
    assertContent(`${mockProps.modeIn} in`);
    assertContent(`${mockProps.modeOut} out`, "is-size-6", 0);
  });
});
