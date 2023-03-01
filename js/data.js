/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('local-storage');

if (previousDataJSON != null) {
  data = JSON.parse(previousDataJSON);
}

function storeData(e) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('local-storage', dataJSON);
}

window.addEventListener('beforeunload', storeData);
