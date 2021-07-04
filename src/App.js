import React, { Component } from "react";
import { cors } from "./config";
import { css } from "@emotion/react";
// import { BounceLoader, BeatLoader, CircleLoader, ClipLoader } from "react-spinners";
import { ClipLoader } from "react-spinners";

import "bootstrap";
import "./styles/bootstrap.min.css";
// import "./styles/bootstrap_limitless.min.css";
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
			loading: true,
		};

		this.getBreeds = this.getBreeds.bind(this);
		this.getSubBreeds = this.getSubBreeds.bind(this);
		this.breedsList = this.breedsList.bind(this);
		this.subBreedsList = this.subBreedsList.bind(this);
		this.randomImageByBreed = this.randomImageByBreed.bind(this);
		this.selectRandomImageByBreed = this.selectRandomImageByBreed.bind(this);
		this.setImageBySubBreed = this.setImageBySubBreed.bind(this);
	}

	componentDidMount() {
		this.getBreeds();
		this.randomImageByBreed("hound");
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
					breeds: breeds,
				});
			});
	}

	async getSubBreeds(breed) {
		fetch(`https://dog.ceo/api/breed/${breed}/images`)
			.then((res) => {
				return res.json();
			})
			.catch((error) => {
				console.error(error.status);
			})
			.then((res) => {
				console.log("Sub breeds:", res.message);
				this.setState({
					loading: false,
					subBreeds: res.message,
				});
			});
	}

	async randomImageByBreed(breed) {
		const url = `https://dog.ceo/api/breed/${breed}/images/random/`;
		fetch(cors + url)
			.then((res) => {
				return res.json();
			})
			.catch((error) => {
				console.error(error.status);
			})
			.then((res) => {
				console.log("image:", res.message);
				this.setState({
					image: res.message,
					breed: breed,
				});
			});
	}

	selectRandomImageByBreed(e, breed) {
		e.preventDefault();
		this.randomImageByBreed(breed);
		this.getSubBreeds(breed);
	}

	breedsList() {
		const list = this.state.breeds.map((breed) => {
			return (
				<li key={breed}>
					<a
						href="./"
						className="dropdown-item"
						onClick={(e) => this.selectRandomImageByBreed(e, breed)}
					>
						{breed}
					</a>
				</li>
			);
		});
		return list;
	}

	subBreedsList() {
		const list = this.state.subBreeds.map((img, i) => {
			return (
				<li key={img}>
					<a
						href="./"
						className="dropdown-item"
						onClick={(e) => this.setImageBySubBreed(e, img)}
					>
						{this.state.breed + " " + i}
					</a>
				</li>
			);
		});
		return list;
	}

	setImageBySubBreed(event, img) {
		event.preventDefault();
		this.setState({ image2: img });
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
					<h1 className="title">Dog breed <span>{this.state.breed}</span></h1>
					<div className="card">
						<div className="card-header">
							<div className="row">
								<div className="mb-2 col col-xl-6">
									<div className="dropdown breeds">
										<button
											id="breedSelect"
											className="btn btn-default"
											type="button"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											Select breed..
										</button>
										<ul className="dropdown-menu" aria-labelledby="breedSelect">
											{this.breedsList()}
										</ul>
									</div>
								</div>
								<div className="mb-2 col col-xl-6">
									{this.state.breed !== undefined &&
										this.state.subBreeds !== undefined && (
											<div className="dropdown sub-breeds">
												<button
													id="subBreedSelect"
													className="btn btn-default"
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
							</div>
						</div>
						<div className="card-body">
							<div className="row mt-2 ml-2">
								{this.state.image !== undefined && (
									<img
										className="active mr-2"
										src={this.state.image}
										alt={this.state.breed}
										title={this.state.breed}
									/>
								)}
								{this.state.image2 !== undefined && (
									<img
										className=""
										src={this.state.image2}
										alt="sub breed"
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
