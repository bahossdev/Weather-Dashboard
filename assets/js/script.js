let searchBTNEl = document.querySelector('#searchBTN')
let inputText = document.querySelector('#cityName')

$('#searchBTN').on('click', function () {
    event.preventDefault();
    let cityName = inputText.value;
    if (!cityName) {
        alert('Please type a city name!')
    } else {
        saveCities(cityName);
        getWeatherInfo();
    };
})
//active for enter as well

function getWeatherInfo() {
    let city = inputText.value;
    let requsetUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+ city + '&limit=5&appid=3efeb6217d0973dac8d0cf930348a61f&units=metric';
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


function displayForecast(data){
    let cityName = data.city.name;
    let country = data.city.country;
    console.log("city: " + cityName);
    console.log("country: " + country);

    for (let i = 0; i < 40; i = i + 8) {
    let date = data.list[i].dt_txt.split(' ')[0];
    // let dateShown = ;
    let temprature = data.list[i].main.temp;
    let humidity = data.list[i].main.humidity;
    let wind = data.list[i].wind.speed;
    // let icon = data.list.weather[0];
    console.log("Date: " + date);
    console.log("Temprature: " + temprature);
    console.log("Humidity: " + humidity);
    console.log("Wind: " + wind);
    };
}

function getCities() {
    const cities = JSON.parse(localStorage.getItem('#cityName')) || [];
    // loop through cities
    for (city of cities) {
        const cityEl = `<button>${city}</button>`;
        document.getElementById('cityList').innerHTML += cityEl;
    }
}

getCities();

function saveCities(newCity) {
    const cities = JSON.parse(localStorage.getItem('#cityName')) || [];
    let cityExists = false;
    for (city of cities) {
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
    
// }
