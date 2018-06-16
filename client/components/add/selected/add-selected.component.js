mangaReader.component('addSelected', {
  bindings: {
    media: '<',
  },
  controllerAs: 'selected',
  controller: function(mediaFactory) {
    const selected = this;
  },
  templateUrl: './components/add/selected/add-selected.template.html'
});