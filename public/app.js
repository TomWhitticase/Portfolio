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
    console.log(xhr.responseText);
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

function createProjectCard(title, date, img, description, tags, open, code) {
  let card = `
  <div class="card">
    <img src="${img}">
    <div class="bg-none">
      <p class="text-secondary text-left text-sm drop-shadow-lg">${date}</p>
      <p class="text-secondary text-left text-2xl drop-shadow-lgfont-bold">${title}</p>
      <p class="text-quaternary drop-shadow-lg text-left text-sm">${description}</p>
      <div class="tags">`;
  let tagsSplit = tags.split(",");
  for (let i = 0; i < tagsSplit.length; i++) {
    card += `<div class="tag">${tagsSplit[i]}</div>`;
  }
  card += `</div>
      <div class="flex justify-between m-4">`;
  if (open != "") {
    card += `<a class="text-secondary drop-shadow-lg" href="${open}">View Site <i class="fa fa-arrow-up-right-from-square"></i></a>`;
  }
  card += ` 
        <a class="text-secondary drop-shadow-lg" href="${code}">View Code <i class="fa fa-code"></i></a>
      </div>
    </div>
  </div>
  `;

  document.getElementById("projects-container").innerHTML += card;
}

//create project cards
createProjectCard(
  "To-do List",
  "September 2022",
  "images/WordGuess.png",
  "A simple to-do list web app made using react, typescript, and tailwind.",
  "React,TypeScript,Tailwind",
  "https://tomwhitticase.github.io/WordGuess/",
  "https://github.com/TomWhitticase/WordGuess"
);
createProjectCard(
  "Word Guess",
  "August 2022",
  "images/WordGuess.png",
  "A wordle clone with some extra features. Created using vanilla html,css, and javascript. Uses AJAX and a random word API.",
  "HTML,CSS,JavaScript,AJAX,API",
  "https://tomwhitticase.github.io/WordGuess/",
  "https://github.com/TomWhitticase/WordGuess"
);
createProjectCard(
  "Word Finder",
  "August 2022",
  "images/WordFinder.png",
  "A wordle solver. Created using vanilla html,css, and javascript. Uses AJAX and a random word API.",
  "HTML,CSS,JavaScript,AJAX,API",
  "https://tomwhitticase.github.io/WordFinder/",
  "https://github.com/TomWhitticase/WordFinder"
);
createProjectCard(
  "Wedding Venues",
  "April 2022",
  "images/WeddingVenues.png",
  "A website for searching for wedding venues. Coursework for my 1st year web programming module for which I achieved a first. Languages used: html, css, js, sql, php. Styled using bootstrap.",
  "HTML,CSS,JavaScript,AJAX,JSON,SQL,PHP",
  "https://wedding-venues.vercel.app/",
  "https://github.com/TomWhitticase/WeddingVenues"
);
createProjectCard(
  "Computer Accessories Shop",
  "May 2022",
  "images/oopcw.png",
  "A Java application for buying and selling devices",
  "Java,UML",
  "",
  "https://github.com/TomWhitticase/ComputerAccessoriesShop"
);
createProjectCard(
  "Library Book System",
  "December 2021",
  "images/librarySystem.png",
  "A python application for managing library book loans",
  "Python,Tkinter",
  "",
  "https://github.com/TomWhitticase/LibrarySystem"
);
createProjectCard(
  "Arduino Data Monitor",
  "May 2021",
  "images/arduino.png",
  "Aprogram for storing data on data channels on an arduino uno",
  "C,Arduino",
  "",
  "https://github.com/TomWhitticase/DataMonitor"
);

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
  if (pageNum < 0) pageNum = 0;
  if (pageNum > nPages - 1) pageNum = nPages - 1;
  pageActive = pageNum;
  console.log(pageActive);

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

window.addEventListener(
  "resize",
  function (event) {
    updateCarousel();
  },
  true
);
updateCarousel();
function updateCarousel() {
  const pageNumbers = document.getElementById("carousel-page-numbers");
  const itemWidth = slidesContainer.children[0].scrollWidth;
  nPages = Math.ceil(
    slidesContainer.children.length /
      Math.floor(slidesContainer.offsetWidth / itemWidth)
  );
  pageNumbers.innerHTML = "";
  for (let i = 0; i < nPages; i++) {
    pageNumbers.innerHTML += `
    <span id="carousel-page-number-${i}">${i + 1}</span>
    `;
  }

  changeCarouselPage(0);
}
////

//detect light/dark mode preference changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", function (e) {
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
