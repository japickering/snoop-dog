import { render } from "@testing-library/react";
import App from "./App";

test("App renders without crashing", () => {
  render(<App />);
});

test("getImagesByBreed responds with defined result", () => {
  render(<App />);
  return fetch(`https://dog.ceo/api/breed/hound/images/random`).then((res) => {
    expect(res).toBeDefined();
  });
});

test("getImagesByBreed responds with defined result", () => {
  return fetch(`https://dog.ceo/api/breed/hound/images/random/4`).then(
    (res) => {
      expect(res).toBeDefined();
    }
  );
});

test("getSubBreedImages responds with defined result", () => {
  return fetch(`https://dog.ceo/api/breed/hound/afghan/images/3`).then(
    (res) => {
      expect(res).toBeDefined();
    }
  );
});
