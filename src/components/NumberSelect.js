import React from "react";

export default function NumberSelect({ selectedNumber, numberList }) {
  return (
    <div className="dropdown">
      <button
        id="numberSelect"
        className="btn btn-success"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Number of images: {selectedNumber}
      </button>
      <ul className="dropdown-menu numbers" aria-labelledby="numberSelect">
        {numberList()}
      </ul>
    </div>
  );
}
