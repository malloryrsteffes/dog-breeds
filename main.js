// GLOBALS
const populate = document.querySelector("#populate");
const breed_list_selector = document.querySelector("#breed-list");
const Breeds_URL = "https://dog.ceo/api/breeds/list/all";

// Fetch Request

let populateBreedList = () => {
  fetch(Breeds_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network Error");
      }
      return response.json();
    })
    .then(data => {
      //Get the full breed list from the response
      let full_breed_list = data.message;

      let dropdown_list = "";

      // Push each key into the dropdown_list variable as an html <option>, then populate the dropdown
      for (var key in full_breed_list) {
        // Make the breeds capitalized and pretty
        let key_capitalized = key.charAt(0).toUpperCase() + key.slice(1);
        dropdown_list += `<option value='${key_capitalized}'>${key_capitalized}</option>`;
        document.getElementById("breed-list").innerHTML = dropdown_list;
      }
    })
    .catch(error => console.log(error));
};

let getBreedPics = () => {
  // Grab the breed from the selected option (to lower case, else throws error)
  let breed = breed_list_selector.options[
    breed_list_selector.selectedIndex
  ].value.toLowerCase();
  // Build the URL dynamically. The response is an array of image URLs.
  let images_URL = `https://dog.ceo/api/breed/${breed}/images`;
  fetch(images_URL)
    .then(res => res.json())
    .then(data => {
      let arr = data.message;
      let selected_images = [];
      // Ensures we don't get empty image tags
      if (arr.length < 8) {
        for (let k = 0; k < arr.length; k++) {
          shuffleArray(arr);
          selected_images.push(arr[k]);
          console.log("Darn - not many pictures of this breed!");
        }
      } else {
        // Grab 8 random images from the OG array
        for (let i = 0; i < 8; i++) {
          shuffleArray(arr);
          selected_images.push(arr[i]);
        }
      }
      // Set up the gallery
      let output = "";
      const gallery = document.getElementById("gallery");
      // Map over the array and add each array item to the output
      selected_images.map(url => {
        output += `<div class="col-6 col-sm-3">
      <img src=${url} class="img-fluid" alt="A very cute ${breed}"/></div>`;
      });
      // Add the entire output to the awaiting container
      gallery.innerHTML = output;
    })
    .catch(error => console.log(error));
};

// EVENT LISTENER
window.addEventListener("load", populateBreedList);
populate.addEventListener("click", getBreedPics);

// HELPERS

function shuffleArray(arr) {
  arr.sort(() => Math.random() - 0.5);
}
