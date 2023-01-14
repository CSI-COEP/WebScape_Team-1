const searchForm = document.querySelector(".search-form");
const searchBtn = document.querySelector("#search-btn");
const cartItem = document.querySelector(".cart-items-container");
const cartBtn = document.querySelector("#cart-btn");
const navbar = document.querySelector(".navbar");
const menuBtn = document.querySelector("#menu-btn");

searchBtn.addEventListener("click", () => {
  searchForm.classList.toggle("active");
  document.addEventListener("click", (e) => {
    if (
      !e.composedPath().includes(searchBtn) &&
      !e.composedPath().includes(searchForm)
    ) {
      searchForm.classList.remove("active");
    }
  });
});

cartBtn.addEventListener("click", () => {
  cartItem.classList.toggle("active");
  document.addEventListener("click", (e) => {
    if (
      !e.composedPath().includes(cartBtn) &&
      !e.composedPath().includes(cartItem)
    ) {
      cartItem.classList.remove("active");
    }
  });
});

menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("active");
  document.addEventListener("click", (e) => {
    if (
      !e.composedPath().includes(navbar) &&
      !e.composedPath().includes(menuBtn)
    ) {
      navbar.classList.remove("active");
    }
  });
});

const toggleSwitch = document.querySelector(".theme-switch-wrapper input");
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}
toggleSwitch.addEventListener("change", switchTheme);
