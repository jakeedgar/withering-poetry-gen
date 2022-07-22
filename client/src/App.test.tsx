import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the App object", () => {
  render(<App />);
  expect(<App />).toBeInTheDocument();
});
