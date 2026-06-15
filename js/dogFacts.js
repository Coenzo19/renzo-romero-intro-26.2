getDogFacts();

document.querySelector(".factSection").hidden = true;

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
    //console.log(data);
    createDropdown(data);
  } catch (error) {
    
    document.querySelector("h1").innerText =
      "Error fetching data: " + error + " Please try again later";
    document.querySelector("h1").style.color = "red";
  }
}

//creates a list populated by dogs given api data
function createDropdown(data) {
  const list = document.querySelector(".dropdown");
  const select = document.createElement("select");
  // add an event listener that calls a function,passing the data from the api and the value of the clicked element
  select.addEventListener("change", function () {
    
    toggleSection(data, event.target.value);
  });

  //create default text and append
  const defaultText = document.createElement("option");
  defaultText.setAttribute("id", "default");
  defaultText.innerText = "choose a dog";
  select.append(defaultText);
  list.append(select);

  //adding to the dropdown menu from the api using a loop since the data is an array of objects
  data.forEach((element) => {
    const option = document.createElement("option");
    option.innerText = element.name;

    select.append(option);
  });
}

//reveals information from the api based on choice
function toggleSection(data, target) {
  const factSection = document.querySelector(".factSection");
  const factHeader =document.querySelector('.fact').querySelector('h2');
  factHeader.textContent='Choose a Fact';
  //reveal info options
  factSection.hidden = false;
  //remove default text after click;
  if (document.querySelector("#default")) {
    document.querySelector("#default").remove();
  }

  //grab button element
  const descBtn = document.querySelector("#descBtn");
  const histBtn = document.querySelector("#histBtn");
  const lifeBtn = document.querySelector("#lifeBtn");
  const origBtn = document.querySelector("#origBtn");
  const tempBtn = document.querySelector("#tempBtn");

  //grab list elements
  const descItem = document.querySelector("#description");
  const histItem = document.querySelector("#history");
  const lifeItem = document.querySelector("#life_span");
  const origItem = document.querySelector("#origin");
  const tempItem = document.querySelector("#temperament");

  //hide elements until button is clicked
  descItem.hidden = true;
  histItem.hidden = true;
  lifeItem.hidden = true;
  origItem.hidden = true;
  tempItem.hidden = true;

  //populates list from data using a loop
  for (element of data) {
    if (element.name === target) {
      //hides elements until buttons are clicked;
      document.querySelector("ol").hidden = true;

      descItem.innerText = element.description;
      histItem.innerText = element.history;

      //lifespan has a chance of returning a null value
      lifeItem.innerText = element.life_span;
      if (element.life_span === null) {
        lifeItem.textContent = "data unavailable";
      }
      origItem.innerText = element.origin;
      tempItem.innerText = element.temperament;
    }
  }
  //buttons reveal information based on which button is clicked,hides other buttons 
  descBtn.addEventListener("click", (event) => {
    factHeader.textContent=event.target.innerHTML;
    document.querySelector("ol").hidden = false;
    descItem.hidden = false;
    histItem.hidden = true;
    lifeItem.hidden = true;
    origItem.hidden = true;
    tempItem.hidden = true;
  });

  histBtn.addEventListener("click", (event) => {
    factHeader.textContent=event.target.innerHTML;
    document.querySelector("ol").hidden = false;
    descItem.hidden = true;
    histItem.hidden = false;
    lifeItem.hidden = true;
    origItem.hidden = true;
    tempItem.hidden = true;
  });

  lifeBtn.addEventListener("click", (event) => {
    factHeader.textContent=event.target.innerHTML;
    document.querySelector("ol").hidden = false;
    descItem.hidden = true;
    histItem.hidden = true;
    lifeItem.hidden = false;
    origItem.hidden = true;
    tempItem.hidden = true;
  });

  origBtn.addEventListener("click", (event) => {
    factHeader.textContent=event.target.innerHTML;
    document.querySelector("ol").hidden = false;
    descItem.hidden = true;
    histItem.hidden = true;
    lifeItem.hidden = true;
    origItem.hidden = false;
    tempItem.hidden = true;
  });

  tempBtn.addEventListener("click", (event) => {
    factHeader.textContent=event.target.innerHTML;
    document.querySelector("ol").hidden = false;
    descItem.hidden = true;
    histItem.hidden = true;
    lifeItem.hidden = true;
    origItem.hidden = true;
    tempItem.hidden = false;
  });
}
