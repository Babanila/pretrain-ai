import React from "react";
import { cx, css } from "emotion";

const pageHeaderDiv = css`
  width: 100%;
  font-family: "Proxima-nova", "sans-serif", "Source Sans Pro";
  color: #ffffff;
  background-color: #3c4d58;
  padding-left: 1em;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

function PageHeader() {
  return (
    <div className={cx(pageHeaderDiv)}>
      <h1>Pretrain AI Data</h1>
    </div>
  );
}

export default PageHeader;
