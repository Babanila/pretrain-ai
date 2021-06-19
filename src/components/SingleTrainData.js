import React from "react";
import { cx, css } from "emotion";

const tableRowDiv = css`
  display: table-row;
  background-color: #f6f6f6;
  &:hover {
    background-color: #f9bdb3;
  }
`;

const tableCellDiv = css`
  display: table-cell;
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid black;
`;

function SingleTrainData({ numId, trainData, onClick }) {
  const { id, name, description, trainingData, reply } = trainData;
  return (
    <div className={cx(tableRowDiv)} onClick={() => onClick(id)}>
      <div className={cx(tableCellDiv)}>{numId}</div>
      <div className={cx(tableCellDiv)}>{name}</div>
      <div className={cx(tableCellDiv)}>{description}</div>
      <div className={cx(tableCellDiv)}>{trainingData.expressionCount}</div>
      <div className={cx(tableCellDiv)}>{reply.text}</div>
    </div>
  );
}

export default SingleTrainData;
