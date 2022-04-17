// Variables
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('Current-Weather-Items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

// Days and Months
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM';

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherData () {
 navigator.geolocation.getCurrentPosition((success) => {
  console.log(success);

  let {latitude, longitude} = success.coords;

  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${owKey}`).then(res => res.json()).then(data => {

  console.log(data)
  showWeatherData(data);
  })
 })
}

function showWeatherData (data) {
 let {humidity, pressure, wind_speed} = data.current;

 currentWeatherItemsEl.innerHTML =
 `              <div class="weather-item col d-md-inline-block">
                  <p>Humidity</p>
                  <p class="data-box">${humidity}%</p>
                </div>
                <div class="weather-item col d-md-inline-block">
                  <p>Pressure</p>
                  <p class="data-box">${pressure}</p>
                </div>
                <div class="weather-item col d-md-inline-block">
                  <p>Wind</p>
                  <p class="data-box">${wind_speed} km/h</p>
                </div>`;
}


// alert("Unfortunately, your browser does not support geolocation services. Turn location services on to get weather information for your area")
