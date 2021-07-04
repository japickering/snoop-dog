import React, { Component } from "react";
import { css } from "@emotion/react";
// import { BounceLoader, BeatLoader, CircleLoader, ClipLoader } from "react-spinners";
import { ClipLoader} from "react-spinners";
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
			color: "rgb(54, 215, 183)", // for react spinner
			loading: true,
		};
		this.breedsListAll = this.breedsListAll.bind(this);
		this.fetchBreeds = this.fetchBreeds.bind(this);
	}

	componentDidMount() {
		this.fetchBreeds();
	}

	fetchBreeds() {
		fetch("https://dog.ceo/api/breeds/list/all")
			.then((res) => {
				return res.json();
			})
			.catch((error) => {
				console.error(error.status);
			})
			.then((res) => {
				// console.log(res);
				console.log(res.message);
				this.setState({
					loading: false,
					data: res.message,
				});
			});
	}

	breedsListAll() {
		const arr = [];
		const ob = this.state.data;
		for (const key in ob) {
			if (ob.hasOwnProperty(key)) {
				arr.push(
					<li className="list-item" key={key}>
						{key + " [ " + ob[key] + " ]"}
					</li>
				);
			}
		}
		return arr;
	}

	render() {
		if (this.state.loading) {
			return (
				<ClipLoader
					loading={this.state.loading}
					size={60}
					color={this.state.color}
					css={override}
				/>
			);
		}
		if (!this.state.loading) {
			return (
				<div className="App">
					<h1>Dog Breeds List</h1>
					<ul>{this.breedsListAll()}</ul>
				</div>
			);
		}
	}
}
