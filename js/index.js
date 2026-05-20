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
