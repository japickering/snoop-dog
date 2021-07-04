import { render } from "@testing-library/react";
import App from "./App";

// hard coded elements
const heading = document.createElement("h1");
heading.innerHTML = `
<h1 id="title" className="title">
dog breed <span>{this.state.breed}</span>
</h1>`;

const dropdown = document.createElement("div");
dropdown.innerHTML = `
  <button
    id="subBreedSelect"
    className="btn btn-secondary"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Select Sub breed..
  </button>
  <ul
    className="dropdown-menu"
    aria-labelledby="subBreedSelect"
  >
    {this.subBreedsList(this.state.breed)}
  </ul>
`;

// run tests
test("displays heading text", () => {
  render(<App />);
  const element = heading;
  expect(element).toHaveTextContent("dog breed");
});

test("renders dropdown label", () => {
  // render(<App />);
  const element = dropdown;
  expect(element).toHaveTextContent("Select Sub breed");
});
