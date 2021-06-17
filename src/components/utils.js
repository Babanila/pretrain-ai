import axios from "axios";

export const localDatabaseUrl = "../../data/intents.json";

export const initialState = {
  id: "",
  name: "",
  description: "",
  trainingData: {
    expressionCount: 0,
    expressions: [],
  },
  reply: {
    id: "",
    text: "",
  },
};

export const defaultFetcher = async (url, handleSetData, handleSetError, handleSetLoading) => {
  if (!url)
    return {
      handleSetLoading: handleSetLoading(false),
      handleSetError: handleSetError("Please provide a valid url"),
    };

  try {
    const results = await axios(url);
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

export const postIntentData = async (url, methodType, postData) => {
  try {
    const option = {
      url,
      method: methodType,
      data: postData,
    };

    const returnData = await axios(option);
    return returnData;
  } catch (err) {
    return err.response;
  }
};
