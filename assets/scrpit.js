

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
      mainCardDiv.classList.add("card", "mb-2", );

      var cardBodyDiv = document.createElement("div");
      cardBodyDiv.classList.add("card-body");

      var cardTitleH1 = document.createElement("h1");
      cardTitleH1.classList.add("card-title");
      cardTitleH1.textContent = "Current Date: " + currentDate.toDateString();

      var cityNameH2 = document.createElement("h2");
      cityNameH2.textContent = "City: " + cityName;

      var tempP = document.createElement("p");
      tempP.classList.add("card-text");
      tempP.textContent = "Temp: " + currentDay.main.temp;

      var windSpeedP = document.createElement("p");
      windSpeedP.classList.add("card-text");
      windSpeedP.textContent = "Wind Speed: " + currentDay.wind.speed;

      var humidityP = document.createElement("p");
      humidityP.classList.add("card-text");
      humidityP.textContent = "Humidity: " + currentDay.main.humidity + "%";

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

        function formatDateString(dateString) {
          var date = new Date(dateString);
          var formattedDate =
            date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
          return formattedDate;
        }

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

        newUl.appendChild(tempLi);
        newUl.appendChild(windSpeedLi);
        newUl.appendChild(humidityLi);

        containerDiv.appendChild(dateH3);
        containerDiv.appendChild(newUl);

        fiveDayContainer.appendChild(containerDiv);
      }

      saveCityToLocalStorage(content); // Save the clicked city to local storage
      displaySearchHistory(); // Display the search history
    });
}

function saveCityToLocalStorage(city) {
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  searchHistory.unshift(city); // Add the new city at the beginning of the search history array
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

function displaySearchHistory() {
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    var searchHistoryContainer = document.getElementById("search-history");
    searchHistoryContainer.innerHTML = "";
  
    for (var i = 0; i < searchHistory.length; i++) {
      var cityDiv = document.createElement("div");
      cityDiv.classList.add("searched-city");
      cityDiv.textContent = searchHistory[i];
  
      searchHistoryContainer.appendChild(cityDiv);
    }
}
function addCityToSearchHistory(city) {
    saveCityToLocalStorage(city); 
    displaySearchHistory(); 
  }

searchBtn.addEventListener("click", search);

// searchHistory
