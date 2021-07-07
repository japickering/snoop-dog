import React, { Component } from "react";
import {
  getBreeds,
  getSubBreeds,
  getImagesByBreed,
  getImagesBySubBreed
  // randomImageByBreed,
} from "./api/api";
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
      breed: "hound",
      selection: "Select Dog breed..",
      selectionSub: "",
      subBreeds: [],
      max: 4,
      selectedNumber: 4,
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      loading: true
    };

    // this.getBreeds = this.getBreeds.bind(this);
    // this.getSubBreeds = this.getSubBreeds.bind(this);
    // this.getImagesByBreed = this.getImagesByBreed.bind(this);
    // this.getImagesBySubBreed = this.getImagesBySubBreed.bind(this);
    // this.randomImageByBreed = this.randomImageByBreed.bind(this);
    this.selectByBreed = this.selectByBreed.bind(this);
    this.breedsList = this.breedsList.bind(this);
    this.subBreedsList = this.subBreedsList.bind(this);
    this.imageList = this.imageList.bind(this);
    this.numberList = this.numberList.bind(this);
    this.selectNumberImages = this.selectNumberImages.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", () => {
      const min = 20;
      this.setState({ scrollDown: window.scrollY > min ? true : false });
    });
    getBreeds(this);
    getSubBreeds(this, this.state.breed);
    getImagesByBreed(this, this.state.breed, this.state.max);
  }

  selectByBreed(breed) {
    getImagesByBreed(this, breed, this.state.max);
    getSubBreeds(this, breed);
  }

  selectNumberImages(num) {
    this.setState({ max: num, selectedNumber: num });
    getImagesByBreed(this, this.state.breed, num);
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
    const self = this;
    return this.state.subBreeds.map((sub) => {
      return (
        <li key={sub}>
          <button
            className="dropdown-item"
            type="button"
            onClick={() => getImagesBySubBreed(self, sub)}
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
    const imgs = this.state.images;
    const arr = [];
    // limit output by max images
    for (let i = 0; i < this.state.max; i++) {
      const label =
        this.state.subBreeds.length > 0
          ? this.state.breed + " " + this.state.subBreeds[i]
          : this.state.breed + i;
      arr.push(
        <li key={imgs[i]} className="img-list mb-3 mr-3">
          <img className="box-shadow" src={imgs[i]} alt={label} />
        </li>
      );
    }
    return arr;
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
          <h1 id="top" className="title ml-2">
            dog breed: <span>{this.state.breed}</span>&nbsp;
            <span>{this.state.selectionSub}</span>
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
                      Selected breed: {this.state.selection}
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
                          {this.subBreedsList(this.state.breed)}
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
                      Number of images: {this.state.selectedNumber}
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
          {this.state.scrollDown && (
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
}
