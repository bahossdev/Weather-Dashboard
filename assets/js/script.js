
// Variables for the search button and input text
let searchBTNEl = document.querySelector('#searchBTN')
let inputText = document.querySelector('#cityName')

// Run if ready
$(document).ready(function () {
    //Event Handler for the Search Button
    $('#searchBTN').on('click ', search);

    // Event Handler for Enter key in the input field
    $('#cityName').on('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            search();
        }
    })
    // Function to call functions for fetch, storage and adding the new city
    function search() {
        event.preventDefault();
        let cityName = inputText.value;
        if (!cityName) {
            alert('Please type a city name!')
        } else {
            saveCities(cityName);
            getWeatherInfo(cityName);
            getForecastInfo(cityName);
            $('#cityName').val('');
            addNewCity(cityName);
            $('#foreCast').removeClass('hidden')
        };
    }

    //Event Handler for Saved Cities
    $(document).on('click', '.cityBTN', function (event) {
        let selectedCity = $(event.target);
        let clickedCity = selectedCity.text();
        console.log(clickedCity);
        getWeatherInfo(clickedCity);
        getForecastInfo(clickedCity);
        $('#foreCast').removeClass('hidden')
    })

    // Fetch data for Current Weather
    function getWeatherInfo(city) {
        let APIKey = '3efeb6217d0973dac8d0cf930348a61f';
        let requsetUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&limit=5&appid=' + APIKey + '&units=metric';
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
    function getForecastInfo(city) {
        // city = inputText.value;
        let APIKey = '3efeb6217d0973dac8d0cf930348a61f';
        let requsetUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&limit=5&appid=' + APIKey + '&units=metric';
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
        return 'https://openweathermap.org/img/wn/' + iconCode + '.png';
    }

    // Display the Current Weather
    function displayWeather(info) {

        // Extract relevant information from the API response
        let cityName = info.name;
        let country = info.sys.country;
        let today = dayjs().format('YYYY/MM/DD');
        let temperature = info.main.temp;
        let wind = info.wind.speed;
        let humidity = info.main.humidity;
        let weather = info.weather[0].main;
        let iconCode = info.weather[0].icon;
        let iconUrl = getIconUrl(iconCode);

        // Update the HTML elements with the extracted information
        document.getElementById('city-date').innerHTML = cityName + ', ' + country + ', ' + today;
        document.getElementById('weather-today').innerHTML = weather;
        document.getElementById('temp-today').innerHTML = 'Temperature: ' + temperature + ' °C';
        document.getElementById('wind-today').innerHTML = 'Wind: ' + wind + ' MPH';
        document.getElementById('humidity-today').innerHTML = 'Humidity: ' + humidity + ' %';
        document.getElementById('weather-icon').src = iconUrl;
    }

    // Display the 5-day Weather Forecast
    function displayForecast(data) {
        for (let i = 7; i < 40; i = i + 8) {
            let dateDash = data.list[i].dt_txt.split(' ')[0];
            let date = dayjs(dateDash).format('YYYY/MM/DD');
            let temperature = data.list[i].main.temp;
            let wind = data.list[i].wind.speed;
            let humidity = data.list[i].main.humidity;
            let weather = data.list[i].weather[0].main;
            let iconCode = data.list[i].weather[0].icon;
            let iconUrl = getIconUrl(iconCode);

            // Update HTML elements dynamically for each forecast day
            $(`#date${i}`).html(`${date}`);
            $(`#weather${i}`).html(`${weather}`);
            $(`#temp${i}`).html(`Temp: ${temperature} °C`);
            $(`#wind${i}`).html(`Wind: ${wind} MPH`);
            $(`#humidity${i}`).html(`Humidity: ${humidity} %`);
            $(`#weather-icon${i}`).attr('src', iconUrl);
        }
    };

    // Retreive Saved Cities
    function getCities() {
        let allCities = JSON.parse(localStorage.getItem('#cityName')) || [];
        let cities = allCities.slice(0, 10);
        console.log(cities);
        // loop through saved cities and display item
        for (city of cities) {
            let capCity = city.charAt(0).toUpperCase() + city.slice(1);
            let cityEl = `<button class='cityBTN'>${capCity}</button>`;
            document.getElementById('cityList').innerHTML += cityEl;
        }
    }
    getCities();

    // Dynamically add the new city to the list
    function addNewCity(city) {
        let capCity = city.charAt(0).toUpperCase() + city.slice(1);
        let cityEl = `<button class='cityBTN'>${capCity}</button>`;
        document.getElementById('cityList').innerHTML += cityEl;
    }

    // Store City Names in local storage, avoiding repetitive names
    function saveCities(newCity) {
        let cities = JSON.parse(localStorage.getItem('#cityName')) || [];
        let cityExists = false;
        for (city of cities) {
            if (city.toUpperCase() === newCity.toUpperCase()) {
                // if (city === newCity) {
                cityExists = true;
                break;
            }
        }
        if (!cityExists) {
            cities.push(newCity);
            localStorage.setItem('#cityName', JSON.stringify(cities));
        }
    }

})