import React from "react";
import { cx, css } from "emotion";

function ErrorComponent({ message }) {
  const errorStyle = css`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f54b3a;
  `;

  return (
    <div className={cx(errorStyle)}>
      <h3>{!message ? "Page not found!!!" : message}</h3>
    </div>
  );
}

export default ErrorComponent;
