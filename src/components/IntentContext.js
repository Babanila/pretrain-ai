import React from "react";
import { defaultFetcher, localDatabaseUrl } from "./helpersUtils";

const IntentContext = React.createContext();

function IntentProvider(props) {
  const [loading, setLoading] = React.useState(true);
  const [allTrainingData, setAllTrainingData] = React.useState([]);
  const [error, setError] = React.useState("");

  const localState = JSON.parse(window.localStorage.getItem("allTrainingData"));

  React.useEffect(() => {
    if (localState && localState.length) {
      setLoading(false);
      setAllTrainingData(localState);
      setError("");
    } else {
      defaultFetcher(localDatabaseUrl, setAllTrainingData, setError, setLoading);
    }
  }, [localDatabaseUrl]);

  return (
    <IntentContext.Provider
      value={{
        loading,
        allTrainingData,
        error,
      }}
    >
      {props.children}
    </IntentContext.Provider>
  );
}
export { IntentContext, IntentProvider };
