import axios from "axios";
const { defaultFetcher } = require("../src/components/helpersUtils");
jest.mock("axios");

describe("Check all the Utils functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Check fetcher function", () => {
    let url, methodType, handleSetData, handleSetError, handleSetLoading, returnData;

    beforeEach(() => {
      url = "../data/intents.json";
      methodType = "get";
      handleSetData = jest.fn((data) => data);
      handleSetError = jest.fn((msg) => msg);
      handleSetLoading = jest.fn(() => false);
      returnData = [
        {
          id: "34d7831e137a4016a55f98926800a643",
          name: "Greeting",
          description: "The user says hello.",
          trainingData: {
            expressionCount: 170,
            expressions: [
              {
                id: "6399fd6989984c7b871c6301744b0af5",
                text: "Hello",
              },
              {
                id: "68bafebc2a2e4843a56a221c2ceb12ed",
                text: "Hi",
              },
              {
                id: "b2a3208dc801432992812638368e0668",
                text: "Good morning!",
              },
            ],
          },
          reply: {
            id: "f35d7e0936a44102bac9cb96c81eec3b",
            text: "Hello :) How can I help you?",
          },
        },
        {
          id: "b6ec3deac5f94500aef55d9c410e37f7",
          name: "Goodbye",
          description: "The user says goodbye.",
          trainingData: {
            expressionCount: 94,
            expressions: [
              {
                id: "6bb364d2e3364e03b4ca30c6e46ea1dd",
                text: "Thanks, bye!",
              },
              {
                id: "2bc38310a4d1450f9e7c9e7903e458b9",
                text: "Goodbye!",
              },
              {
                id: "611c935266c1402ab76f5235827370f8",
                text: "See you",
              },
            ],
          },
          reply: {
            id: "9ba88034a89e4fdbb532bdb092717fa1",
            text: "Goodbye, have a nice day!",
          },
        },
      ];
    });

    it("should get data successfully from the API", async () => {
      axios.mockImplementationOnce(() =>
        Promise.resolve({
          data: [...returnData],
        })
      );

      const results = await defaultFetcher(url, handleSetData, handleSetError, handleSetLoading);

      expect(axios).toHaveBeenCalled();
      expect(axios).toBeCalledWith(url);
      expect(axios).toHaveBeenCalledTimes(1);
      expect(results.handleSetData).toEqual([...returnData]);
      expect(results.handleSetLoading).toEqual(false);
      expect(results.handleSetError).toEqual(undefined);
    });

    it("should show error if url is wrong", async () => {
      axios.mockImplementationOnce(() =>
        Promise.reject({
          message: "Network Error",
        })
      );
      const url2 = "../data/intents.jso";
      const results = await defaultFetcher(url2, handleSetData, handleSetError, handleSetLoading);
      expect(axios).toHaveBeenCalled();
      expect(axios).toBeCalledWith(url2);
      expect(axios).toHaveBeenCalledTimes(1);
      expect(results.handleSetError).toEqual("Network Error");
      expect(results.handleSetLoading).toEqual(false);
      expect(results.handleSetData).toEqual(undefined);
    });
  });
});
