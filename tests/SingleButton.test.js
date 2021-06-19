import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { css } from "emotion";
import SingleButton from "../src/components/SingleButton";

describe("Check SingleButton Component", () => {
  let btnName, handleClick, btnStyles;
  beforeEach(() => {
    btnName = "Back";
    handleClick = jest.fn();
    btnStyles = css`
      padding: 10px;
      font-size: 1em;
      color: #ffffff;
      background-color: #3c4d58;
      border: 2px solid #3c4d58;
    `;
  });

  it("should renders without crashing", () => {
    const tree = renderer
      .create(<SingleButton btnName={btnName} btnClick={handleClick} btnStyles={btnStyles} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render correct number of element in SingleButton component", () => {
    const SingleButtonWrapper = shallow(
      <SingleButton btnName={btnName} btnClick={handleClick} btnStyles={btnStyles} />
    );

    const actual = SingleButtonWrapper.find("button");
    expect(SingleButton).toBeDefined();
    expect(actual.exists).toBeTruthy();
    expect(actual.length).toEqual(1);
    expect(actual.at(0).text()).toContain("Back");
  });
});
