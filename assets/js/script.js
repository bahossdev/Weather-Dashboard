let searchBTNEl = document.querySelector('#searchBTN')
let inputText = document.querySelector('#cityName')


$(document).ready(function () {
    //Event Handler for the Search Button
    $('#searchBTN').on('click', function () {
        event.preventDefault();
        let cityName = inputText.value;
        if (!cityName) {
            alert('Please type a city name!')
        } else {
            saveCities(cityName);
            getWeatherInfo();
            getForecastInfo();
            // document.querySelector('#cityName').textContent = ''
        };
    })
    //active for enter as well
    //inputtext clean up!
    //ensure the functions will run with cityBTN

    //Event Handler for Saved Cities
    // $(document).on('click', '.cityBTN', function (event) {
    //     let selectedCity = $(event.target);
    //     let clickedCity = selectedCity.text();
    //     console.log(clickedCity);
    //     getWeatherInfo(selectedCity);
    //     getForecastInfo(selectedCity);
    // })

    // Fetch data for Current Weather
    function getWeatherInfo() {
        let city = inputText.value;
        let APIKey = '3efeb6217d0973dac8d0cf930348a61f';
        let requsetUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city + '&limit=5&appid=' + APIKey + '&units=metric';
        fetch(requsetUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (info) {
                    console.log(info);
                    displayWeather(info);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to the server');
        });
    };

    // Fetch data for 5-day Forecast
    function getForecastInfo() {
        let city = inputText.value;
        let APIKey = '3efeb6217d0973dac8d0cf930348a61f';
        let requsetUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+ city + '&limit=5&appid=' + APIKey + '&units=metric';
        fetch(requsetUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayForecast(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to the server');
        });
    };

    // Get the URL for the Weather Icon
    function getIconUrl(iconCode) {
        return 'https://openweathermap.org/img/wn/' + iconCode +'.png';
    }

    // Display the Current Weather
    function displayWeather(info){
        let cityName = info.name;
        let country = info.sys.country;
        let today = dayjs().format('YYYY/MM/DD');
        let temperature = info.main.temp;
        let wind = info.wind.speed;
        let humidity = info.main.humidity;
        let iconCode = info.weather[0].icon;
        let iconUrl = getIconUrl(iconCode);

        document.getElementById('city-date').innerHTML = cityName + ', ' + country + ', ' + today;
        document.getElementById('temp-today').innerHTML = 'Temperature: ' + temperature + ' °C';
        document.getElementById('wind-today').innerHTML =  'Wind: ' + wind + ' MPH';
        document.getElementById('humidity-today').innerHTML = 'Humidity: ' + humidity + ' %';
        document.getElementById('weather-icon').src = iconUrl;
    }

    // Display the 5-day Weather Forecast
    function displayForecast(data){
        for (let i = 0; i < 40; i = i + 8) {
        let date = data.list[i].dt_txt.split(' ')[0];
        let temperature = data.list[i].main.temp;
        let wind = data.list[i].wind.speed;
        let humidity = data.list[i].main.humidity;
        let iconCode = data.list[i].weather[0].icon;
        let iconUrl = getIconUrl(iconCode);

        $(`#date${i}`).html(`${date}`);
        $(`#temp${i}`).html(`Temperature: ${temperature} °C`);
        $(`#wind${i}`).html(`Wind: ${wind} MPH`);
        $(`#humidity${i}`).html(`Humidity: ${humidity} %`);
        $(`#weather-icon${i}`).attr('src', iconUrl);
        }
    };

    // Retreive Saved Cities
    function getCities() {
        let cities = JSON.parse(localStorage.getItem('#cityName')) || [];
        // loop through cities
        for (city of cities) {
            let cityEl = `<button class='cityBTN'>${city}</button>`;
            document.getElementById('cityList').innerHTML += cityEl;
        }
    }
    getCities();

    // Store City Names (removing repetitive names)
    function saveCities(newCity) {
        const cities = JSON.parse(localStorage.getItem('#cityName')) || [];
        let cityExists = false;
        for (city of cities) {
            // if (toUpperCase(city) === toUpperCase(newCity)) {
                if (city === newCity) {
                cityExists = true;
                break;
            }
        }
        if (!cityExists) {
            cities.push(newCity);
            localStorage.setItem('#cityName', JSON.stringify(cities));
        }
    }

    // function cityReload() {
    //     let 
    // }
})