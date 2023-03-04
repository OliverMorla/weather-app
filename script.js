// API key from OpenWeatherMap API
const apiKey = "f4997201f16a52b2421a2358a4ad46dc";

// Retrieving HTML elements - Search Button
const countrySelection = document.querySelector('[data-countrySelection]')
const searchButton = document.querySelector("[data-searchIcon]")
const searchBox = document.querySelector('[data-searchField]')
const locationBtn = document.querySelector('[data-getDeviceLocationBtn]')
const menuBtn = document.querySelector('[data-menuBtn]')
const menuItems = document.querySelector('.menu-items')

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

// SearchBox eventListener (keyup -> user presses 'Enter' key)
searchBox.addEventListener('keyup', (e) =>{
    if(e.key == "Enter" && searchBox.value != "" && countrySelection.value != "")
    fetchWeatherData(searchBox.value, countrySelection.value)
})

// Menu button eventListener
menuBtn.addEventListener('click', ()=>{
    menuItems.classList.toggle('active')
    menuBtn.classList.toggle('active')
})

// Location Button eventListener
locationBtn.addEventListener('click', ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(Success, Denied)
        locationBtn.style.pointerEvents = "none"
        
        function Success(location){
            const {longitude, latitude} = location.coords;
            fetchWeatherDataGeo(latitude, longitude)
            fetchWeatherDataForecast(latitude, longitude)
        }

        function Denied(error){
            alert('GeoLocation API denied. Try again!')
        }

    }else{
        alert('Browser does not support GeoLocation!')
    }
})

function fetchWeatherDataForecast(latitude, longitude){
    // Storing API url into 'api' var 
    var api = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`

    // Getting data from API, taking the response and converting it to JSON
    fetch(`${api}`).then((response) => response.json())

    // Take that response and deconstructure the object into separate variables
    .then((response) =>{
        showForecastData(response.list) 
    })
}
  
function fetchWeatherDataGeo(latitude, longitude){  

    // Storing API url into 'api' var 
    var api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=f4997201f16a52b2421a2358a4ad46dc`

    // Getting data from API, taking the response and converting it to JSON
    fetch(`${api}`).then((response) => response.json())

    // Take that response and deconstructure the object into separate variables
    .then((response) =>{
        showWeatherData(response);
    })
}

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

function showForecastData(response){

    // Create an intance of the elements that are stored inside the 'template'
    const temp = document.getElementsByTagName("template")[0];
    forecastContainer = document.querySelector(".forecast-wrapper")

    for(let j = 0; j < 15; j++){
        // Since the response returns an array, and each array contains an object, for each weather array we iterate we will create a clone and append to the wrapper
        var myArr = [`${response[j].main.temp}`, `${response[j].main.temp_max}`, `${response[j].main.temp_min}`, `${response[j].weather[0].main}`, `${response[j].dt_txt}`];

        // Cloning the element, then reassigning the values of the child elements
        const item = temp.content.cloneNode(true)
        item.querySelector(".forecast-weather-temp").textContent = myArr[0]
        item.querySelector(".forecast-weather-high").textContent = myArr[1]
        item.querySelector(".forecast-weather-low").textContent = myArr[2]
        item.querySelector(".forecast-weather-icon").src = `./svgs/${myArr[3]}.svg`
        item.querySelector(".forecast-weather-time").innerHTML = `${myArr[4]}`

        // For every itiretion, we are appending this 'template' as a child into the 'forecast-wrapper'
        forecastContainer.appendChild(item)
    }
}

function showWeatherData(response){

    // Passing 'response' to 'getWeatherType' to return the correct icon to display.
    getWeatherType(response)
        
        const {
            name: currentCity
        } = response;

        function getWeatherType(object){
            
            var {
                main: currentWeatherType
            } = response.weather[0];
            
            currentWeatherIconEl.src = `svgs/${currentWeatherType}.svg `

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


