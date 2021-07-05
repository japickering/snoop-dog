import React, { Component } from "react";
import { cors } from "./config";
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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinnerColor: "rgb(54, 215, 183)",
      breed: "dingo",
      subBreeds: [],
      number: 3,
      numbers: [1, 2, 3, 4, 5, 6, 7, 8],
      loading: true
    };

    this.getBreeds = this.getBreeds.bind(this);
    this.getSubBreeds = this.getSubBreeds.bind(this);
    this.getImagesByBreed = this.getImagesByBreed.bind(this);
    this.getSubBreedImages = this.getSubBreedImages.bind(this);
    this.randomImageByBreed = this.randomImageByBreed.bind(this);
    this.selectByBreed = this.selectByBreed.bind(this);
    this.breedsList = this.breedsList.bind(this);
    this.subBreedsList = this.subBreedsList.bind(this);
    this.imageList = this.imageList.bind(this);
    this.numberList = this.numberList.bind(this);
    this.selectNumberImages = this.selectNumberImages.bind(this);
  }

  componentDidMount() {
    this.getBreeds();
    this.getSubBreeds(this.state.breed);
    this.getImagesByBreed(this.state.breed, this.state.numberImages);
  }

  async getBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.error(error.status);
      })
      .then((res) => {
        console.log("breeds:", res.message);
        const breeds = [];
        const ob = res.message;

        for (const key in ob) {
          if (ob.hasOwnProperty(key)) {
            breeds.push(key);
          }
        }
        this.setState({
          loading: false,
          breeds: breeds
        });
      });
  }

  async getSubBreeds(breed) {
    fetch(`https://dog.ceo/api/breed/${breed}/list`)
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.error(error.status);
      })
      .then((res) => {
        console.log("Sub breeds:", res.message);
        this.setState({
          subBreeds: res.message
        });
      });
  }

  // random image fetch api requires cors proxy
  async randomImageByBreed(breed) {
    const url = `https://dog.ceo/api/breed/${breed}/images/random/`;
    fetch(cors, url)
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.error(error.status);
      })
      .then((res) => {
        console.log("res:", res);
        this.setState({
          image: res.message,
          breed: breed
        });
      });
  }

  async getImagesByBreed(breed, n) {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/${n}`)
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.error(error.status);
      })
      .then((res) => {
        console.log("Breed images:", res.message);
        this.setState({
          images: res.message,
          breed: breed
        });
      });
  }

  async getSubBreedImages(sub) {
    fetch(`https://dog.ceo/api/breed/${this.state.breed}/${sub}/images`)
    // fetch(`https://dog.ceo/api/breed/hound/afghan/images`)
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.error(error.status);
      })
      .then((res) => {
        console.log("Sub breed images:", res.message);
        this.setState({
          images: res.message
        });
      });
  }

  breedsList() {
    return this.state.breeds.map((breed) => {
      return (
        <li key={breed}>
          <button
            className="dropdown-item"
            type="button"
            onClick={() => this.selectByBreed(breed)}
          >
            {breed}
          </button>
        </li>
      );
    });
  }

  subBreedsList() {
    return this.state.subBreeds.map((sub) => {
      return (
        <li key={sub}>
          <button
            className="dropdown-item"
            type="button"
            onClick={() => this.getSubBreedImages(sub)}
          >
            {sub}
          </button>
        </li>
      );
    });
  }

  numberList() {
    return this.state.numbers.map((num) => {
      return (
        <li key={num}>
          <button
            className="dropdown-item"
            type="button"
            onClick={() => this.selectNumberImages(num)}
          >
            {num}
          </button>
        </li>
      );
    });
  }

  imageList() {
		return this.state.images.map((image, i) => {
			if(i > this.state.number) {
				return;
			}
			return (
				<li key={image} className="img-list mb-3 mr-3">
					<img className="box-shadow" src={image} alt="" />
				</li>
			);
		});
  }

  selectByBreed(breed) {
    this.getImagesByBreed(breed, this.state.number);
    this.getSubBreeds(breed);
  }

  selectNumberImages(num) {
    this.setState({ number: num });
    this.getImagesByBreed(this.state.breed, num);
  }

  render() {
    if (this.state.loading) {
      return (
        <ClipLoader
          loading={this.state.loading}
          size={60}
          color={this.state.spinnerColor}
          css={override}
        />
      );
    }
    if (!this.state.loading) {
      return (
        <div className="container-flex w-100 mt-2">
          <h1 id="title" className="title">
            dog breed : <span>{this.state.breed}</span>
          </h1>

          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="mb-2 col col-xl-2">
                  <div className="dropdown">
                    <button
                      id="breedSelect"
                      className="btn btn-success"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Select Dog breed..
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="breedSelect">
                      {this.breedsList()}
                    </ul>
                  </div>
                </div>
                <div className="mb-2 col col-xl-2">
                  {this.state.breed !== undefined &&
                    this.state.subBreeds.length > 0 && (
                      <div className="dropdown">
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
                      </div>
                    )}
                </div>
                <div className="mb-2 col col-xl-2">
                  <div className="dropdown">
                    <button
                      id="numberSelect"
                      className="btn btn-default"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Select number of images..
                    </button>
                    <ul
                      className="dropdown-menu numbers"
                      aria-labelledby="numberSelect"
                    >
                      {this.numberList()}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row m-1">
                {this.state.images !== undefined && <ul>{this.imageList()}</ul>}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
