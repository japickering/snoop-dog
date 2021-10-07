import React from "react";

export default function BreedSelect({ selection, breedsList }) {
  return (
    <div className="dropdown">
      <button
        id="breedSelect"
        className="btn btn-primary"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Breed: {selection}
      </button>
      <ul className="dropdown-menu" aria-labelledby="breedSelect">
        {breedsList()}
      </ul>
    </div>
  );
}
