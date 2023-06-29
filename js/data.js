/* exported data */
let data = {
  view: 'entry-form',
  entries: [],
  nextEntryId: 1
};

const previousDataJSON = localStorage.getItem('weather-local-storage');

if (previousDataJSON != null) data = JSON.parse(previousDataJSON);

const storeData = e => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('weather-local-storage', dataJSON);
};

window.addEventListener('pagehide', storeData);
