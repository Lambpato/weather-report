/* exported data */
const data = {
  view: 'entry-form',
  entries: [],
  nextEntryId: 1
};

const previousDataJSON = localStorage.getItem('weather-local-storage');

if (previousDataJSON != null) {
  data.view = JSON.parse(previousDataJSON).view;
  data.entries = JSON.parse(previousDataJSON).entries;
  data.nextEntryId = JSON.parse(previousDataJSON).nextEntryId;
}

const storeData = e => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('weather-local-storage', dataJSON);
};

window.addEventListener('pagehide', storeData);
