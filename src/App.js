import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

// components
import BreedSelect from "./components/BreedSelect";
import SubBreedSelect from "./components/SubBreedSelect";
import NumberSelect from "./components/NumberSelect";

// styles
import "bootstrap";
import "./styles/bootstrap.min.css";
import "./App.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function App() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // images count
  const [max, setMax] = useState(4);
  const [loading, setLoading] = useState(true);
  const [breed, setBreed] = useState("hound");
  const [breeds, setBreeds] = useState([]);
  const [subBreeds, setSubBreeds] = useState([]);
  const [images, setImages] = useState([]);
  const [selection, setSelection] = useState("Select Dog breed..");
  const [selectionSub, setSelectionSub] = useState("");
  const [scrollDown, setScrollDown] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(4);

  // APIs
  const getBreeds = () => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log("breeds:", res.message);
        const arr = [];
        const ob = res.message;

        for (const key in ob) {
          if (ob.hasOwnProperty(key)) {
            arr.push(key);
          }
        }
        setLoading(false);
        setBreeds(arr);
      })
      .catch((err) => {
        console.log(err.status);
      });
  };

  const getSubBreeds = (breed) => {
    fetch(`https://dog.ceo/api/breed/${breed}/list`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log("Sub breeds:", res.message);
        setSubBreeds(res.message);
        setSelectionSub("");
      })
      .catch((err) => {
        console.log(err.status);
      });
  };

  const getImagesByBreed = (breed, n) => {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/${n}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log("Breed images:", res.message);
        setImages(res.message);
        setBreed(breed);
        setSelection(breed);
      })
      .catch((err) => {
        console.log(err.status);
      });
  };

  const getImagesBySubBreed = (breed, sub) => {
    fetch(`https://dog.ceo/api/breed/${breed}/${sub}/images`)
      // fetch(`https://dog.ceo/api/breed/hound/afghan/images`)
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.error(error.status);
      })
      .then((res) => {
        // console.log("Sub breed images:", res.message);
        setImages(res.message);
        setSelectionSub(sub);
      });
  };

  const selectByBreed = (breed) => {
    getImagesByBreed(breed, max);
    getSubBreeds(breed);
  };

  const selectNumberImages = (num) => {
    setMax(num);
    setSelectedNumber(num);
    getImagesByBreed(breed, num);
  };

  const breedsList = () => {
    return breeds.map((breed) => {
      return (
        <li key={breed}>
          <button
            className="dropdown-item"
            type="button"
            onClick={() => selectByBreed(breed)}
          >
            {breed}
          </button>
        </li>
      );
    });
  };

  const subBreedsList = (breed) => {
    return subBreeds.map((sub) => {
      return (
        <li key={sub}>
          <button
            className="dropdown-item"
            type="button"
            onClick={() => getImagesBySubBreed(breed, sub)}
          >
            {sub}
          </button>
        </li>
      );
    });
  };

  const numberList = () => {
    return numbers.map((num) => {
      return (
        <li key={num}>
          <button
            className="dropdown-item"
            type="button"
            onClick={() => selectNumberImages(num)}
          >
            {num}
          </button>
        </li>
      );
    });
  };

  const imageList = () => {
    const arr = [];
    // limit output by max images
    for (let i = 0; i < max; i++) {
      const label =
        subBreeds.length > 0 ? breed + " " + subBreeds[i] : breed + i;
      arr.push(
        <li key={images[i]} className="img-list mb-3 mr-3">
          <img className="box-shadow" src={images[i]} alt={label} />
        </li>
      );
    }
    return arr;
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const min = 20;
      setScrollDown(window.scrollY > min ? true : false);
    });
    // load defaults
    getBreeds();
    getSubBreeds(breed);
    getImagesByBreed(breed, max);
  }, [loading, breed, max]);

  if (loading) {
    return (
      <ClipLoader
        loading={loading}
        size={60}
        color="rgb(54, 215, 183)"
        css={override}
      />
    );
  }
  if (!loading) {
    return (
      <div className="container-flex w-100 mt-2">
        <h1 id="top" className="title ml-2">
          dog breed: <span>{breed}</span>&nbsp;
          <span>{selectionSub}</span>
        </h1>

        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="mb-2 col col-xl-2">
                <BreedSelect selection={selection} breedsList={breedsList} />
              </div>
              <div className="mb-2 col col-xl-2">
                {breed !== undefined && subBreeds.length > 0 && (
                  <SubBreedSelect breed={breed} subBreedsList={subBreedsList} />
                )}
              </div>
              <div className="mb-2 col col-xl-2">
                <NumberSelect
                  selectedNumber={selectedNumber}
                  numberList={numberList}
                />
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row m-1">
              {images !== undefined && <ul>{imageList()}</ul>}
            </div>
          </div>
        </div>
        {scrollDown && (
          <div className="footer-nav sticky-nav">
            <a href="#top" className="top">
              <i className="fa fa-arrow-up"></i>Back to top
            </a>
          </div>
        )}
      </div>
    );
  }
}
