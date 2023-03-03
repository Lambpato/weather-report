var $locationinput = document.querySelector('#location');
var $form = document.querySelector('form');
var $weather = document.querySelector('#user-entry-list');
var $header = document.querySelector('.header-column');

async function submitForm(e) {
  e.preventDefault();
  var inputs = {
    location: $locationinput.value,
    entryId: data.nextEntryId
  };
  var forecastResult = await grabForecast(inputs.location);
  $weather.appendChild(renderWeather(forecastResult));
  data.nextEntryId++;
  data.entries.unshift(inputs);
  viewSwap('entries');
  $form.reset();
}

async function grabForecast(location) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.weatherapi.com/v1/forecast.json?key=bb2468a183ea4225855173630232702&q=' + location + '&days=8&aqi=yes&alerts=yes');
    xhr.responseType = 'json';
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error('something bad happened'));
      }
    };
    xhr.send();
  });
}

function renderWeather(location) {
  var times = location.forecast.forecastday[0].hour;
  var $userEntries = document.createElement('li');
  $userEntries.setAttribute('data-entry-id', location.entryId);
  $userEntries.className = 'user-entry';
  var $currentWeather = document.createElement('div');
  $currentWeather.setAttribute('id', 'current-weather');
  $userEntries.appendChild($currentWeather);
  var $columnOneThird = document.createElement('div');
  $columnOneThird.className = 'column-one-third';
  $currentWeather.appendChild($columnOneThird);
  var $weatherLocation = document.createElement('p');
  $weatherLocation.textContent = location.location.name;
  $weatherLocation.className = 'current-location';
  $columnOneThird.appendChild($weatherLocation);
  var $currentTime = document.createElement('p');
  $currentTime.className = 'current-time';
  $currentTime.textContent = location.current.last_updated.slice(-5);
  $columnOneThird.appendChild($currentTime);
  var $currentTemp = document.createElement('p');
  $currentTemp.className = 'current-temp';
  $currentTemp.textContent = Math.round(location.current.temp_f) + '°';
  $columnOneThird.appendChild($currentTemp);
  var $conditions = document.createElement('div');
  $conditions.className = 'condition';
  var $currentCondition = document.createElement('p');
  $currentCondition.className = 'current-condition';
  $currentCondition.textContent = location.current.condition.text;
  $conditions.appendChild($currentCondition);
  var $currentIcon = document.createElement('img');
  $currentIcon.className = 'current-icon';
  $currentIcon.setAttribute('src', location.current.condition.icon);
  $conditions.appendChild($currentIcon);
  $columnOneThird.appendChild($conditions);
  var $columnTwoThirds = document.createElement('div');
  $columnTwoThirds.className = 'column-two-thirds';
  var $ul = document.createElement('ul');
  $ul.className = 'hourly-forecast';
  $columnTwoThirds.appendChild($ul);
  $currentWeather.appendChild($columnTwoThirds);
  var $additionalForecast = document.createElement('div');
  $additionalForecast.setAttribute('data-entry-id', data.entryId);
  $additionalForecast.setAttribute('id', 'additional-forecast');
  if (window.matchMedia('only screen and (max-width: 768px)').matches) {
    $additionalForecast.className = 'hidden';
  } else {
    $additionalForecast.className = 'forecast-view';
  }
  var $currentForecast = document.createElement('div');
  $currentForecast.className = 'current-forecast';
  $additionalForecast.appendChild($currentForecast);

  $userEntries.appendChild($additionalForecast);
  var $forecastHeader = document.createElement('div');
  $forecastHeader.className = 'forecast-head';
  var $backArrowDiv = document.createElement('div');
  $backArrowDiv.className = 'mobile-back';
  var $backArrow = document.createElement('i');
  $backArrow.className = 'fa-solid fa-chevron-left';
  $backArrowDiv.appendChild($backArrow);
  $forecastHeader.appendChild($backArrowDiv);
  $currentForecast.appendChild($forecastHeader);
  var $forecastDay = document.createElement('p');
  $forecastDay.className = 'forecast-day';
  $forecastDay.textContent = location.location.name;
  $forecastHeader.appendChild($forecastDay);
  var $forecastTempF = document.createElement('p');
  $forecastTempF.className = 'forecast-tempt';
  $forecastTempF.textContent = Math.round(location.current.temp_f) + '°';
  $forecastHeader.appendChild($forecastTempF);
  var $forecastConditions = document.createElement('div');
  $forecastConditions.className = 'forecast-conditions';
  $forecastHeader.appendChild($forecastConditions);
  var $forecastConditionText = document.createElement('p');
  $forecastConditionText.className = 'forecast-condition-text';
  $forecastConditionText.textContent = location.current.condition.text;
  $forecastConditions.appendChild($forecastConditionText);
  var $forecastConditionIcon = document.createElement('img');
  $forecastConditionIcon.setAttribute('src', location.current.condition.icon);
  $forecastConditionIcon.className = 'forecast-condition-icon';
  $forecastConditions.appendChild($forecastConditionIcon);
  var $forecastHighLow = document.createElement('div');
  $forecastHighLow.className = 'forecast-high-low';
  $forecastHeader.appendChild($forecastHighLow);
  var $forecastHigh = document.createElement('p');
  $forecastHigh.className = 'forecast-high';
  $forecastHigh.textContent = 'H: ' + Math.round(location.forecast.forecastday[0].day.maxtemp_f) + '°';
  $forecastHighLow.appendChild($forecastHigh);
  var $forecastLow = document.createElement('p');
  $forecastLow.className = 'forecast-low';
  $forecastLow.textContent = 'L: ' + Math.round(location.forecast.forecastday[0].day.mintemp_f) + '°';
  $forecastHighLow.appendChild($forecastLow);
  var $forecastPreview = document.createElement('div');
  $forecastPreview.className = 'forecast-preview';
  $currentForecast.appendChild($forecastPreview);
  var $forecastHourlyDiv = document.createElement('div');
  $forecastHourlyDiv.className = 'hourly-list';
  $forecastPreview.appendChild($forecastHourlyDiv);
  var $forecastHourly = document.createElement('ul');
  $forecastHourly.className = 'hourly-forecast';
  for (var i = 0; i < times.length; i++) {
    var weatherIcons = location.forecast.forecastday[0].hour[i].condition.icon;
    var tempf = Math.round(location.forecast.forecastday[0].hour[i].temp_f);
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
    var $liClone = $li.cloneNode(true);
    $forecastHourly.appendChild($liClone);
  }
  $forecastHourlyDiv.appendChild($forecastHourly);
  var $forecastRowOne = document.createElement('div');
  $forecastRowOne.className = 'forecast-row';
  $forecastPreview.appendChild($forecastRowOne);
  var $forecastConditionColumn = document.createElement('div');
  $forecastConditionColumn.className = 'column-left-condition';
  $forecastRowOne.appendChild($forecastConditionColumn);
  var $conditionText = document.createElement('p');
  $conditionText.className = 'forecast-header';
  $conditionText.textContent = 'Condition';
  $forecastConditionColumn.appendChild($conditionText);
  var $conditionIcon = document.createElement('img');
  $conditionIcon.setAttribute('src', location.current.condition.icon);
  $conditionIcon.className = 'condition-icon';
  $forecastConditionColumn.appendChild($conditionIcon);
  var $conditionDescription = document.createElement('p');
  $conditionDescription.className = 'forecast-text';
  $conditionDescription.textContent = location.current.condition.text;
  $forecastConditionColumn.appendChild($conditionDescription);
  var $windConditionColumn = document.createElement('div');
  $windConditionColumn.className = 'column-right';
  $forecastRowOne.appendChild($windConditionColumn);
  var $windConditionText = document.createElement('p');
  $windConditionText.classList = 'forecast-header';
  $windConditionText.textContent = 'Wind Conditions';
  $windConditionColumn.appendChild($windConditionText);
  var $windDirection = document.createElement('p');
  $windDirection.className = 'forecast-text';
  $windDirection.textContent = 'Direction: ' + location.current.wind_dir;
  $windConditionColumn.appendChild($windDirection);
  var $windSpeed = document.createElement('p');
  $windSpeed.className = 'forecast-text';
  $windSpeed.textContent = 'MPH: ' + location.current.wind_mph;
  $windConditionColumn.appendChild($windSpeed);
  var $forecastRowTwo = document.createElement('div');
  $forecastRowTwo.className = 'forecast-row';
  $forecastPreview.appendChild($forecastRowTwo);
  var $humidityColumn = document.createElement('div');
  $humidityColumn.className = 'column-left';
  $forecastRowTwo.appendChild($humidityColumn);
  var $humidity = document.createElement('p');
  $humidity.className = 'forecast-header';
  $humidity.textContent = 'Humidity';
  $humidityColumn.appendChild($humidity);
  var $humidityPercentage = document.createElement('p');
  $humidityPercentage.className = 'forecast-percentage';
  $humidityPercentage.textContent = location.current.humidity + '%';
  $humidityColumn.appendChild($humidityPercentage);
  var $rainColumn = document.createElement('div');
  $rainColumn.className = 'column-right';
  $forecastRowTwo.appendChild($rainColumn);
  var $rainText = document.createElement('p');
  $rainText.className = 'forecast-header';
  $rainText.textContent = 'Chance of Rain';
  $rainColumn.appendChild($rainText);
  var $rainPercentage = document.createElement('p');
  $rainPercentage.className = 'forecast-percentage';
  $rainPercentage.textContent = location.forecast.forecastday[0].day.daily_chance_of_rain + '%';
  $rainColumn.appendChild($rainPercentage);
  var $astroRow = document.createElement('div');
  $astroRow.className = 'astro-row';
  $forecastPreview.appendChild($astroRow);
  var $astroText = document.createElement('p');
  $astroText.className = 'forecast-header';
  $astroRow.textContent = 'Astro';
  $astroRow.appendChild($astroText);
  var $astroLeft = document.createElement('div');
  $astroLeft.className = 'astro-left';
  var $sunrise = document.createElement('p');
  $sunrise.className = 'forecast-text';
  $sunrise.textContent = 'Sunrise: ' + location.forecast.forecastday[0].astro.sunrise;
  $astroLeft.appendChild($sunrise);
  var $sunset = document.createElement('p');
  $sunset.className = 'forecast-text';
  $sunset.textContent = 'Sunset: ' + location.forecast.forecastday[0].astro.sunset;
  $astroLeft.appendChild($sunset);
  $astroRow.appendChild($astroLeft);
  var $astroRight = document.createElement('div');
  $astroRight.className = 'astro-right';
  var $moonset = document.createElement('p');
  $moonset.className = 'forecast-text';
  $moonset.textContent = 'Moonset: ' + location.forecast.forecastday[0].astro.moonset;
  $astroRight.appendChild($moonset);
  var $moonrise = document.createElement('p');
  $moonrise.className = 'forecast-text';
  $moonrise.textContent = 'Moonset: ' + location.forecast.forecastday[0].astro.moonrise;
  $astroRight.appendChild($moonrise);
  $astroRow.appendChild($astroRight);
  var $weeklyWeatherDiv = document.createElement('div');
  $weeklyWeatherDiv.className = 'weekly-weather-container';
  $additionalForecast.appendChild($weeklyWeatherDiv);
  // var $dayOfWeek = document.createElement('ul');
  // $dayOfWeek.className = 'day-of-week';
  // $weeklyWeatherDiv.appendChild($dayOfWeek);
  // var day = location.forecast.forecastday;
  // var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // for (var y = 1; y < day.length; y++) {
  //   var time = day[y].date;
  //   var weekday = new Date(time);
  //   var date = weekday.getDay();
  //   var currentday = weekdays[date];
  //   var dayIcon = day[y].day.condition.icon;
  //   var dayTempMax = Math.round(day[y].day.maxtemp_f);
  //   var dayTempMin = Math.round(day[y].day.mintemp_f);
  //   var $dayli = document.createElement('li');
  //   $dayli.className = 'day-weather';
  //   var $day = document.createElement('p');
  //   var $dayIcon = document.createElement('img');
  //   var $dayTempMin = document.createElement('p');
  //   var $dayTempMax = document.createElement('p');
  //   $day.className = 'date';
  //   $day.textContent = currentday;
  //   $dayli.appendChild($day);
  //   $dayIcon.setAttribute('src', dayIcon);
  //   $dayIcon.className = 'day-icon';
  //   $dayli.appendChild($dayIcon);
  //   $dayli.appendChild($dayTempMin);
  //   $dayTempMin.className = 'day-temp-min';
  //   $dayTempMin.textContent = dayTempMin + '°';
  //   $dayli.appendChild($dayTempMax);
  //   $dayTempMax.textContent = dayTempMax + '°';
  //   $dayTempMax.className = 'day-temp-max';
  //   $dayOfWeek.appendChild($dayli);
  // }

  return $userEntries;
}

async function appendForecast() {
  for (var i = 0; i < data.entries.length; i++) {
    var forecastResult = await grabForecast(data.entries[i].location);
    $weather.appendChild(renderWeather(forecastResult));
  }
  viewSwap(data.view);
}

function viewSwap(view) {
  if (view === 'entries') {
    data.view = 'entries';
    $form.className = 'hidden';
    $header.className = 'hidden';
  } else if (view === 'entry-form') {
    data.view = 'entry-form';
    $form.className = 'view';
    $header.className = 'header-column';
  }
}

$form.addEventListener('submit', submitForm);
document.addEventListener('DOMContentLoaded', appendForecast);

window.addEventListener('resize', function (e) {
  var $currentWeather = document.querySelector('#current-weather');
  var $additionalForecast = document.querySelector('#additional-forecast');
  if (window.matchMedia('only screen and (min-width: 768px)').matches) {
    $additionalForecast.className = 'forecast-view';
    $currentWeather.className = 'view';
  } else {
    $additionalForecast.className = 'hidden';
    $currentWeather.className = 'view';
  }
});

document.addEventListener('click', function (e) {
  var $currentWeather = document.querySelector('#current-weather');
  var $additionalForecast = document.querySelector('#additional-forecast');
  if (window.matchMedia('only screen and (min-width: 768px)').matches) {
    return;
  }
  $additionalForecast.className = 'forecast-view';
  $currentWeather.className = 'hidden';
});

document.addEventListener('click', function (e) {
  var target = e.target.closest('.mobile-back');
  var $currentWeather = document.querySelector('#current-weather');
  var $additionalForecast = document.querySelector('#additional-forecast');
  if (target) {
    $additionalForecast.className = 'hidden';
    $currentWeather.className = 'view';
  }
});
