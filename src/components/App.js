import React from "react";
import { Route, Switch } from "react-router-dom";
import IntentContext from "./IntentContext";
import { cx, css } from "emotion";
import PageHeader from "./PageHeader";
import PretrainDataList from "./PretrainDataList";
import SingleIntentDetails from "./SingleIntentDetails";
import ErrorComponent from "./ErrorComponent";
import { defaultFetcher, localDatabaseUrl } from "./helpersUtils";

const rootDiv = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;

function App() {
  const [loading, setLoading] = React.useState(true);
  const [allTrainingData, setAllTrainingData] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    defaultFetcher(localDatabaseUrl, setAllTrainingData, setError, setLoading);
  }, [localDatabaseUrl]);

  return (
    <IntentContext.Provider value={{ loading, allTrainingData, error }}>
      <div className={cx(rootDiv)}>
        <PageHeader />
        <Switch>
          <Route exact path="/" render={(props) => <PretrainDataList {...props} />} />
          <Route path="/intent/:id" render={(props) => <SingleIntentDetails {...props} />} />
          <Route component={ErrorComponent} />
        </Switch>
      </div>
    </IntentContext.Provider>
  );
}

export default App;
