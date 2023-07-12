// 3 global variables 
// 1 for the API KEY
var APIKey = "364de14a0f6c3e26bc2f029a08d5ee2f"
// var  url : http:"openweathermap.org"

// search history array 

// function to display the search history 
// loop over history array and count down so the most recent search is at the top

// function to update search history on local storage


// function to get search history from local storage

// function to display current weather data from fetch request

// function to display the 5 day forecast data from fetch request 
// need icon, temp, humidity, date , wind speed

// create element for each of the above^^

// function to display 5 day forecast data from fetch request for each card

// function to specifically target geolocation with lat and lon and use function above
// to make calls here maybe a call back function 

// function to event listener for search button 
var searchBtn = document.getElementById("search-btn")
var searchCity = document.getElementById("search-city")

function search() {
    var content = searchCity.value
    console.log(content)

    var url = "https://api.openweathermap.org/data/2.5/forecast?q="+ content +"&appid=" + APIKey + "&units=imperial"


    console.log(url)

    fetch(url)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);

        // current weather

        var currentDay =  data.list[0];

        console.log(currentDay)

        var currentDateH2 = document.createElement("h2");
        var currentTempP = document.createElement("p");

        currentDateH2.textContent = data.city.name
        currentTempP.textContent = "Temp: " + currentDay.main.temp

        var currentDayContainer = document.getElementById("current-weather");
        currentDayContainer.append(currentDateH2, currentTempP)



        // five day forecast

        var fiveDays = [
            data.list[1],
            data.list[9],
            data.list[17],
            data.list[25],
            data.list[33],
        ]

        console.log(fiveDays)

        // var temp1 = document.getElementById("temp1");
        // temp1.textContent = fiveDays[0].main.temp

        //  var temp2 = document.getElementById("temp2");
        // temp2.textContent = fiveDays[1].main.temp

            // <div class="card" style="width: 18rem;">
            //  <div class="card-header">
            //      Featured
            //  </div>
            //  <ul class="list-group list-group-flush">
            //     <li class="c">Temp/li>
            //     <li class="list-group-item">A second item</li>
            //     <li class="list-group-item">A third item</li>
            //   </ul>
            // </div>

        for(i = 0; i < fiveDays.length; i++) {
            var containerDiv = document.createElement("div");
            var dateH3 = document.createElement("h3");

            var newUl = document.createElement("ul");
            var tempLi = document.createElement("li");

            containerDiv.classList.add("card");
            containerDiv.classList.add("col");
            dateH3.textContent = fiveDays[i].dt_txt

            newUl.classList.add("list-group")
            newUl.classList.add("list-group-flush")
            tempLi.textContent = "Temp: " + fiveDays[i].main.temp
            tempLi.classList.add("list-group-item")

            newUl.appendChild(tempLi)
            
            containerDiv.appendChild(dateH3)
            containerDiv.appendChild(newUl)
            

            var fiveDayContainer = document.getElementById("five-days");
            fiveDayContainer.appendChild(containerDiv)
        }


    })
}


searchBtn.addEventListener("click", search)
