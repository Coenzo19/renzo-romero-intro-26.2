//fetches data from api like breed name
async function getDogData() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    if (!response.ok) {
      throw new Error(error)
    }
    const data = await response.json()

    createDropdown(data)
  } catch (error) {
    console.error("Error fetching data:", error)
    document.querySelector('h1').innerText="Error fetching data: "+ error +" Please try again later";
    document.querySelector('h1').style.color='red';
  }
}

getDogData()

//creates a list populated by dogs
function createDropdown(data) {
  const list = document.querySelector(".dropdown")
  const select = document.createElement("select")
  const text = document.createElement("option")
  text.innerText = "choose a dog"
  select.append(text)
  list.append(select)

  for (const [key, value] of Object.entries(data.message)) {
    const option = document.createElement("option")
    option.innerHTML = key
    option.addEventListener("click", function () {
      loadByBreed(key)
    })

    select.append(option)
  }
}

//fetches random image from api
async function loadByBreed(breed) {
  try{
const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random`
  )
  const data = await response.json()
  loadImage(data.message, breed)
  }catch(error){
    console.error("Error fetching data:", error)
    document.querySelector('h1').innerText="Error fetching data: "+ error +" Please try again later";
    document.querySelector('h1').style.color='red';
    document.querySelector(".dropdown").hidden=true;
  }
  
}
//populates html with image
function loadImage(data, breed) {
  const imageSection = document.getElementById("images")
  const image = document.createElement("img")
  imageSection.innerHTML = ""
  image.src = data
  image.alt = `Image of ${breed}`
  imageSection.append(image)
}
