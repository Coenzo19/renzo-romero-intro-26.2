const footerElement = document.createElement("footer");

footerElement.style.background = "#03344F";
footerElement.style.padding = "5px";

document.body.append(footerElement);

const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");

copyright.innerHTML = "\u00A9" + "Renzo Romero " + thisYear;
copyright.style.color = "#3efdfd";
copyright.style.textAlign = "center";

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

skillsList.style.display = "flex";
skillsList.style.flexDirection = "row";
skillsList.style.justifyContent = "space-evenly";
skillsList.style.flexWrap = "wrap";
skillsList.style.listStyleType = "none";

for (sk of skills) {
  let skill = document.createElement("li");
  skill.innerText = sk;
  skill.style.padding = "2px 10px";
  skillsList.appendChild(skill);
}
