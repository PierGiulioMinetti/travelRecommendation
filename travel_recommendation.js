const searchInput = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#searchBtn");
const clearBtn = document.querySelector("#clearBtn");
const resultContainer = document.querySelector("#result-search-container");
const titleEl = document.querySelector("title");
const imgContainer = document.querySelector("#img-container");
const errorMessage = document.querySelector("#error-message");

// search bar event
searchInput.addEventListener("keydown", (event) => {
	const inputValue = event.target.value;
	// console.log("Key pressed: ", inputValue);
});

// search BTN event
searchBtn.addEventListener("click", (event) => {
	resultContainer.classList.remove("result-search-container");

	const searchedWord = searchInput.value;
	console.log("searchedWord", searchedWord);

	fetch("./travel_recommendation_api.json")
		.then((res) => res.json())
		.then((resp) => {
			const { beaches, temples, countries } = resp;

			// Check for the user submission
			if (searchedWord === "beaches") {
				console.log("search beaches", beaches);
				resultContainer.innerHTML = "";

				if (beaches) {
					beaches.forEach((element) => {
						resultContainer.innerHTML += `
						 <h1 id="title" class="mt-3">
							${element.name}
						 </h1>
						 <p id="description">
							${element.description}
						</p>
						<div id="img-container">
							<img class="img-destination" src="${element.imageUrl}" alt="">
						</div>
						`;
					});
					resultContainer.classList.add("result-search-container");
					errorMessage.innerText = "";
				}
			} else if (searchedWord === "temples") {
				console.log("search temples", temples);
				if (temples) {
					temples.forEach((element) => {
						resultContainer.innerHTML += `
						 <h1 id="title" class="mt-3">
							${element.name}
						 </h1>
						 <p id="description">
							${element.description}
						</p>
						<div id="img-container">
							<img class="img-destination" src="${element.imageUrl}" alt="">
						</div>
						`;
					});
					resultContainer.classList.add("result-search-container");
					errorMessage.innerText = "";
				}
			} else if (searchedWord === "countries") {
				console.log("countries", countries);

				countries.forEach((element) => {
					element.cities.forEach((city) => {
						resultContainer.innerHTML += `
							<h1 id="title" class="mt-3">
							   ${element.name}
							</h1>
							<p id="description">
							   ${city.description}
						   </p>
						   <div id="img-container">
							   <img class="img-destination" src="${city.imageUrl}" alt="">
						   </div>
						   `;
					})
				});
				resultContainer.classList.add("result-search-container");
				errorMessage.innerText = "";
			} else {
				resultContainer.innerHTML = "";
				errorMessage.innerText =
					"Please enter a valid search query. Ex: countries, temple, beaches";
			}

			// Assign dynamically this css class --> result-search-container
		})
		.catch((err) => {
			console.log(err);
		});
});

clearBtn.addEventListener("click", () => {
	resultContainer.classList.remove("result-search-container");
	resultContainer.innerHTML = "";
	errorMessage.innerText = "";
});
