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
    var $currentForecast = document.createElement('div');
    $currentForecast.setAttribute('data-entry-id', 'entry.entryId');
    $currentForecast.className = 'forecast-entry';
    var $forecastHeader = document.createElement('div');
    $forecastHeader.className = 'forecastHeader';
    $currentForecast.appendChild($forecastHeader);
    var $forecastDay = document.createElement('h1');
    $forecastDay.className = 'forecast-day';
    $forecastDay.textContent = xhr.response.location.name;
    $forecastHeader.appendChild($forecastDay);
    var $forecastTempF = document.createElement('h1');
    $forecastTempF.className = 'forecast-tempt';
    $forecastTempF.textContent = Math.round(xhr.response.current.temp_f) + '°';
    $forecastHeader.appendChild($forecastTempF);
    var $forecastConditions = document.createElement('div');
    $forecastConditions.className = 'forecast-conditions';
    $forecastHeader.appendChild($forecastConditions);
    var $forecastConditionText = document.createElement('p');
    $forecastConditionText.className = 'forecast-condition-text';
    $forecastConditionText.textContent = xhr.response.current.condition.text;
    $forecastConditions.appendChild($forecastConditionText);
    var $forecastConditionIcon = document.createElement('img');
    $forecastConditionIcon.setAttribute('src', xhr.response.current.condition.icon);
    $forecastConditionIcon.className = 'forecast-conditon-icon';
    $forecastConditions.appendChild($forecastConditionIcon);
    var $forecastHighLow = document.createElement('div');
    $forecastHighLow.className = 'forecast-high-low';
    $forecastHeader.appendChild($forecastHighLow);
    var $forecastHigh = document.createElement('p');
    $forecastHigh.className = 'forecast-high';
    $forecastHigh.textContent = xhr.response.forecast.forecastday[0].day.maxtemp_f + '°';
    $forecastHighLow.appendChild($forecastHigh);
    var $forecastLow = document.createElement('p');
    $forecastLow.className = 'forecast-low';
    $forecastLow.textContent = xhr.response.forecast.forecastday[0].day.mintemp_f + '°';
    $forecastHighLow.appendChild($forecastLow);
    var $additionalForecast = document.createElement('div');
    $additionalForecast.className = 'additional-forecast';
    $currentForecast.appendChild($additionalForecast);
    var $forecastHourly = document.createElement('ul');
    $forecastHourly.className = 'hourly-forecast';
    for (var y = 0; y < times.length; y++) {
      var forecastIcons = xhr.response.forecast.forecastday[0].hour[y].condition.icon;
      var forecastTempf = Math.round(xhr.response.forecast.forecastday[0].hour[y].temp_f);
      var $liForecast = document.createElement('li');
      $li.className = 'hourly-weather';
      var $forecastHourlyTime = document.createElement('p');
      var $forecastHourlyIcon = document.createElement('img');
      var $forecastHourlyTemp = document.createElement('p');
      $forecastHourlyTemp.textContent = forecastTempf + '°';
      $forecastHourlyTemp.className = 'hourly-temp';
      $liForecast.appendChild($forecastHourlyTemp);
      $forecastHourlyIcon.setAttribute('src', forecastIcons);
      $forecastHourlyIcon.className = 'weather-icon';
      $liForecast.appendChild($icon);
      $forecastHourlyTime.className = 'time';
      $liForecast.appendChild($time);
      $forecastHourlyTime.textContent = times[y].time.slice(-5);
      $forecastHourly.appendChild($liForecast);
    }
    $additionalForecast.appendChild($forecastHourly);
    var $forecastRowOne = document.createElement('div');
    $forecastRowOne.className = 'row';
    $additionalForecast.appendChild($forecastRowOne);
    var $forecastConditionColumn = document.createElement('div');
    $forecastConditionColumn.className = 'column-left';
    $forecastRowOne.appendChild($forecastConditionColumn);
    var $conditionText = document.createElement('p');
    $conditionText.className = 'forecast-header';
    $conditionText.textContent = 'Condition';
    $forecastConditionColumn.appendChild($conditionText);
    var $conditionIcon = document.createElement('img');
    $conditionIcon.setAttribute('src', xhr.response.current.condition.icon);
    $conditionIcon.className = 'condition-icon';
    $forecastConditionColumn.appendChild($conditionIcon);
    var $conditionDescription = document.createElement('p');
    $conditionDescription.className = 'forecast-text';
    $conditionDescription.textContent = xhr.response.current.condition.text;
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
    $windDirection.textContent = xhr.response.current.wind_dir;
    $windConditionColumn.appendChild($windDirection);
    var $windSpeed = document.createElement('p');
    $windSpeed.className = 'forecast-text';
    $windSpeed.textContent = 'MPH:' + xhr.response.current.wind_mph;
    $windConditionColumn.appendChild($windSpeed);
    var $forecastRowTwo = document.createElement('div');
    $forecastRowTwo.className = 'row';
    $additionalForecast.appendChild($forecastRowTwo);
    var $humidityColumn = document.createElement('div');
    $humidityColumn.className = 'column-left';
    $forecastRowTwo.appendChild($humidityColumn);
    var $humidity = document.createElement('p');
    $humidity.className = 'forecast-header';
    $humidity.textContent = 'Humidity';
    $humidityColumn.appendChild($humidity);
    var $humidityPercentage = document.createElement('p');
    $humidityPercentage.className = 'forecast-percentage';
    $humidityPercentage.textcontent = xhr.response.current.humidity + '%';
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
    $rainPercentage.textContent = xhr.response.forecast.forecastday[0].day.daily_chance_of_rain + '%';
    $rainColumn.appendChild($rainPercentage);
    var $astroRow = document.createElement('div');
    $astroRow.className = 'row';
    $additionalForecast.appendChild($astroRow);
    var $astroText = document.createElement('p');
    $astroText.className = 'forecast-header';
    $astroRow.textContent = 'Astro';
    $astroRow.appendChild($astroText);
    var $astroLeft = document.createElement('div');
    $astroLeft.className = 'astro-left';
    var $sunrise = document.createElement('p');
    $sunrise.className = 'forecast-text';
    $sunrise.textContent = xhr.response.forecast.forecastday[0].astro.sunrise;
    $astroLeft.appendChild($sunrise);
    var $sunset = document.createElement('p');
    $sunset.className = 'forecast-text';
    $sunset.textContent = xhr.response.forecast.forecastday[0].astro.sunset;
    $astroLeft.appendChild($sunset);
    $astroRow.appendChild($astroLeft);
    var $astroRight = document.createElement('div');
    $astroRight.className = 'astro-rigth';
    var $moonset = document.createElement('p');
    $moonset.className = 'forecast-text';
    $moonset.textContent = xhr.response.forecast.forecastday[0].astro.moonset;
    $astroRight.appendChild($moonset);
    var $moonrise = document.createElement('p');
    $moonrise.className = 'forecast-text';
    $moonrise.textContent = xhr.response.forecast.forecastday[0].astro.moonrise;
    $astroRight.appendChild($moonrise);
    $astroRow.appendChild($astroRight);
    $forecast.appendChild($currentForecast);
    // console.log(xhr.response);
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
