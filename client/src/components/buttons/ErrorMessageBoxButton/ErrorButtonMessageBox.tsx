import { useEffect, useRef, useState } from "react";
import { ErrorButtonMessageBoxProps } from "./ErrorMessageBoxButton";

function ErrorButtonMessageBox({ x, y, content }: ErrorButtonMessageBoxProps) {
  const messageRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    if (messageRef.current) {
      const { width, height } = messageRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  return (
    <div
      ref={messageRef}
      className="container box pt-1 pb-1 m-0 has-text-danger"
      style={{
        position: "fixed",
        top: y - dimensions.height - 5,
        left: x + dimensions.width / 2 + 5,
        transform: "translate(-50%, 0)",
        border: "1px solid grey",
        zIndex: 999
      }}
    >
      {content}
    </div>
  );
}

export default ErrorButtonMessageBox;
