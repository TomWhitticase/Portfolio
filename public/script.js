//screen size (desktop or mobile)
let screenSize;
function updateScreenSize(x) {
  if (x.matches) {
    // If media query matches
    screenSize = "desktop";
  } else {
    screenSize = "mobile";
  }
  updateCarousel();
}
window
  .matchMedia("(min-width: 1024px)")
  .addEventListener("change", updateScreenSize);

window.onscroll = () => {
  let elements = document.getElementsByClassName("top-only");

  if (window.scrollY != 0) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add("hidden");
    }
  } else {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("hidden");
    }
  }
};

function tagClick(tag) {
  //get if tag was highlighted or not
  const highlighted = tag.classList.contains("highlight-tag");

  //get all tags matching tag clicked
  let allTags = [...document.getElementsByClassName("tag")];
  let tags = [];
  for (let i = 0; i < allTags.length; i++) {
    if (tag.innerHTML == allTags[i].innerHTML) {
      tags.push(allTags[i]);
    }
  }

  //toggle tags highlight
  for (let i = 0; i < tags.length; i++) {
    if (highlighted) tags[i].classList.remove("highlight-tag");
    else {
      tags[i].classList.add("highlight-tag");
    }
  }

  //only show cards containing highlighted tags
  const cards = document.getElementsByClassName("project-card");
  for (let i = 0; i < cards.length; i++) {
    let projectTags = cards[i].querySelectorAll(":scope > div > .tags > .tag");
    let containsHighlightedTag = false;
    for (let j = 0; j < projectTags.length; j++) {
      if (projectTags[j].classList.contains("highlight-tag")) {
        containsHighlightedTag = true;
      }
    }
    if (containsHighlightedTag) {
      cards[i].classList.remove("hidden");
    } else {
      cards[i].classList.add("hidden");
    }
  }

  //if no tags highlighted then show all projects
  let nTags = document.querySelectorAll(".highlight-tag").length;
  if (nTags == 0) {
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove("hidden");
    }
  }

  updateCarousel();
}

function menuClick() {
  let nav = document.getElementById("topnav-mobile");
  let icon = document.getElementById("menu-icon");
  if (nav.classList.contains("hidden")) {
    nav.classList.remove("hidden");
    icon.classList.add("fa-close");
    icon.classList.remove("fa-bars");
  } else {
    nav.classList.add("hidden");
    icon.classList.remove("fa-close");
    icon.classList.add("fa-bars");
  }
}

//contact form send email
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); //prevent form submit

  //get form data for email
  let formData = {
    name: contactForm.elements["name"].value,
    emailAddress: contactForm.elements["emailAddress"].value,
    message: contactForm.elements["message"].value,
  };

  //send email
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function () {
    if (xhr.responseText == "success") {
      alert("Email sent");
    } else {
      alert("Something went wrong! Email not sent.");
    }
  };
  xhr.send(JSON.stringify(formData));
});

function dark() {
  document.getElementsByTagName("html")[0].className = "dark";
  document.getElementById("toggleDark-icon").className =
    "fa fa-moon text-primary";
}
function light() {
  document.getElementsByTagName("html")[0].className = "";
  document.getElementById("toggleDark-icon").className = "fa-regular fa-sun";
}
function toggleDark() {
  if (document.getElementsByTagName("html")[0].className == "dark") {
    light();
  } else {
    dark();
  }
}

//carousel stuff//
const slidesContainer = document.getElementById("projects-container");
const prevButton = document.getElementById("slide-prev");
const nextButton = document.getElementById("slide-next");
let pageActive = 1;
let nPages;

nextButton.addEventListener("click", () => {
  changeCarouselPage(pageActive + 1);
});
prevButton.addEventListener("click", () => {
  changeCarouselPage(pageActive - 1);
});

function changeCarouselPage(pageNum) {
  if (pageNum < 0) pageNum = nPages - 1;
  if (pageNum > nPages - 1) pageNum = 0;
  pageActive = pageNum;

  //change page number indicator
  const pageNumbers = document.getElementById("carousel-page-numbers");
  for (let i = 0; i < pageNumbers.children.length; i++) {
    pageNumbers.children[i].classList.remove("active-page");
    if (pageNumbers.children[i].id == "carousel-page-number-" + pageActive) {
      pageNumbers.children[i].classList.add("active-page");
    }
  }

  //scroll carousel to new position
  const slideWidth = slidesContainer.offsetWidth;
  slidesContainer.scrollLeft = slideWidth * pageNum;
}

function updateCarousel() {
  //get number of projects being shown in carousel
  const nProjects = slidesContainer.querySelectorAll(
    ":scope > :not(.hidden)"
  ).length;

  //set number of pages carousel will have
  nPages;
  if (screenSize == "desktop") nPages = Math.ceil(nProjects / 3); //3 projects per page
  if (screenSize == "mobile") nPages = nProjects; //1 project per page

  //setup page numbering html elements
  const pageNumbers = document.getElementById("carousel-page-numbers");
  pageNumbers.innerHTML = "";
  for (let i = 0; i < nPages; i++) {
    pageNumbers.innerHTML += `
    <span id="carousel-page-number-${i}">${i + 1}</span>
    `;
  }

  //reset carousel to beginning
  changeCarouselPage(0);
}
////

//detect light/dark mode preference changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    const colorScheme = e.matches ? "dark" : "light";
    if (colorScheme === "dark") {
      dark();
    } else {
      light();
    }
  });
//detect dark/light mode preference
if (window.matchMedia) {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    dark();
  } else {
    light();
  }
} else {
  light();
}

//ORDERED

//get project data and display them in the carousel
fetch("resources/projects.json")
  .then((response) => response.json())
  .then((json) => displayProjects(json))
  .catch(console.error);
function displayProjects(json) {
  const projects = json.projects;

  projects.forEach((element) => {
    displayProject(element);
  });
  updateCarousel();
}
function displayProject(project) {
  let card = `
  <div class="project-card w-auto h-auto bg-none">
    <img class="object-cover shadow-lg rounded-lg" src="${project.image}">
    <div class="bg-none py-2">
      <p class="text-secondary text-left text-sm drop-shadow-lg">${project.date}</p>
      <p class="text-secondary text-left text-2xl drop-shadow-lgfont-bold">${project.title}</p>
      <p class="text-quaternary drop-shadow-lg text-left text-sm">${project.description}</p>
      <div class="tags">`;
  for (let i = 0; i < project.tags.length; i++) {
    card += `<div class="tag" onclick="tagClick(this)">${project.tags[i]}</div>`;
  }
  card += `</div>
      <div class="flex justify-between m-4">`;
  if (project.site) {
    card += `<a class="text-secondary drop-shadow-lg" href="${project.site}">View Site <i class="fa fa-arrow-up-right-from-square"></i></a>`;
  }
  card += ` 
        <a class="text-secondary drop-shadow-lg" href="${project.code}">View Code <i class="fa fa-code"></i></a>
      </div>
    </div>
  </div>
  `;
  document.getElementById("projects-container").innerHTML += card;
}

updateScreenSize(window.matchMedia("(min-width: 1024px)"));
