// GLOBALS
const populate = document.querySelector("#populate");
const breed_list_selector = document.querySelector("#breed-list");
const Breeds_URL = "https://dog.ceo/api/breeds/list/all";

let breeds = [];

// Initial Fetch Request

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
  //Grab the breed from the selected option (to lower case, else throws error)
  let breed = breed_list_selector.options[
    breed_list_selector.selectedIndex
  ].value.toLowerCase();
  // Build the URL dynamically. The response is an array of image URLs.
  let images_URL = `https://dog.ceo/api/breed/${breed}/images`;
  fetch(images_URL)
    .then(res => res.json())
    .then(data => {
      let arr = data.message;
      console.log(arr);
      let images_array = [];
      // Grab 6 random images from the OG array
      for (let i = 0; i < 6; i++) {
        shuffleArray(arr);
        images_array.push(arr[i]);
      }
      let output = "";
      const gallery = document.getElementById("gallery");
      console.log(gallery);
      // map over the array and add each array item to the output
      images_array.map(url => {
        output += `<div class="card mb-4 box-shadow">
      <div class="card-body"><img src=${url} class="img fluid" alt="a very cute dog"/></div></div>`;
      });
      console.log(output);
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
