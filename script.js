// http://api.openweathermap.org/data/2.5/weather?q=New York,us&APPID=f4997201f16a52b2421a2358a4ad46dc
// https://api.openweathermap.org/data/3.0/onecall?lat=40.6645&lon=-73.7559&appid=f4997201f16a52b2421a2358a4ad46dc
// http://api.openweathermap.org/data/2.5/weather?q=New%20York,us&units=imperial&APPID=f4997201f16a52b2421a2358a4ad46dc

// "apiKey" : "f4997201f16a52b2421a2358a4ad46dc",

// Retrieving HTML elements - Search Button
const countrySelection = document.querySelector('[data-countrySelection]')
const searchButton = document.querySelector("[data-searchIcon]")
const searchBox = document.querySelector('[data-searchField]')

// Retrieving HTML elements using querySelectors
const currentTempEl = document.querySelector(".current-weather-temp")
const currentWeatherTypeEl = document.querySelector('.current-weather-type')
const currentWeatherIconEl = document.querySelector(".current-weather-icon")
const currentTempHighEl = document.querySelector(".current-weather-high")
const currentTempLowEl = document.querySelector(".current-weather-low")
const currentCountryEl = document.querySelector(".current-weather-country")
const currentCityEl = document.querySelector('.current-weather-city')
const currentHumidityEl = document.querySelector(".current-humidity")
const currentPressureEl = document.querySelector(".current-weather-pressure")
const currentFeels_LikeEl = document.querySelector(".current-weather-feels")
const currentWindSpeedEl = document.querySelector(".current-weather-wind-speed")
const currentWindDirectionEl = document.querySelector(".current-weather-wind-direction")

// SearchButton eventListener
searchButton.addEventListener('click', () =>{
    searchBox.classList.toggle('active')
    countrySelection.classList.toggle('active')
})

searchBox.addEventListener('keyup', (e) =>{
    if(e.key == "Enter" && searchBox.value != "" && countrySelection.value != "")
    fetchWeatherData(searchBox.value, countrySelection.value)

})

function fetchWeatherData(city, country){  

    // Storing API url into 'api' var 
    var api = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&APPID=f4997201f16a52b2421a2358a4ad46dc`

    // Getting data from API, taking the response and converting it to JSON
    fetch(`${api}`).then((response) => response.json())

    // Take that response and deconstructure the object into separate variables
    .then((response) =>{
        showWeatherData(response);
    })
}

function showWeatherData(response){

    getWeatherType(response)
        
        const {
            name: currentCity
        } = response;

        function getWeatherType(object){
            
            var {
                main: currentWeatherType
            } = response.weather[0];
            
            currentWeatherType = currentWeatherType === 'Clouds' ?  
            (currentWeatherIconEl.src = "/portfolio/myWeatherApp/svgs/cloudy.svg", currentWeatherType = 'Cloulds'): 
            currentWeatherType === 'Clear' ? 
            (currentWeatherIconEl.src = "/portfolio/myWeatherApp/svgs/clear.svg", currentWeatherType = 'Clear' ): null

            return currentWeatherType
        }

        const {
            country: currentCountry
        } = response.sys

        const {
            temp: currentTemp, 
            temp_min: currentMin, 
            temp_max: currentMax, 
            humidity: currentHumidity,
            pressure: currentPressure,
            feels_like: currentFeels_Like
        } = response.main;

        const {
            speed: currentWindSpeed,
            deg: currentWindDirection
        } = response.wind

    // Assigning all weather properties to HTML elements
    currentTempEl.textContent = currentTemp;
    currentTempHighEl.textContent = currentMax;
    currentTempLowEl.textContent = currentMin;
    currentCountryEl.textContent = currentCountry;
    currentCityEl.textContent = currentCity;
    currentWeatherTypeEl.textContent = getWeatherType();
    currentHumidityEl.textContent = currentHumidity;
    currentPressureEl.textContent = currentPressure;
    currentFeels_LikeEl.textContent = currentFeels_Like;
    currentWindSpeedEl.textContent = currentWindSpeed;
    currentWindDirectionEl.textContent = currentWindDirection;
}


