import React from "react";
import { useHistory } from "react-router-dom";
import { cx, css } from "emotion";
import SingleTrainData from "./SingleTrainData";
import SingleButton from "./SingleButton";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";
import { fetcher, localDatabaseUrl } from "./Utils";

const PretrainListDiv = css`
  margin-top: 6em;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
`;

const tableDiv = css`
  margin-top: 2em;
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

const titleWithBtnDiv = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const tableHeaderDiv = css`
  display: table-cell;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid black;
  background-color: #f6f6f6;
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

const addDataBtnStyle = css`
  padding: 5px;
  font-size: 0.7em;
  color: #ffffff;
  border: 2px solid #009900;
  background-color: #009900;
  border-radius: 5px;
  outline: none;
  &:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: #3c4d58;
    border: 2px solid #3c4d58;
  }
`;

function PretrainDataList() {
  const [allTrainingData, setAllTrainingData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetcher(localDatabaseUrl, setAllTrainingData, setError, setLoading);
  }, [localDatabaseUrl]);

  const history = useHistory();
  const showTrainDataDetails = (id) => history.push(`/intent/${id}`);
  const handleNewTrainData = () => history.push(`/new_intent`);

  if (error === "Network Error") return <ErrorComponent message="Please contact your provider." />;
  if (loading) return <LoadingComponent />;

  return (
    <div className={cx(PretrainListDiv)}>
      <div className={cx(tableDiv)}>
        <div className={cx(tableTitleDiv)}>
          <div className={cx(titleWithBtnDiv)}>
            <div>Customer List</div>
            <SingleButton
              btnName="Add New Data"
              btnClick={handleNewTrainData}
              btnStyles={addDataBtnStyle}
            />
          </div>
        </div>
        <div className={cx(tableHeaderDiv)}>ID</div>
        <div className={cx(tableHeaderDiv)}>Name</div>
        <div className={cx(tableHeaderDiv)}>Description</div>
        <div className={cx(tableHeaderDiv)}>Expression Count</div>
        <div className={cx(tableHeaderDiv)}>Reply Text</div>
        {allTrainingData.length === 0 ? (
          <div className={cx(tableNullBody)}> No Train Data in the Database</div>
        ) : (
          <div className={cx(tableBodyDiv)}>
            {allTrainingData.map((item, i) => (
              <SingleTrainData
                key={i}
                numId={i + 1}
                trainData={item}
                onClick={showTrainDataDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PretrainDataList;
