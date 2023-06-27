const $locationinput = document.querySelector('#location');
const $form = document.querySelector('form');
const $weather = document.querySelector('#user-entry-list');
const $header = document.querySelector('.header-column');
const $newEntry = document.querySelector('#new-location');
const $cancel = document.querySelector('#cancel');

const submitForm = async e => {
  e.preventDefault();
  const inputs = {
    location: $locationinput.value,
    entryId: data.nextEntryId
  };

  const forecastResult = await grabForecast(inputs.location);

  for (let i = 0; i < data.entries.length; i++) {
    const forecastStored = await grabForecast(data.entries[i].location);
    if (forecastResult.location.name === forecastStored.location.name) {
      return;
    }
  }

  data.entries.unshift(inputs);
  data.nextEntryId++;
  $weather.prepend(renderWeather(forecastResult));
  viewSwap('entries');
  $newEntry.className = 'view';
  $form.reset();
};

const grabForecast = async location => {
  return new Promise((resolve, reject) => {
    const targetUrl = encodeURIComponent('http://api.weatherapi.com/v1/forecast.json?key=bb2468a183ea4225855173630232702&q=' + location + '&days=8&aqi=yes&alerts=yes');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
    xhr.setRequestHeader('token', 'abc123');
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error(`something bad happened Error Code: ${this.status}`));
      }
    };
    xhr.send();
  });
};

const renderWeather = (location, entryId) => {
  const times = location.forecast.forecastday[0].hour;
  const $userEntries = document.createElement('li');
  $userEntries.setAttribute('data-entry-id', entryId);
  $userEntries.className = 'user-entry';
  const $currentWeather = document.createElement('div');
  $currentWeather.className = 'current-weather';
  $userEntries.appendChild($currentWeather);
  const $deleteButton = document.createElement('i');
  $deleteButton.className = 'delete fa-solid fa-trash hidden';
  $currentWeather.appendChild($deleteButton);
  const $columnOneThird = document.createElement('div');
  $columnOneThird.className = 'column-one-third';
  $currentWeather.appendChild($columnOneThird);
  const $weatherLocation = document.createElement('p');
  $weatherLocation.textContent = location.location.name;
  $weatherLocation.className = 'current-location';
  $columnOneThird.appendChild($weatherLocation);
  const $currentTime = document.createElement('p');
  $currentTime.className = 'current-time';
  $currentTime.textContent = location.current.last_updated.slice(-5);
  $columnOneThird.appendChild($currentTime);
  const $currentTemp = document.createElement('p');
  $currentTemp.className = 'current-temp';
  $currentTemp.textContent = Math.round(location.current.temp_f) + '°';
  $columnOneThird.appendChild($currentTemp);
  const $conditions = document.createElement('div');
  $conditions.className = 'condition';
  const $currentCondition = document.createElement('p');
  $currentCondition.className = 'current-condition';
  $currentCondition.textContent = location.current.condition.text;
  $conditions.appendChild($currentCondition);
  const $currentIcon = document.createElement('img');
  $currentIcon.className = 'current-icon';
  $currentIcon.setAttribute('src', location.current.condition.icon);
  $currentIcon.setAttribute('alt', location.current.condition.text);
  $conditions.appendChild($currentIcon);
  $columnOneThird.appendChild($conditions);
  const $columnTwoThirds = document.createElement('div');
  $columnTwoThirds.className = 'column-two-thirds';
  const $ul = document.createElement('ul');
  $ul.className = 'hourly-forecast';
  $columnTwoThirds.appendChild($ul);
  $currentWeather.appendChild($columnTwoThirds);
  const $additionalForecast = document.createElement('div');
  $additionalForecast.setAttribute('data-entry-id', entryId);
  $additionalForecast.className = 'additional-forecast';
  if (window.matchMedia('only screen and (max-width: 768px)').matches) {
    $additionalForecast.className = 'additional-forecast hidden';
  } else {
    $additionalForecast.className = 'additional-forecast';
  }
  const $additionalForecastRow = document.createElement('div');
  $additionalForecastRow.className = 'additional-forecast-row';
  $additionalForecast.appendChild($additionalForecastRow);
  const $currentForecast = document.createElement('div');
  $currentForecast.className = 'current-forecast';
  $additionalForecastRow.appendChild($currentForecast);
  $userEntries.appendChild($additionalForecast);
  const $forecastHeader = document.createElement('div');
  $forecastHeader.className = 'forecast-head';
  const $backArrowDiv = document.createElement('div');
  $backArrowDiv.className = 'mobile-back';
  const $backArrow = document.createElement('i');
  $backArrow.className = 'fa-solid fa-chevron-left';
  $backArrowDiv.appendChild($backArrow);
  $forecastHeader.appendChild($backArrowDiv);
  $currentForecast.appendChild($forecastHeader);
  const $forecastDay = document.createElement('p');
  $forecastDay.className = 'forecast-day';
  $forecastDay.textContent = location.location.name;
  $forecastHeader.appendChild($forecastDay);
  const $forecastTempF = document.createElement('p');
  $forecastTempF.className = 'forecast-tempt';
  $forecastTempF.textContent = Math.round(location.current.temp_f) + '°';
  $forecastHeader.appendChild($forecastTempF);
  const $forecastConditions = document.createElement('div');
  $forecastConditions.className = 'forecast-conditions';
  $forecastHeader.appendChild($forecastConditions);
  const $forecastConditionText = document.createElement('p');
  $forecastConditionText.className = 'forecast-condition-text';
  $forecastConditionText.textContent = location.current.condition.text;
  $forecastConditions.appendChild($forecastConditionText);
  const $forecastConditionIcon = document.createElement('img');
  $forecastConditionIcon.setAttribute('src', location.current.condition.icon);
  $forecastConditionIcon.setAttribute('alt', location.current.condition.text);
  $forecastConditionIcon.className = 'forecast-condition-icon';
  $forecastConditions.appendChild($forecastConditionIcon);
  const $forecastHighLow = document.createElement('div');
  $forecastHighLow.className = 'forecast-high-low';
  $forecastHeader.appendChild($forecastHighLow);
  const $forecastHigh = document.createElement('p');
  $forecastHigh.className = 'forecast-high';
  $forecastHigh.textContent = 'H: ' + Math.round(location.forecast.forecastday[0].day.maxtemp_f) + '°';
  $forecastHighLow.appendChild($forecastHigh);
  const $forecastLow = document.createElement('p');
  $forecastLow.className = 'forecast-low';
  $forecastLow.textContent = 'L: ' + Math.round(location.forecast.forecastday[0].day.mintemp_f) + '°';
  $forecastHighLow.appendChild($forecastLow);
  const $forecastPreview = document.createElement('div');
  $forecastPreview.className = 'forecast-preview';
  $currentForecast.appendChild($forecastPreview);
  const $forecastHourlyDiv = document.createElement('div');
  $forecastHourlyDiv.className = 'hourly-list';
  $forecastPreview.appendChild($forecastHourlyDiv);
  const $forecastHourly = document.createElement('ul');
  $forecastHourly.className = 'hourly-forecast';
  for (let i = 0; i < times.length; i++) {
    const weatherIcons = location.forecast.forecastday[0].hour[i].condition.icon;
    const weatherIconAlt = location.forecast.forecastday[0].hour[i].condition.text;
    const tempf = Math.round(location.forecast.forecastday[0].hour[i].temp_f);
    const $li = document.createElement('li');
    $li.className = 'hourly-weather';
    const $time = document.createElement('p');
    const $icon = document.createElement('img');
    const $temp = document.createElement('p');
    $temp.textContent = tempf + '°';
    $temp.className = 'hourly-temp';
    $li.appendChild($temp);
    $icon.setAttribute('src', weatherIcons);
    $icon.setAttribute('alt', weatherIconAlt);
    $icon.className = 'weather-icon';
    $li.appendChild($icon);
    $time.className = 'time';
    $li.appendChild($time);
    $time.textContent = times[i].time.slice(-5);
    $ul.appendChild($li);
    const $liClone = $li.cloneNode(true);
    $forecastHourly.appendChild($liClone);
  }
  $forecastHourlyDiv.appendChild($forecastHourly);
  const $forecastRowOne = document.createElement('div');
  $forecastRowOne.className = 'forecast-row';
  $forecastPreview.appendChild($forecastRowOne);
  const $forecastConditionColumn = document.createElement('div');
  $forecastConditionColumn.className = 'column-left-condition';
  $forecastRowOne.appendChild($forecastConditionColumn);
  const $conditionText = document.createElement('p');
  $conditionText.className = 'forecast-header';
  $conditionText.textContent = 'Condition';
  $forecastConditionColumn.appendChild($conditionText);
  const $conditionIcon = document.createElement('img');
  $conditionIcon.setAttribute('src', location.current.condition.icon);
  $conditionIcon.setAttribute('alt', location.current.condition.text);
  $conditionIcon.className = 'condition-icon';
  $forecastConditionColumn.appendChild($conditionIcon);
  const $conditionDescription = document.createElement('p');
  $conditionDescription.className = 'forecast-text';
  $conditionDescription.textContent = location.current.condition.text;
  $forecastConditionColumn.appendChild($conditionDescription);
  const $windConditionColumn = document.createElement('div');
  $windConditionColumn.className = 'column-right';
  $forecastRowOne.appendChild($windConditionColumn);
  const $windConditionText = document.createElement('p');
  $windConditionText.classList = 'forecast-header';
  $windConditionText.textContent = 'Wind Conditions';
  $windConditionColumn.appendChild($windConditionText);
  const $windDirection = document.createElement('p');
  $windDirection.className = 'forecast-text';
  $windDirection.textContent = 'Direction: ' + location.current.wind_dir;
  $windConditionColumn.appendChild($windDirection);
  const $windSpeed = document.createElement('p');
  $windSpeed.className = 'forecast-text';
  $windSpeed.textContent = 'MPH: ' + location.current.wind_mph;
  $windConditionColumn.appendChild($windSpeed);
  const $forecastRowTwo = document.createElement('div');
  $forecastRowTwo.className = 'forecast-row';
  $forecastPreview.appendChild($forecastRowTwo);
  const $humidityColumn = document.createElement('div');
  $humidityColumn.className = 'column-left';
  $forecastRowTwo.appendChild($humidityColumn);
  const $humidity = document.createElement('p');
  $humidity.className = 'forecast-header';
  $humidity.textContent = 'Humidity';
  $humidityColumn.appendChild($humidity);
  const $humidityPercentage = document.createElement('p');
  $humidityPercentage.className = 'forecast-percentage';
  $humidityPercentage.textContent = location.current.humidity + '%';
  $humidityColumn.appendChild($humidityPercentage);
  const $rainColumn = document.createElement('div');
  $rainColumn.className = 'column-right';
  $forecastRowTwo.appendChild($rainColumn);
  const $rainText = document.createElement('p');
  $rainText.className = 'forecast-header';
  $rainText.textContent = 'Chance of Rain';
  $rainColumn.appendChild($rainText);
  const $rainPercentage = document.createElement('p');
  $rainPercentage.className = 'forecast-percentage';
  $rainPercentage.textContent = location.forecast.forecastday[0].day.daily_chance_of_rain + '%';
  $rainColumn.appendChild($rainPercentage);
  const $astroRow = document.createElement('div');
  $astroRow.className = 'astro-row';
  $forecastPreview.appendChild($astroRow);
  const $astroText = document.createElement('p');
  $astroText.className = 'forecast-header';
  $astroRow.textContent = 'Astro';
  $astroRow.appendChild($astroText);
  const $astroLeft = document.createElement('div');
  $astroLeft.className = 'astro-left';
  const $sunrise = document.createElement('p');
  $sunrise.className = 'forecast-text';
  $sunrise.textContent = 'Sunrise: ' + location.forecast.forecastday[0].astro.sunrise;
  $astroLeft.appendChild($sunrise);
  const $sunset = document.createElement('p');
  $sunset.className = 'forecast-text';
  $sunset.textContent = 'Sunset: ' + location.forecast.forecastday[0].astro.sunset;
  $astroLeft.appendChild($sunset);
  $astroRow.appendChild($astroLeft);
  const $astroRight = document.createElement('div');
  $astroRight.className = 'astro-right';
  const $moonset = document.createElement('p');
  $moonset.className = 'forecast-text';
  $moonset.textContent = 'Moonset: ' + location.forecast.forecastday[0].astro.moonset;
  $astroRight.appendChild($moonset);
  const $moonrise = document.createElement('p');
  $moonrise.className = 'forecast-text';
  $moonrise.textContent = 'Moonset: ' + location.forecast.forecastday[0].astro.moonrise;
  $astroRight.appendChild($moonrise);
  $astroRow.appendChild($astroRight);
  const $weeklyWeatherDiv = document.createElement('div');
  $weeklyWeatherDiv.className = 'weekly-weather-container';
  $additionalForecastRow.appendChild($weeklyWeatherDiv);
  const $dayOfWeek = document.createElement('ul');
  $dayOfWeek.className = 'day-of-week';
  $weeklyWeatherDiv.appendChild($dayOfWeek);
  const day = location.forecast.forecastday;
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  for (let y = 1; y < day.length; y++) {
    const time = day[y].date;
    const weekday = new Date(time);
    const date = weekday.getDay();
    const currentday = weekdays[date];
    const dayIcon = day[y].day.condition.icon;
    const dayIconAlt = day[y].day.condition.text;
    const dayTempMax = Math.round(day[y].day.maxtemp_f);
    const dayTempMin = Math.round(day[y].day.mintemp_f);
    const $dayli = document.createElement('li');
    $dayli.className = 'day-weather';
    const $day = document.createElement('p');
    const $dayIcon = document.createElement('img');
    const $dayTempMin = document.createElement('p');
    const $dayTempMax = document.createElement('p');
    $day.className = 'date';
    $day.textContent = currentday;
    $dayli.appendChild($day);
    $dayIcon.setAttribute('src', dayIcon);
    $dayIcon.setAttribute('alt', dayIconAlt);
    $dayIcon.className = 'day-icon';
    $dayli.appendChild($dayIcon);
    $dayli.appendChild($dayTempMin);
    $dayTempMin.className = 'day-temp-min';
    $dayTempMin.textContent = dayTempMin + '°';
    $dayli.appendChild($dayTempMax);
    $dayTempMax.textContent = dayTempMax + '°';
    $dayTempMax.className = 'day-temp-max';
    $dayOfWeek.appendChild($dayli);
  }
  const $weatherAlertDiv = document.createElement('div');
  if (location.alerts.alert.length === 0) {
    $weatherAlertDiv.className = 'hidden';
  } else {
    $weatherAlertDiv.className = 'weather-alert-div';
  }
  $additionalForecast.appendChild($weatherAlertDiv);
  const $weatherAlert = document.createElement('div');
  $weatherAlert.className = 'weather-alert';
  $weatherAlertDiv.appendChild($weatherAlert);
  const $alert = document.createElement('p');
  $alert.className = 'alert';
  $alert.textContent = 'ALERT';
  $weatherAlert.appendChild($alert);
  for (let l = 0; l < location.alerts.alert.length; l++) {
    if (location.alerts.alert[l].msgtype === 'Alert') {
      const $alerts = document.createElement('div');
      $alerts.className = 'alerts';
      $weatherAlert.appendChild($alerts);
      const $severity = document.createElement('p');
      $weatherAlert.appendChild($severity);
      $severity.className = location.alerts.alert[l].severity.toLowerCase();
      $severity.textContent = 'Severity: ' + location.alerts.alert[l].severity;
      const $alertHeadline = document.createElement('p');
      $alertHeadline.className = 'alert-headline';
      $alertHeadline.textContent = 'Headline: ' + location.alerts.alert[l].headline;
      $weatherAlert.appendChild($alertHeadline);
      const $alertInstructions = document.createElement('p');
      $alertInstructions.className = 'alert-text';
      $alertInstructions.textContent = 'Intructions: ' + location.alerts.alert[l].instruction;
      $weatherAlert.appendChild($alertInstructions);
    }
  }
  return $userEntries;
};

const appendForecast = async () => {
  for (let i = 0; i < data.entries.length; i++) {
    const forecastResult = await grabForecast(data.entries[i].location);
    $weather.appendChild(renderWeather(forecastResult, data.entries[i].entryId));
  }
  viewSwap(data.view);
};

const viewSwap = view => {
  if (view === 'entries') {
    data.view = 'entries';
    $form.className = 'hidden';
    $header.className = 'hidden';
    $newEntry.className = 'entries';
    document.querySelectorAll('.delete').forEach(e => e.classList.add('hidden'));
  } else if (view === 'entry-form') {
    data.view = 'entry-form';
    $form.className = 'view';
    $header.className = 'header-column';
    $newEntry.className = 'hidden';
    $cancel.className = 'hidden';
  } else if (view === 'new-entry') {
    data.view = 'new-entry';
    $header.className = 'hidden';
    $form.className = 'entry-form';
    $cancel.className = 'view';
    $newEntry.className = 'hidden';
    document.querySelectorAll('.delete').forEach(e => e.classList.remove('hidden'));
  }
};

$form.addEventListener('submit', submitForm);
document.addEventListener('DOMContentLoaded', appendForecast);

window.addEventListener('resize', e => {
  const $currentWeather = document.querySelectorAll('.current-weather');
  const $additionalForecast = document.querySelectorAll('.additional-forecast');
  for (let i = 0; i < $currentWeather.length; i++) {
    if (window.matchMedia('only screen and (min-width: 768px)').matches) {
      $additionalForecast[i].className = 'additional-forecast';
      $currentWeather[i].className = 'current-weather';
    } else {
      $additionalForecast[i].className = 'additional-forecast hidden';
      $currentWeather[i].className = 'current-weather';
    }
  }
});

$weather.addEventListener('click', e => {
  const $currentWeather = document.querySelectorAll('.current-weather');
  if (window.matchMedia('only screen and (min-width: 768px)').matches) {
    return;
  }
  if (e.target && e.target.matches('.current-weather')) {
    const target = e.target.nextSibling;
    target.className = 'additional-forecast';
    for (let i = 0; i < $currentWeather.length; i++) {
      $currentWeather[i].className = 'current-weather hidden';
    }
    $newEntry.className = 'hidden';
    $form.className = 'hidden';
    document.querySelectorAll('.delete').forEach(e => e.classList.add('hidden'));
  }
});

$weather.addEventListener('click', e => {
  const target = e.target.closest('.mobile-back');
  const $currentWeather = document.querySelectorAll('.current-weather');
  const $additionalForecast = document.querySelectorAll('.additional-forecast');
  if (target) {
    for (let i = 0; i < $currentWeather.length; i++) {
      $currentWeather[i].className = 'current-weather';
      $additionalForecast[i].className = 'additional-forecast hidden';
    }

    $newEntry.className = 'view';
  }
});

$newEntry.addEventListener('click', e => {
  viewSwap('new-entry');
});
$cancel.addEventListener('click', e => {
  viewSwap('entries');
});

$weather.addEventListener('click', e => {
  const $li = document.querySelectorAll('.user-entry');
  const $entryId = Number(e.target.closest('li').getAttribute('data-entry-id'));
  if (e.target && e.target.matches('.delete')) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === $entryId) {
        data.entries.splice(i, 1);
        $weather.removeChild($li[i]);
        viewSwap('entries');
      }
    }
    if (data.entries.length === 0) viewSwap('entry-form');
  }
});
