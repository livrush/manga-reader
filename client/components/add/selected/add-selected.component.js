mangaReader.component('addSelected', {
  bindings: {
    media: '<',
    confirm: '<',
    confirmed: '<',
  },
  controllerAs: 'selected',
  controller: function(mediaFactory) {
    const selected = this;
    selected.title = changeCase.titleCase;
  },
  templateUrl: './components/add/selected/add-selected.template.html'
});