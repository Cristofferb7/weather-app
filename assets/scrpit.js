// main variables


var APIKey = "364de14a0f6c3e26bc2f029a08d5ee2f";
var searchBtn = document.getElementById("search-btn");
var searchCity = document.getElementById("search-city");
var currentDayContainer = document.getElementById("current-weather");
var fiveDayContainer = document.getElementById("five-days");
var searchHistoryContainer = document.getElementById("search-history");

function search() {
  var content = searchCity.value;
  console.log(content);

  var url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    content +
    "&appid=" +
    APIKey +
    "&units=imperial";

  console.log(url);

  currentDayContainer.innerHTML = "";
  fiveDayContainer.innerHTML = "";

// function to fetch the data and transport the info into the cards
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var currentDay = data.list[0];
var currentDate = new Date();
var cityName = data.city.name;

var mainCardDiv = document.createElement("div");
mainCardDiv.classList.add("card", "mx-auto");

var cardBodyDiv = document.createElement("div");
cardBodyDiv.classList.add("card-body", 'bg-success');

var cardTitleH1 = document.createElement("h1");
cardTitleH1.classList.add("card-title");
// added icon to the file had to comment everything out to add and worked
var icon = document.createElement("i");
icon.classList.add("fas", "fa-calendar-alt");

var currentDateText = document.createElement("span");
currentDateText.textContent = "Current Date: " + currentDate.toDateString();

cardTitleH1.appendChild(icon);
cardTitleH1.appendChild(currentDateText);

var cityNameH2 = document.createElement("h2");
cityNameH2.textContent = "City: " + cityName;

var tempP = document.createElement("p");
tempP.classList.add("card-text");
tempP.innerHTML = '<i class="fas fa-thermometer-half"></i> ' + "Temp: " + currentDay.main.temp;

var windSpeedP = document.createElement("p");
windSpeedP.classList.add("card-text");
windSpeedP.innerHTML = '<i class="fas fa-wind"></i> ' + "Wind Speed: " + currentDay.wind.speed;

var humidityP = document.createElement("p");
humidityP.classList.add("card-text");
humidityP.innerHTML = '<i class="fas fa-tint"></i> ' + "Humidity: " + currentDay.main.humidity + "%";

cardBodyDiv.appendChild(cardTitleH1);
cardBodyDiv.appendChild(cityNameH2);
cardBodyDiv.appendChild(tempP);
cardBodyDiv.appendChild(windSpeedP);
cardBodyDiv.appendChild(humidityP);

mainCardDiv.appendChild(cardBodyDiv);

currentDayContainer.appendChild(mainCardDiv);
    

      var fiveDays = [
        data.list[1],
        data.list[9],
        data.list[17],
        data.list[25],
        data.list[33],
      ];

      console.log(fiveDays);

      for (var i = 0; i < fiveDays.length; i++) {
        var containerDiv = document.createElement("div");
        containerDiv.classList.add("card", "col");
        var dateH3 = document.createElement("h3");
        dateH3.textContent = formatDateString(fiveDays[i].dt_txt);

        var weatherIcon = document.createElement("i");
        weatherIcon.classList.add("fas", getWeatherIconClass(fiveDays[i].weather[0].icon));

        var newUl = document.createElement("ul");
        newUl.classList.add("list-group");
        newUl.classList.add("list-group-flush");

        var tempLi = document.createElement("li");
        tempLi.textContent = "Temp: " + fiveDays[i].main.temp;
        tempLi.classList.add("list-group-item");

        var windSpeedLi = document.createElement("li");
        windSpeedLi.textContent = "Wind Speed: " + fiveDays[i].wind.speed;
        windSpeedLi.classList.add("list-group-item");

        var humidityLi = document.createElement("li");
        humidityLi.textContent = "Humidity: " + fiveDays[i].main.humidity + "%";
        humidityLi.classList.add("list-group-item");

        containerDiv.appendChild(dateH3);
        containerDiv.appendChild(weatherIcon);
        containerDiv.appendChild(newUl);
        newUl.appendChild(tempLi);
        newUl.appendChild(windSpeedLi);
        newUl.appendChild(humidityLi);

        fiveDayContainer.appendChild(containerDiv);
      }

      saveCityToLocalStorage(content); // Save the clicked city to local storage
      displaySearchHistory(); // Display the search history
    });
}

// icon images
function getWeatherIconClass(iconCode) {
  var iconMap = {
    "01d": "fa-sun",
    "02d": "fa-cloud-sun",
    "03d": "fa-cloud",
    "04d": "fa-cloud",
    "09d": "fa-cloud-showers-heavy",
    "10d": "fa-cloud-rain",
    "11d": "fa-bolt",
    "13d": "fa-snowflake",
    "50d": "fa-smog",
    "01n": "fa-moon",
    "02n": "fa-cloud-moon",
    "03n": "fa-cloud",
    "04n": "fa-cloud",
    "09n": "fa-cloud-showers-heavy",
    "10n": "fa-cloud-rain",
    "11n": "fa-bolt",
    "13n": "fa-snowflake",
    "50n": "fa-smog",
  };

  return iconMap[iconCode];
}

function formatDateString(dateString) {
  var date = new Date(dateString);
  var formattedDate =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  return formattedDate;
}

function saveCityToLocalStorage(city) {
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  searchHistory.unshift(city);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}


// search history and to hover over
function displaySearchHistory() {
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  searchHistoryContainer.innerHTML = "";

  for (var i = 0; i < searchHistory.length; i++) {
    var cityDiv = document.createElement("div");
    cityDiv.classList.add("searched-city");
    cityDiv.textContent = searchHistory[i];

    cityDiv.addEventListener("click", function (event) {
      var cityName = event.target.textContent;
      searchCity.value = cityName;
      search();
    });
     // Add hover effect
     cityDiv.addEventListener("mouseenter", function (event) {
        event.target.classList.add("hovered-city");
      });
  
      cityDiv.addEventListener("mouseleave", function (event) {
        event.target.classList.remove("hovered-city");
      });
  

    searchHistoryContainer.appendChild(cityDiv);
  }
}

searchBtn.addEventListener("click", search);

// searchHistory
