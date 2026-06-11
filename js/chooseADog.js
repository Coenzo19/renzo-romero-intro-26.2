//fetches data from api like breed name
async function getDogData() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    if (!response.ok) {
      throw new Error(error);
    }
    const data = await response.json();

    createDropdown(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getDogData();

//creates a list populated by dogs
function createDropdown(data) {
  const list = document.querySelector(".dropdown");
  const select = document.createElement("select");
  const text = document.createElement("option");
  text.innerText = "choose a dog";
  select.append(text);
  list.append(select);

  for (const [key, value] of Object.entries(data.message)) {
    const option = document.createElement("option");
    option.innerHTML = key;
    option.addEventListener("click", function () {
      loadByBreed(key);
    });

    select.append(option);
    
  }
}

//fetches random image from api
async function loadByBreed(breed) {
  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random`,
  );
  const data = await response.json();
  loadImage(data.message);
}
//populates html with image
function loadImage(data) {
  const imageSection = document.getElementById("images");
  const image = document.createElement("img");
  imageSection.innerHTML = "";
  image.src = data;
  image.alt = "photoPlaceholder";
  imageSection.append(image);
}