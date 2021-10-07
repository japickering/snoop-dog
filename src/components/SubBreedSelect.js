import React from "react";

export default function SubBreedSelect({ breed, subBreedsList }) {
  return (
    <div className="dropdown">
      <button
        id="subBreedSelect"
        className="btn btn-info"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Select Sub breed..
      </button>
      <ul className="dropdown-menu" aria-labelledby="subBreedSelect">
        {subBreedsList(breed)}
      </ul>
    </div>
  );
}
