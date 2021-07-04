import React, { Component } from "react";
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.breedsListAll = this.breedsListAll.bind(this);
    this.fetchBreeds = this.fetchBreeds.bind(this);
  }

  componentDidMount() {
		this.fetchBreeds();
	}

	fetchBreeds(){
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
					data: res.message
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
      return <div>loading..</div>;
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
