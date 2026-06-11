//fetches infromation from api and calls the createDropdown(data) function
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

//creates a list populated by dogs given api data
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

//query html elemts to access via javascript
const factSection = document.querySelector(".factSection");
const factList = factSection.querySelector("ol");

//hide factSection until cicked upon to reveal categories abd add event listeners
function loadFacts(data) {
  factSection.hidden = false;
  document.addEventListener("click", function (e) {
    if (e.target.tagName == "BUTTON") {
      populateFacts(data, event.target.innerText);
    }
  });
}

//populates category based on what was clicked and returns data from api
function populateFacts(data, event) {
  const factCategory = document.querySelector(".fact");
  const factTitle = factCategory.querySelector("h2");
  const fact = factCategory.querySelector("p");

  if (event === "Life Span") {
    console.log(" Life SPan is here");
    factTitle.innerText = event;
    fact.innerText = data["life_span"];

    return;
  }

  factTitle.innerText = event;
  fact.innerText = data[event];
}
//hides facts section until option is clicked
factSection.hidden = true;
