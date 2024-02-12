import { ErrorMessageBoxButtonProps } from "./ErrorMessageBoxButton";
import ErrorButtonMessageBox from "./ErrorButtonMessageBox";
import { useState } from "react";

function ErrorMessageBoxButton(props: ErrorMessageBoxButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="is-fullwidth buttons is-centered m-0"
      style={{ flex: "1" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={`m-0 ${props.className}`} onClick={props.cbBtnClicked} disabled={props.disabled}>
        {props.btnContent}
      </button>
      {isHovered && props.disabled && (
        <ErrorButtonMessageBox x={mousePosition.x} y={mousePosition.y} content={props.messageContent} />
      )}
    </div>
  );
}

export default ErrorMessageBoxButton;
