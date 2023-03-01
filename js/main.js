var $locationinput = document.querySelector('#location');
var $form = document.querySelector('form');
var $enter = document.querySelector('.enter-button');
var $userEntryList = document.querySelector('#user-entry-list');
var $forecast = document.querySelector('#forecast-preview');
// var $forecastdata = getForecast($locationinput.value);

function submitForm(e) {
  e.preventDefault();
  var inputs = {
    location: $locationinput.value,
    entryId: data.nextEntryId
  };
  data.entries.unshift(inputs);
  inputs.entryId = data.editing.entryId;
  data.nextEntryId++;
  viewSwap('entries');
}

function renderWeather(location) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://api.weatherapi.com/v1/forecast.json?key=bb2468a183ea4225855173630232702&q=' + location + '&days=8&aqi=yes&alerts=yes');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var times = xhr.response.forecast.forecastday[0].hour;
    var $userEntries = document.createElement('li');
    $userEntries.setAttribute('data-entry-id', 'entry.entryId');
    $userEntries.className = 'user-entry';
    var $columnOneThird = document.createElement('div');
    $columnOneThird.className = 'column-one-third';
    $userEntries.appendChild($columnOneThird);
    var $weatherLocation = document.createElement('p');
    $weatherLocation.textContent = xhr.response.location.name;
    $weatherLocation.className = 'current-location';
    $columnOneThird.appendChild($weatherLocation);
    var $currentTime = document.createElement('p');
    $currentTime.className = 'current-time';
    $currentTime.textContent = xhr.response.current.last_updated.slice(-5);
    $columnOneThird.appendChild($currentTime);
    var $currentTemp = document.createElement('p');
    $currentTemp.className = 'current-weather';
    $currentTemp.textContent = Math.round(xhr.response.current.temp_f) + '°';
    $columnOneThird.appendChild($currentTemp);
    var $conditions = document.createElement('div');
    $conditions.className = 'condition';
    var $currentCondition = document.createElement('p');
    $currentCondition.className = 'current-condition';
    $currentCondition.textContent = xhr.response.current.condition.text;
    $conditions.appendChild($currentCondition);
    var $currentIcon = document.createElement('img');
    $currentIcon.className = 'current-icon';
    $currentIcon.setAttribute('src', xhr.response.current.condition.icon);
    $conditions.appendChild($currentIcon);
    $columnOneThird.appendChild($conditions);
    var $columnTwoThirds = document.createElement('div');
    $columnTwoThirds.className = 'column-two-thirds';
    var $ul = document.createElement('ul');
    $ul.className = 'hourly-forecast';
    $columnTwoThirds.appendChild($ul);
    $userEntries.appendChild($columnTwoThirds);
    $userEntryList.appendChild($userEntries);
    for (var i = 0; i < times.length; i++) {
      var weatherIcons = xhr.response.forecast.forecastday[0].hour[i].condition.icon;
      var tempf = Math.round(xhr.response.forecast.forecastday[0].hour[i].temp_f);
      var $li = document.createElement('li');
      $li.className = 'hourly-weather';
      var $time = document.createElement('p');
      var $icon = document.createElement('img');
      var $temp = document.createElement('p');
      $temp.textContent = tempf + '°';
      $temp.className = 'hourly-temp';
      $li.appendChild($temp);
      $icon.setAttribute('src', weatherIcons);
      $icon.className = 'weather-icon';
      $li.appendChild($icon);
      $time.className = 'time';
      $li.appendChild($time);
      $time.textContent = times[i].time.slice(-5);
      $ul.appendChild($li);
    }

  //  console.log(xhr.response);
  });
  xhr.send();
}

function appendHourlyData() {
  for (var i = 0; i < data.entries.length; i++) {
    $forecast.appendChild(renderWeather(data.entries[i]));
  }
  viewSwap(data.view);
}

function viewSwap(view) {
  if (view === 'entries') {
    data.view = 'entries';
    $form.className = 'hidden';
    $forecast.className = 'view';
  } else if (view === 'entry-form') {
    data.view = 'entry-form';
    $form.className = 'view';
    $forecast.className = 'hidden';
  }
}

$enter.addEventListener('submit', submitForm);
document.addEventListener('DOMContentLoaded', appendHourlyData);
