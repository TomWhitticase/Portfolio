var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };

//screen size (desktop or mobile)
var screenSize = "desktop";
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
window.onscroll = function () {
  var elements = document.getElementsByClassName("top-only");
  if (window.scrollY != 0) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.add("hidden");
    }
  } else {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove("hidden");
    }
  }
};
function tagClick(tag) {
  //get if tag was highlighted or not
  var highlighted = tag.classList.contains("highlight-tag");
  //get all tags matching tag clicked
  var allTags = __spreadArray([], document.getElementsByClassName("tag"), true);
  var tags = [];
  for (var i = 0; i < allTags.length; i++) {
    if (tag.innerHTML == allTags[i].innerHTML) {
      tags.push(allTags[i]);
    }
  }
  //toggle tags highlight
  for (var i = 0; i < tags.length; i++) {
    if (highlighted) tags[i].classList.remove("highlight-tag");
    else {
      tags[i].classList.add("highlight-tag");
    }
  }
  //only show cards containing highlighted tags
  var cards = document.getElementsByClassName("project-card");
  for (var i = 0; i < cards.length; i++) {
    var projectTags = cards[i].querySelectorAll(":scope > div > .tags > .tag");
    var containsHighlightedTag = false;
    for (var j = 0; j < projectTags.length; j++) {
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
  var nTags = document.querySelectorAll(".highlight-tag").length;
  if (nTags == 0) {
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.remove("hidden");
    }
  }
  updateCarousel();
}
function menuClick() {
  var nav = document.getElementById("topnav-mobile");
  var icon = document.getElementById("menu-icon");
  if (
    nav === null || nav === void 0 ? void 0 : nav.classList.contains("hidden")
  ) {
    nav.classList.remove("hidden");
    icon === null || icon === void 0 ? void 0 : icon.classList.add("fa-close");
    icon === null || icon === void 0
      ? void 0
      : icon.classList.remove("fa-bars");
  } else {
    nav === null || nav === void 0 ? void 0 : nav.classList.add("hidden");
    icon === null || icon === void 0
      ? void 0
      : icon.classList.remove("fa-close");
    icon === null || icon === void 0 ? void 0 : icon.classList.add("fa-bars");
  }
}
//contact form send email
var contactForm = document.getElementById("contact-form");
contactForm === null || contactForm === void 0
  ? void 0
  : contactForm.addEventListener("submit", function (e) {
      var _a, _b;
      //show loading animation
      (_a =
        document === null || document === void 0
          ? void 0
          : document.getElementById("send-email")) === null || _a === void 0
        ? void 0
        : _a.classList.add("hidden");
      (_b =
        document === null || document === void 0
          ? void 0
          : document.getElementById("sending-email")) === null || _b === void 0
        ? void 0
        : _b.classList.remove("hidden");
      e.preventDefault(); //prevent form submit
      //get form data for email
      var formData = {
        name: document.getElementById("name").value,
        emailAddress: document.getElementById("emailAddress").value,
        message: document.getElementById("message").value,
      };
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.onload = function () {
        var _a, _b;
        console.log(xhr.responseText);
        if (xhr.responseText == "success") {
          alert("Email sent");
        } else {
          alert("something went wrong");
        }
        //hide loading animation
        (_a = document.getElementById("send-email")) === null || _a === void 0
          ? void 0
          : _a.classList.remove("hidden");
        (_b = document.getElementById("sending-email")) === null ||
        _b === void 0
          ? void 0
          : _b.classList.add("hidden");
      };
      xhr.send(JSON.stringify(formData));
    });
function dark() {
  document.getElementsByTagName("html")[0].className = "dark";
  var icon = document.getElementById("toggleDark-icon");
  if (icon) icon.className = "fa fa-moon text-primary";
}
function light() {
  document.getElementsByTagName("html")[0].className = "";
  var icon = document.getElementById("toggleDark-icon");
  if (icon) icon.className = "fa-regular fa-sun";
}
function toggleDark() {
  if (document.getElementsByTagName("html")[0].className == "dark") {
    light();
  } else {
    dark();
  }
}
//carousel stuff//
var slidesContainer = document.getElementById("projects-container");
var prevButton = document.getElementById("slide-prev");
var nextButton = document.getElementById("slide-next");
var pageActive = 1;
var nPages = 0;
nextButton === null || nextButton === void 0
  ? void 0
  : nextButton.addEventListener("click", function () {
      changeCarouselPage(pageActive + 1);
    });
prevButton === null || prevButton === void 0
  ? void 0
  : prevButton.addEventListener("click", function () {
      changeCarouselPage(pageActive - 1);
    });
function changeCarouselPage(pageNum) {
  if (pageNum < 0) pageNum = nPages - 1;
  if (pageNum > nPages - 1) pageNum = 0;
  pageActive = pageNum;
  //change page number indicator
  var pageNumbers = document.getElementById("carousel-page-numbers");
  if (pageNumbers) {
    for (var i = 0; i < pageNumbers.children.length; i++) {
      pageNumbers.children[i].classList.remove("active-page");
      if (pageNumbers.children[i].id == "carousel-page-number-" + pageActive) {
        pageNumbers.children[i].classList.add("active-page");
      }
    }
  }
  //scroll carousel to new position
  var slideWidth =
    slidesContainer === null || slidesContainer === void 0
      ? void 0
      : slidesContainer.offsetWidth;
  if (slidesContainer && slideWidth)
    slidesContainer.scrollLeft = slideWidth * pageNum;
}
function updateCarousel() {
  //get number of projects being shown in carousel
  var nProjects = 0;
  if (slidesContainer)
    nProjects = slidesContainer.querySelectorAll(
      ":scope > :not(.hidden)"
    ).length;
  //set number of pages carousel will have
  nPages;
  if (screenSize == "desktop") nPages = Math.ceil(nProjects / 3); //3 projects per page
  if (screenSize == "mobile") nPages = nProjects; //1 project per page
  //setup page numbering html elements
  var pageNumbers = document.getElementById("carousel-page-numbers");
  if (pageNumbers) {
    pageNumbers.innerHTML = "";
    for (var i = 0; i < nPages; i++) {
      pageNumbers.innerHTML += '\n    <span id="carousel-page-number-'
        .concat(i, '" class="dark:text-primary">')
        .concat(i + 1, "</span>\n    ");
    }
  }
  //reset carousel to beginning
  changeCarouselPage(0);
}
////
//detect light/dark mode preference changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", function (e) {
    var colorScheme = e.matches ? "dark" : "light";
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
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    return displayProjects(json);
  })
  ["catch"](console.error);
function displayProjects(json) {
  var projects = json.projects;
  projects.forEach(function (element) {
    displayProject(element);
  });
  updateCarousel();
}
function displayProject(project) {
  var card =
    '\n  <div class="project-card w-auto h-auto bg-none">\n    <img class="object-cover shadow-lg rounded-lg" src="'
      .concat(
        project.image,
        '">\n    <div class="bg-none py-2">\n      <h3 class="text-secondary text-left text-sm drop-shadow-lg">'
      )
      .concat(
        project.date,
        '</h3>\n      <h2 class="text-secondary text-left text-2xl drop-shadow-lgfont-bold">'
      )
      .concat(
        project.title,
        '</h2>\n      <p class="text-quaternary drop-shadow-lg text-left text-sm">'
      )
      .concat(project.description, '</p>\n      <div class="tags">');
  for (var i = 0; i < project.tags.length; i++) {
    card += '<div class="tag" onclick="tagClick(this)">'.concat(
      project.tags[i],
      "</div>"
    );
  }
  card += '</div>\n      <div class="flex justify-between m-4">';
  if (project.site) {
    card += '<a class="text-secondary drop-shadow-lg" href="'.concat(
      project.site,
      '">View Site <i class="fa fa-arrow-up-right-from-square"></i></a>'
    );
  }
  card += ' \n        <a class="text-secondary drop-shadow-lg" href="'.concat(
    project.code,
    '">View Code <i class="fa fa-code"></i></a>\n      </div>\n    </div>\n  </div>\n  '
  );
  var projectsContainer = document.getElementById("projects-container");
  if (projectsContainer) projectsContainer.innerHTML += card;
}
