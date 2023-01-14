// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "3ce608f7b3mshd50e338713a339cp1380f6jsna77a3e9b1f0f",
//     "X-RapidAPI-Host": "burgers-hub.p.rapidapi.com",
//   },
// };

// fetch("https://burgers-hub.p.rapidapi.com/burgers", options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
// main row element to show the food list
let mainRow = document.getElementById("FoodList");
// error message element to show the message likr no search, no favourite etc
let errorMessageElement = document.getElementById("notificationMessage");
// select dropdown for sort using event delegation
let selectSorting = document.getElementById("dropdown-sort");
// select dropdown for filter using event delegation
let selectFilter = document.getElementById("dropdown-filter");

// to copy the foods once my page is loaded
let allFoodDataCopy = [];

// getting data using fetch form API folder
let getData = () => fetch("./api/burgers.json").then((data) => data.json());

// returns single food card
let getFoodCard = (singleFoodData) => {
  // check on loading the view whether the food already in local storage then change class to show favourite icon red already
  let a = JSON.parse(localStorage.getItem("fav"));
  if (a !== null) {
    var favIconClass = !a.find((food) => food.id == singleFoodData.id)
      ? "fa-heart"
      : "fa-heart-red";
  } else {
    var favIconClass = "fa-heart";
  }

  //   return `<div class="col-md-3">
  //       <div class="card">
  //         <img class="card-img-top" src="${singleFoodData.img}" alt="Card image">
  //         <div class="card-body">
  //           <h6 class="card-title">${singleFoodData.name}</h6>
  //           <p class="card-text tags" >${singleFoodData.tags}</p>
  //           <a onclick="markFavourite(this, ${singleFoodData.id})" id="${favIconClass}"><i class="fa fa-heart" ></i><a>
  //           <div>
  //             <div class="rating">
  //                 <span class="fa fa-star checked" > ${singleFoodData.rating} </span>
  //             </div>
  //              <span class="eta"> ${singleFoodData.eta} MINS </span>
  //               <a href="#" class="view-menu" >View Menu</a>
  //               </div>
  //         </div>
  //       </div>
  // </div>`;
  return `<div class="food_card">
  <img src="${singleFoodData.images[0].sm}" />
  <div class="content-box">
    <h4 class="name">${singleFoodData.name}</h4>
    <p class="text_compress">${singleFoodData.desc}</p>
    
    <div class="btn">
      <h2 class="price">$ ${singleFoodData.price}</h2>
      <a class="orderNow" href="#">Order Now</a>
    </div>
              <a onclick="markFavourite(this, ${singleFoodData.id})" class="fav-icon" id="${favIconClass}"><i class="fa fa-heart" ></i><a>
  </div>
</div>`;
};

// generate view
let generateView = (data) => data.map((food) => getFoodCard(food));

// display all the foods
let displayAllFood = () => {
  getData()
    .then((data) => {
      allFoodDataCopy = JSON.parse(JSON.stringify(data));
      console.log(allFoodDataCopy);
      mainRow.innerHTML = generateView(data).join("");
    })
    .catch(
      (error) =>
        (errorMessageElement.innerText =
          "Something bad Happend!! We are Working on it")
    );
};

displayAllFood();

// display searched foods as per entered text and showing result by tags
function searchResult() {
  console.log("called!!");
  let d = document.getElementById("myInput");
  let searchMatchingFoods = allFoodDataCopy.filter(
    (food) =>
      food.name.toString().toUpperCase().indexOf(d.value.toUpperCase()) > -1
  );
  mainRow.innerHTML = generateView(searchMatchingFoods).join("");
  errorMessageElement.innerText =
    searchMatchingFoods == 0 ? `No Food Item Found for ${d.value}` : "";
}

// debounce function which takes search function and delay
let debounce = (fn, delay) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(), delay);
  };
};
let search = debounce(searchResult, 400);

// sorting all the foods
selectSorting.addEventListener("change", (e) => {
  console.log("values", e.target.value);
  if (e.target.value === "Sort by Price(Highest to Lowest)") {
    let sortByEta = allFoodDataCopy.sort(
      (food1, food2) => food2.price - food1.price
    );
    console.log(sortByEta);
    mainRow.innerHTML = generateView(sortByEta).join("");
  } else if (e.target.value === "Sort by Price(Lowest to Highest)") {
    let sortByRating = allFoodDataCopy.sort(
      (food1, food2) => food1.price - food2.price
    );
    mainRow.innerHTML = generateView(sortByRating).join("");
  }
});

//mark favourite - add red color if item is pushed into the localstorage or mark white if item is removed form the local storage
function markFavourite(abc, id) {
  if (!localStorage.getItem("fav")) {
    var a = [];
    localStorage.setItem("fav", JSON.stringify(a));
  }
  var a = [];
  a = JSON.parse(localStorage.getItem("fav"));
  let markedHotel = allFoodDataCopy.filter((food) => food.id == id);
  if (!a.find((food) => food.id == id)) {
    a.push(...markedHotel);
    abc.setAttribute("style", "color: red !important;");
  } else {
    let indexOfExistingHotel = a.indexOf(a.find((food) => food.id == id));
    a.splice(indexOfExistingHotel, 1);
    abc.setAttribute("style", "color: white !important;");
  }
  localStorage.setItem("fav", JSON.stringify(a));
}

// see all favourite resetro
function seeAllFavouriteFood() {
  let allFavourite = JSON.parse(localStorage.getItem("fav"));
  mainRow.innerHTML = generateView(allFavourite).join("");
  errorMessageElement.innerText =
    allFavourite.length == 0 ? "No Favourite Selected Yet!!" : "";
}
