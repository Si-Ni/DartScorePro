import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "./Footer.tsx";

const mockProps = {
  userID: "exampleUserID",
  isLoggedIn: true
};

describe("Footer Component", () => {
  it('should render "Impressum" link', () => {
    const { getByText } = render(<Footer {...mockProps} />);
    const impressumLink = getByText("Impressum");
    expect(impressumLink).toBeInTheDocument();
    expect(impressumLink).toHaveClass("mb-3");
    expect(impressumLink.getAttribute("href")).toBe("/impressum");
    expect(impressumLink.getAttribute("target")).toBe("_blank");
  });

  it("should render user ID if user is logged in", () => {
    const { getByText } = render(<Footer {...mockProps} />);
    const userIDText = getByText(`Logged in as ${mockProps.userID}`);
    expect(userIDText).toBeInTheDocument();
    const userIDElement = userIDText.parentElement;
    expect(userIDElement).toHaveClass("is-flex");
  });

  it("should not render user ID if user is not logged in", () => {
    const { queryByText } = render(<Footer isLoggedIn={false} userID={mockProps.userID} />);
    const userIDText = queryByText(/Logged in as/i);
    expect(userIDText).toBeNull();
  });
});
