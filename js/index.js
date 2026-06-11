const footerElement = document.createElement("footer");

document.body.append(footerElement);

const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");

copyright.innerHTML = "\u00A9" + "Renzo Romero " + thisYear;

footer.appendChild(copyright);

const skills = [
  "Javascript",
  "HTML",
  "CSS",
  "GitHub",
  "Autodesk Maya",
  "photoshop",
  "Bartending",
  "Java",
  "Unreal Engine",
  "Texturing",
  "Photogrammetry",
  "Rendering",
  "Cooking",
];

const skillSection = document.querySelector("#skills");
const skillsList = skillSection.querySelector("ul");

for (sk of skills) {
  let skill = document.createElement("li");
  skill.innerText = sk;
  skillsList.appendChild(skill);
}

const messageForm = document.querySelector("form[name = 'leave_message']");
messageForm.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  //gather information from event
  const name = event.target.usersName.value;
  const email = event.target.usersEmail.value;
  const message = event.target.usersMessage.value;
  console.log(name);
  console.log(email);
  console.log(message);

  //get elements from html
  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");
  const newMessage = document.createElement("li");

  //show messageSection when submit button is clicked
  messageSection.hidden = false;

  //populate new message from user input
  newMessage.innerHTML = `<a href="mailto:${email}">${name}:</a>\n
  <span>${message}</span>`;

  //create editButton,set attributed and add eventListener
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.setAttribute("type", "button");
  editButton.setAttribute("class", "editButton");
  editButton.addEventListener("click", onEditMessage);

  //create removeButton,set attribute and add eventListener
  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.setAttribute("type", "button");
  removeButton.addEventListener("click", onRemoveButton);

  //callback for editing messages
  function onEditMessage(event) {
    //access the span element containing the text using the buttons parent node and querying the span element
    const entry = event.target.parentNode;
    const messageElement = entry.querySelector("span");

    //create the input element that will allow user edit text.setting it's starting value to original text
    let inputField = document.createElement("input");
    inputField.type = "text";
    inputField.name = "usersMessage";
    inputField.value = messageElement.textContent;

    //replacing the span element with the input element
    messageElement.replaceWith(inputField);

    //changing content of edit button after replacing text to be a save button,setting attributes, replacing the onEditEventListener with a new OnSaveButton event that will save the newly edited text
    this.textContent = "Save";
    this.classList.add("saveButton");
    this.setAttribute("id", "saveButtonId");
    this.removeEventListener("click", onEditMessage);
    this.addEventListener("click", onSaveButton);
  }
  //callback for saving text and returning thebutton back to it's default edit state asfter saving
  function onSaveButton(event) {
    //access the input element created in the onEditMessage function.
    const entry = event.target.parentNode;
    const inputElement = entry.querySelector("input");

    //access and store the value of the users input in a variable
    let usersMessage = entry.querySelector(
      "input[name = 'usersMessage']",
    ).value;

    //create new span element and make its content equal the newly edited text.
    let spanText = document.createElement("span");
    spanText.textContent = usersMessage;

    //switch out the unput element with the span element created above containing the newly edited message
    inputElement.replaceWith(spanText);

    //change the button back into an edit button;
    this.textContent = "edit";
    this.classList.add("editButton");
    this.setAttribute("class", "editButton");
    this.removeEventListener("click", onSaveButton);
    this.addEventListener("click", onEditMessage);
  }
  //removes the parent node/list element connected to the event on click
  function onRemoveButton(event) {
    const entry = removeButton.parentNode;
    entry.remove();

    //check if there are any messages/list elements,if none then it will hide the messageSection
    if (
      document.getElementById("messages").getElementsByTagName("li").length ===
      0
    ) {
      messageSection.hidden = true;
    }
  }

  //append buttons to the newly created message
  newMessage.appendChild(editButton);
  newMessage.appendChild(removeButton);
  //adds the message to the message list element(adds the newly created 'li' element to the 'ul' element)
  messageList.append(newMessage);

  //Reset the Form
  messageForm.reset();
}
//sets the messagesection to hidden on start
document.getElementById("messages").hidden = true;

const projectSection = document.getElementById("Projects");
const projectList = projectSection.querySelector("ul");

fetch("https://api.github.com/users/Coenzo19/repos")
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then((data) => {
    const repositories = data;

    if (repositories.length === 0) {
      const errorMessage = document.createElement("li");
      errorMessage.setAttribute("id", "error");
      errorMessage.innerText = "Currently there are no active projects";
      projectList.appendChild(errorMessage);
      return;
    }

    for (obj of repositories) {
      const project = document.createElement("li");
      project.innerText = obj.name;

      const img = document.createElement("img");
      img.src = "images/placeHolder.png";
      img.alt = `${obj.name} image`;

      project.prepend(img);
      projectList.appendChild(project);
    }
  })
  .catch((error) => {
    const errorMessage2 = document.createElement("li");
    errorMessage2.setAttribute("id", "error");
    errorMessage2.innerText = `An error has occured, ${error}`;
    projectList.appendChild(errorMessage2);
  });


