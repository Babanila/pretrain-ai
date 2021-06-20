import axios from "axios";

export const localDatabaseUrl = "../../data/intents.json";

export const defaultFetcher = async (url, handleSetData, handleSetError, handleSetLoading) => {
  if (!url)
    return {
      handleSetLoading: handleSetLoading(false),
      handleSetError: handleSetError("Please provide a valid url"),
    };

  try {
    const results = await axios(url);
    window.localStorage.setItem("allTrainingData", JSON.stringify(results.data));
    return {
      handleSetData: handleSetData(results.data),
      handleSetLoading: handleSetLoading(false),
    };
  } catch (err) {
    return {
      handleSetError: handleSetError(
        err && err.message ? err.message : "Please contact your provider."
      ),
      handleSetLoading: handleSetLoading(false),
    };
  }
};
