async function getDogFacts() {
  try {
    const response = await fetch("https://api.thedogapi.com/v1/breeds", {
      headers: {
        "x-api-key":
          "live_NKqLkdJfzPTsOnRVofnj8YmACWDLHdE5QnPIXUZ2lKt7zCLk83P7eX9ifMI2g1m0",
      },
    });
    if (!response.ok) {
      throw new Error(error);
    }
    const data = await response.json();
    console.log(data);
    createDropdown(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getDogFacts();

//creates a list populated by dogs
function createDropdown(data) {
  const list = document.querySelector(".dropdown");
  const select = document.createElement("select");
  const text = document.createElement("option");
  text.innerText = "choose a dog";
  select.append(text);
  list.append(select);

  data.forEach((element) => {
    const option = document.createElement("option");
    option.innerText = element.name;
    option.addEventListener("click", function () {
      loadFacts(element);
    });
    select.append(option);
  });
}

const factSection = document.querySelector(".factSection");
const factList = factSection.querySelector("ol");

function loadFacts(data) {
  factSection.hidden = false;
  document.addEventListener("click", function (e) {
    if (e.target.tagName == "BUTTON") {
      populateFacts(data, event.target.innerText);
    }
  });
}
//event.target.outerText
function populateFacts(data, event) {
  const factCategory = document.querySelector(".fact");
  const factTitle = factCategory.querySelector("h2");
  const fact = factCategory.querySelector("p");
  console.log(data);
  console.log(event);
  if (event === "Life Span") {
    console.log(" Life SPan is here");
    factTitle.innerText = event;
    fact.innerText = data['life_span'];

    return;
  }

  factTitle.innerText = event;
  fact.innerText = data[event];
}

// function replaceElement(data){
// console.log(data.name);
// }

factSection.hidden = true;
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
