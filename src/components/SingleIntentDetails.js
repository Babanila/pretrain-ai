import React from "react";
import { useHistory } from "react-router-dom";
import { cx, css } from "emotion";
import { IntentContext } from "./IntentContext";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";
import SingleButton from "./SingleButton";

const intentDetailsDivStyle = css`
  width: 80%;
  height: auto;
  overflow-x: hidden;
  overflow-y: auto
  display: flex;
  flex-direction: column;
  `;

const intentDetailsDivTitle = css`
  align-self: center;
  font-size: 2em;
  padding: 20px 0px;
`;

const defaultDivWrapper = css`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
`;

const itemKeyStyle = css`
  margin-right: 10px;
`;

const expressionTitle = css`
  margin-bottom: 10px;
`;

const singleValueDivStyle = css`
  display: inline-block;
  text-align: center;
  color: #000000;
  border: 1px solid #5fe0c6;
  background-color: #ffffff;
  border-radius: 5px;
  outline: none;
  padding: 10px;
  margin: 0 10px;
`;

const backBtnStyle = css`
  padding: 10px;
  font-size: 1em;
  color: #ffffff;
  background-color: #3c4d58;
  border: 2px solid #3c4d58;
  border-radius: 5px;
  outline: none;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    border: 2px solid #000000;
    background-color: #000000;
  }
`;

function SingleIntentDetails({ match }) {
  const history = useHistory();
  const handleBack = () => history.push(`/`);

  return (
    <IntentContext.Consumer>
      {(value) => {
        if (value.error) return <ErrorComponent />;
        if (value.loading) return <LoadingComponent />;

        const selectedIntent = value.allTrainingData.find(
          (trainingData) => trainingData.id === match.params.id
        );

        return (
          <div className={cx(intentDetailsDivStyle)}>
            <div className={cx(intentDetailsDivTitle)}>Intent Details</div>
            <div className={cx(defaultDivWrapper)}>
              <div className={cx(itemKeyStyle)}>Name:</div>
              <div className={cx(singleValueDivStyle)}>{selectedIntent.name}</div>
            </div>
            <div className={cx(defaultDivWrapper)}>
              <div className={cx(itemKeyStyle)}>Description:</div>
              <div className={cx(singleValueDivStyle)}>{selectedIntent.description}</div>
            </div>

            <div className={cx(defaultDivWrapper)}>
              <div className={cx(itemKeyStyle)}>Reply text:</div>
              <div className={cx(singleValueDivStyle)}>{selectedIntent.reply.text}</div>
            </div>

            <div className={cx(defaultDivWrapper)}>
              <div className={cx(itemKeyStyle)}>Expression Count:</div>
              <div className={cx(singleValueDivStyle)}>
                {selectedIntent.trainingData.expressionCount}
              </div>
            </div>

            <div className={cx(defaultDivWrapper)}>
              <div className={cx(expressionTitle)}>Expression types:</div>
              <div>
                {selectedIntent.trainingData.expressions.map((expression) => (
                  <div key={expression.id} className={cx(singleValueDivStyle)}>
                    {expression.text}
                  </div>
                ))}
              </div>
            </div>

            <SingleButton btnName="Back" btnClick={handleBack} btnStyles={backBtnStyle} />
          </div>
        );
      }}
    </IntentContext.Consumer>
  );
}

export default SingleIntentDetails;
