import { cors } from "../config";

export async function getBreeds(context) {
	fetch("https://dog.ceo/api/breeds/list/all")
		.then((res) => {
			return res.json();
		})
		.catch((error) => {
			console.error(error.status);
		})
		.then((res) => {
			// console.log("breeds:", res.message);
			const breeds = [];
			const ob = res.message;

			for (const key in ob) {
				if (ob.hasOwnProperty(key)) {
					breeds.push(key);
				}
			}
			context.setState({
				loading: false,
				breeds: breeds
			});
		});
}

export async function getSubBreeds(context, breed) {
	fetch(`https://dog.ceo/api/breed/${breed}/list`)
		.then((res) => {
			return res.json();
		})
		.catch((error) => {
			console.error(error.status);
		})
		.then((res) => {
			// console.log("Sub breeds:", res.message);
			context.setState({
				subBreeds: res.message,
				selectionSub: ""
			});
		});
}

// random image fetch api requires cors proxy
export async function randomImageByBreed(context, breed) {
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
			context.setState({
				image: res.message,
				breed: breed
			});
		});
}

export async function getImagesByBreed(context, breed, n) {
	fetch(`https://dog.ceo/api/breed/${breed}/images/random/${n}`)
		.then((res) => {
			return res.json();
		})
		.catch((error) => {
			console.error(error.status);
		})
		.then((res) => {
			// console.log("Breed images:", res.message);
			context.setState({
				images: res.message,
				breed: breed,
				selection: breed
			});
		});
}

export async function getImagesBySubBreed(context, sub) {
	fetch(`https://dog.ceo/api/breed/${context.state.breed}/${sub}/images`)
	// fetch(`https://dog.ceo/api/breed/hound/afghan/images`)
		.then((res) => {
			return res.json();
		})
		.catch((error) => {
			console.error(error.status);
		})
		.then((res) => {
			// console.log("Sub breed images:", res.message);
			context.setState({
				images: res.message,
				selectionSub: sub
			});
		});
}
