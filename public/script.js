let __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (let i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
//screen size (desktop or mobile)
let screenSize = "desktop";
function updateScreenSize(x) {
  if (x.matches) {
    // If media query matches
    screenSize = "desktop";
  } else {
    screenSize = "mobile";
  }
}
window
  .matchMedia("(min-width: 1024px)")
  .addEventListener("change", updateScreenSize);
window.onscroll = function () {
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
  let highlighted = tag.classList.contains("highlight-tag");
  //get all tags matching tag clicked
  let allTags = __spreadArray([], document.getElementsByClassName("tag"), true);
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
  let cards = document.getElementsByClassName("project-card");
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
}
function menuClick() {
  let nav = document.getElementById("topnav-mobile");
  let icon = document.getElementById("menu-icon");
  if (
    nav === null || nav === void 0 ? void 0 : nav.classList.contains("hidden")
  ) {
    nav.classList.remove("hidden");
    icon === null || icon === void 0 ? void 0 : icon.classList.add("fa-close");
    icon === null || icon === void 0
      ? void 0
      : icon.classList.remove("fa-bars");
  } else {
    nav === null || nav === void 0 ? void 0 : exit(nav, "slide-out-right");
    icon === null || icon === void 0
      ? void 0
      : icon.classList.remove("fa-close");
    icon === null || icon === void 0 ? void 0 : icon.classList.add("fa-bars");
  }
}
//contact form send email
let contactForm = document.getElementById("contact-form");
contactForm === null || contactForm === void 0
  ? void 0
  : contactForm.addEventListener("submit", function (e) {
      let _a, _b;
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
      let formData = {
        name: document.getElementById("name").value,
        emailAddress: document.getElementById("emailAddress").value,
        message: document.getElementById("message").value,
      };
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "https://portfolio-backend-self.vercel.app/");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.onload = function () {
        let _a, _b;
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
  let icon = document.getElementById("toggleDark-icon");
  if (icon) icon.className = "fa fa-moon text-primary";
}
function light() {
  document.getElementsByTagName("html")[0].className = "";
  let icon = document.getElementById("toggleDark-icon");
  if (icon) icon.className = "fa-regular fa-sun";
}
function toggleDark() {
  if (document.getElementsByTagName("html")[0].className == "dark") {
    light();
  } else {
    dark();
  }
}
//detect light/dark mode preference changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", function (e) {
    let colorScheme = e.matches ? "dark" : "light";
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
  let projects = json.projects;
  //sort by date
  projects.sort((a, b) => (a.date < b.date ? 1 : -1));
  projects.forEach(function (element) {
    displayProject(element);
  });
}
function displayProject(project) {
  let card = `
        <div class="card shadow-lg rounded-lg relative overflow-hidden w-64 lg:w-96 aspect-square">
            <img src ="${project.image}" class="object-cover w-full h-[80%]" alt="" />
            <div class="absolute top-0">
                <div class="flex flex-wrap gap-2 p-2 child:text-xs child:z-[2] child:bg-octary child:text-primary child:shadow-lg child:rounded-md child:p-2">
                    `;
  for (let i = 0; i < project.tags.length; i++) {
    card += `<span class="tag">${project.tags[i]}</span>`;
  }

  card += `
                </div>
            </div>
            <div class="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-gray-600/40 via-transparent to-gray-600/40">
            </div>
            <div class="card__overlay">
                <div class="card__header">
                    <div class="card__header-text">
                        <p class="text-left">${project.date}</p>
                        <h3 class= "text-left">${project.title}</h3>
                    </div >
                </div >
            <p class="text-left p-4 text-xs font-body">
                    ${project.description}
        <div class="flex justify-between p-4">`;
  if (project.site) {
    card += `<button class="btn3">
            <a href ="${project.site}">View <i class="fa fa-arrow-up-right-from-square"></i></a>
            </button>`;
  }
  if (project.code) {
    card += `<button class="btn3">
        <a href="${project.code}">Code <i class="fa fa-code"></i></a>
        </button>`;
  }

  card += `</></></div></>`;
  let projectsContainer = document.getElementById("projects-container");
  if (projectsContainer) projectsContainer.innerHTML += card;
}

function exit(element, animationClass) {
  element.classList.add(animationClass);
  setTimeout(function () {
    element.classList.remove(animationClass);
    element.classList.add("hidden");
  }, 500);
}

fetch("https://portfolio-backend-self.vercel.app/index.js", {
  mode: "cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  method: "POST",
  body: JSON.stringify({ a: 1, b: 2 }),
}).then((res) => console.log(res.body));
