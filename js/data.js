/* exported data */
var data = {
  view: 'entry-form',
  entries: [],
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('weather-local-storage');

if (previousDataJSON != null) {
  data = JSON.parse(previousDataJSON);
}

function storeData(e) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('weather-local-storage', dataJSON);
}

window.addEventListener('beforeunload', storeData);
