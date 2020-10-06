// GLOBALS
const populate = document.querySelector("#populate");
const breed_list_selector = document.querySelector("#breed-list");
const Breeds_URL = "https://dog.ceo/api/breeds/list/all";

let breeds = [];

// EVENT LISTENER
window.addEventListener("load", populateBreeds);
populate.addEventListener("click", getBreedPic);
// Initial Fetch Request

function populateBreeds() {
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
    .catch(error => console.log("Oops! There has been an error."));
}

function getBreedPic() {
  //Grab the breed from the selected option (to lower case, else throws error)
  let breed = breed_list_selector.options[
    breed_list_selector.selectedIndex
  ].value.toLowerCase();
  // Build the URL dynamically
  let images_URL = `https://dog.ceo/api/breed/${breed}/images`;
  fetch(images_URL)
    .then(res => res.json())
    .then(data => {
      console.log(data.message);
    });
}
