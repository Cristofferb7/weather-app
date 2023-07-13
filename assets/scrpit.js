// 3 global variables 
// 1 for the API KEY
var APIKey = "364de14a0f6c3e26bc2f029a08d5ee2f"
var searchBtn = document.getElementById("search-btn")
var searchCity = document.getElementById("search-city")
// const currentDate = new Date('DD, MM, YYYY'); // Example date object


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

        var currentDay = data.list[0];
        var currentDate = new Date();
        var cityName = data.city.name;
        
        var cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "mx-auto");

        
        
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
        
        cardDiv.appendChild(cardBodyDiv);
        
        var currentDayContainer = document.getElementById("current-weather");
        currentDayContainer.appendChild(cardDiv);



        // five day forecast

        var fiveDays = [
            data.list[1],
            data.list[9],
            data.list[17],
            data.list[25],
            data.list[33],
        ]

        console.log(fiveDays)

// for loop to generate 5 days
        for(i = 0; i < fiveDays.length; i++) {
            var containerDiv = document.createElement("div");
            var dateH3 = document.createElement("h3");


            containerDiv.classList.add("card");
            containerDiv.classList.add("col");
            dateH3.textContent = formatDateString(fiveDays[i].dt_txt);

            function formatDateString(dateString) {
              const date = new Date(dateString);
              const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
              return formattedDate;
            }
        //   added costants and class list to add the wind, temp and hum 
            const newUl = document.createElement("ul");
            newUl.classList.add("list-group");
            newUl.classList.add("list-group-flush");

            const tempLi = document.createElement("li");
            tempLi.textContent = "Temp: " + fiveDays[i].main.temp;
                tempLi.classList.add("list-group-item");

            const windSpeedLi = document.createElement("li");
                windSpeedLi.textContent = "Wind Speed: " + fiveDays[i].wind.speed;
                windSpeedLi.classList.add("list-group-item");

            const humidityLi = document.createElement("li");
                humidityLi.textContent = "Humidity: " + fiveDays[i].main.humidity + "%";
                humidityLi.classList.add("list-group-item");


            newUl.appendChild(tempLi);
            newUl.appendChild(windSpeedLi);
            newUl.appendChild(humidityLi);

            containerDiv.appendChild(dateH3);
            containerDiv.appendChild(newUl);

            

            var fiveDayContainer = document.getElementById("five-days");
            fiveDayContainer.appendChild(containerDiv)
        }


    })
}


searchBtn.addEventListener("click", search)
