import React from "react";
import renderer from "react-test-renderer";
import DarkModeButton from "../../components/darkModeButton";

describe("<DarkModeButton />", () => {
  it("renders correctly and matches snapshot", () => {
    const tree = renderer.create(<DarkModeButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
