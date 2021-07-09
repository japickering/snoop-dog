import React, { useState, useEffect } from "react";
// import { cors } from "./config";
import { css } from "@emotion/react";
// import { BounceLoader, BeatLoader, CircleLoader, ClipLoader } from "react-spinners";
import { ClipLoader } from "react-spinners";

// styles
import "bootstrap";
import "./styles/bootstrap.min.css";
import "./App.css";

// react-spinners custom css
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function App() {
	const [loading, setLoading] = useState(true);
	const [spinnerColor, setSpinnerColor] = useState("rgb(54, 215, 183)");
	const [breed, setBreed] = useState("hound");
	const [breeds, setBreeds] = useState([]);
	const [subBreeds, setSubBreeds] = useState([]);
	// const [image, setImage] = useState("");
	const [images, setImages] = useState([]);
	const [selection, setSelection] = useState("Select Dog breed..");
	const [selectionSub, setSelectionSub] = useState("");
	const [max, setMax] = useState(4);
	const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	const [scrollDown, setScrollDown] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState(4);

	// APIs
	const getBreeds = () => {
		fetch("https://dog.ceo/api/breeds/list/all")
			.then((res) => {
				return res.json();
			})
			.catch((error) => {
				console.error(error.status);
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
			});
	}

	const getSubBreeds = (breed) => {
		fetch(`https://dog.ceo/api/breed/${breed}/list`)
			.then((res) => {
				return res.json();
			})
			.catch((error) => {
				console.error(error.status);
			})
			.then((res) => {
				// console.log("Sub breeds:", res.message);
				setSubBreeds(res.message);
				setSelectionSub("");
			});
	}

	// random image api requires cors proxy
	/* const randomImageByBreed = (breed) => {
		const url = `https://dog.ceo/api/breed/${breed}/images/random/`;
		fetch(cors, url)
			.then((res) => {
				return res.json();
			})
			.catch((error) => {
				console.error(error.status);
			})
			.then((res) => {
				// console.log("res:", res);
				setImage(res.image);
				setBreed(breed);
			});
	} */

	const getImagesByBreed = (breed, n) => {
		fetch(`https://dog.ceo/api/breed/${breed}/images/random/${n}`)
			.then((res) => {
				return res.json();
			})
			.catch((error) => {
				console.error(error.status);
			})
			.then((res) => {
				// console.log("Breed images:", res.message);
				setImages(res.message);
				setBreed(breed);
				setSelection(breed);
			});
	}

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
	}

	// useEffect with loading flag
	useEffect(() => {
		window.addEventListener("scroll", () => {
			const min = 20;
			setScrollDown(window.scrollY > min ? true : false );
		});
		// load defaults
		getBreeds();
		getSubBreeds(breed);
		getImagesByBreed(breed, max);
	}, [loading]);

	const selectByBreed = (breed) => {
    getImagesByBreed(breed, max);
    getSubBreeds(breed);
  }

  const selectNumberImages = (num) => {
		setMax(num);
		setSelectedNumber(num);
    getImagesByBreed(breed, num);
  }

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
      )
    })
  }

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
      )
    })
  }

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
      )
    })
  }

  const imageList = () => {
    const arr = [];
    // limit output by max images
    for (let i = 0; i < max; i++) {
      const label = subBreeds.length > 0 ? breed + " " + subBreeds[i] : breed + i;
      arr.push(
        <li key={images[i]} className="img-list mb-3 mr-3">
          <img className="box-shadow" src={images[i]} alt={label} />
        </li>
      );
    }
    return arr;
  }

	if (loading) {
		return (
			<ClipLoader
				loading={loading}
				size={60}
				color={spinnerColor}
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
								<div className="dropdown">
									<button
										id="breedSelect"
										className="btn btn-primary"
										type="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										Breed: {selection}
									</button>
									<ul className="dropdown-menu" aria-labelledby="breedSelect">
										{breedsList()}
									</ul>
								</div>
							</div>
							<div className="mb-2 col col-xl-2">
								{breed !== undefined &&
									subBreeds.length > 0 && (
										<div className="dropdown">
											<button
												id="subBreedSelect"
												className="btn btn-info"
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
												{subBreedsList(breed)}
											</ul>
										</div>
									)}
							</div>
							<div className="mb-2 col col-xl-2">
								<div className="dropdown">
									<button
										id="numberSelect"
										className="btn btn-success"
										type="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										Number of images: {selectedNumber}
									</button>
									<ul
										className="dropdown-menu numbers"
										aria-labelledby="numberSelect"
									>
										{numberList()}
									</ul>
								</div>
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
