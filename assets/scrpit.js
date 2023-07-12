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

    var url = "https://api.openweathermap.org/data/2.5/forecast?q="+ content +"&appid=" + APIKey


    console.log(url)

    fetch(url)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data);

        var fiveDays = [
            data.list[0],
            data.list[8],
            data.list[16],
            data.list[24],
            data.list[32],
        ]

        console.log(fiveDays)

        for(i = 0; i < fiveDays.length; i++) {
            
        }


    })
}


searchBtn.addEventListener("click", search)
