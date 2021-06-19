import React from "react";
import { useHistory } from "react-router-dom";
import { cx, css } from "emotion";
import IntentContext from "./IntentContext";
import SingleTrainData from "./SingleTrainData";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";

const PretrainListDiv = css`
  margin-top: 6em;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
`;

const tableDiv = css`
  margin-top: 20px;
  margin-bottom: 50px;
  width: 100%;
  max-width: 1200px;
  display: table;
`;

const tableTitleDiv = css`
  display: table-caption;
  font-size: 26px;
  font-weight: bold;
  padding-left: 10px;
  padding-bottom: 10px;
`;

const tableHeaderDiv = css`
  display: table-cell;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid black;
  background-color: #5fe0c6;
  @media (max-width: 420px) {
    font-size: 16px;
  }
`;

const tableBodyDiv = css`
  display: table-row-group;
`;

const tableNullBody = css`
  display: table-caption;
  font-size: 20px;
  color: #f54b3a;
`;

function PretrainDataList() {
  const history = useHistory();
  const showTrainDataDetails = (id) => history.push(`/intent/${id}`);

  return (
    <IntentContext.Consumer className={cx(PretrainListDiv)}>
      {(value) => {
        if (value.loading) return <LoadingComponent />;
        if (value.error) return <ErrorComponent message={value.error} />;
        return (
          <div className={cx(tableDiv)}>
            <div className={cx(tableTitleDiv)}>Intent List</div>
            <div className={cx(tableHeaderDiv)}>ID</div>
            <div className={cx(tableHeaderDiv)}>Name</div>
            <div className={cx(tableHeaderDiv)}>Description</div>
            <div className={cx(tableHeaderDiv)}>Count</div>
            <div className={cx(tableHeaderDiv)}>Reply Text</div>

            {value.allTrainingData && value.allTrainingData.length === 0 ? (
              <div className={cx(tableNullBody)}> No Train Data in the Database</div>
            ) : (
              <div className={cx(tableBodyDiv)}>
                {value.allTrainingData.map((trainData, i) => (
                  <SingleTrainData
                    key={i}
                    numId={i + 1}
                    trainData={trainData}
                    onClick={showTrainDataDetails}
                  />
                ))}
              </div>
            )}
          </div>
        );
      }}
    </IntentContext.Consumer>
  );
}

export default PretrainDataList;
