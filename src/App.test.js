import { render } from "@testing-library/react";
// import App from "./App";

test('getImagesByBreed from Dog CEO responds with defined result', () => {
	return fetch(`https://dog.ceo/api/breed/hound/images/random`)
	.then(res => {
    expect(res).toBeDefined();
  });
});

test('getImagesByBreed from Dog CEO responds with defined result', () => {
	return fetch(`https://dog.ceo/api/breed/hound/images/random/4`)
	.then(res => {
    expect(res).toBeDefined();
  });
});
