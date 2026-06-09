// async function getDogFacts() {
//   try {
//     const response = await fetch("https://api.thedogapi.com/v1/breeds", {
//       headers: {
//         "x-api-key":
//           "live_NKqLkdJfzPTsOnRVofnj8YmACWDLHdE5QnPIXUZ2lKt7zCLk83P7eX9ifMI2g1m0",
//       },
//     });
//     if (!response.ok) {
//       throw new Error(error);
//     }
//     const data = await response.json();
//     console.log(data);
//     createDropdown(data);
//     //populateFactList(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

async function getDogData() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    if (!response.ok) {
      throw new Error(error);
    }
    const data = await response.json();

    createDropdown(data);
    //populateFactList(data);
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

    // option.addEventListener("click", function () {
    //   getDogFacts(key);
    // });

    select.append(option);
    //console.log(`${key}: ${value}`);
  }
}

async function loadByBreed(breed) {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
  const data = await response.json();
  //console.log(data);

  createSlideShow(data.message);
}
const imageSection = document.getElementById("images");
const image = document.createElement("img");

function createSlideShow(data) {
  image.src = data[Math.floor(Math.random() * Object.keys(data).length)];
  image.alt = "photoPlaceholder";
  imageSection.append(image);
}

// function populateFactList(breed) {
//   const listSection = document.getElementById("facts");
//   const factList = listSection.querySelector("ol");
//   const fact = document.createElement("li");
//   fact.innerText = "hi";
//   factList.append(fact);
// }

// async function getDogFacts(key) {
//   try {
//     const response = await fetch("https://api.thedogapi.com/v1/breeds", {
//       headers: {
//         "x-api-key":
//           "live_NKqLkdJfzPTsOnRVofnj8YmACWDLHdE5QnPIXUZ2lKt7zCLk83P7eX9ifMI2g1m0",
//       },
//     });
//     if (!response.ok) {
//       throw new Error(error);
//     }
//     const data = await response.json();
//     console.log(data);
//     console.log("check1 " + key);
//     console.log("check2 " + data[0].name.toLowerCase());
//     const target = data.find((element) => element.name.toLowerCase() === key);
//     console.log(target);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }
