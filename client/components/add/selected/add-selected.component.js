mangaReader.component('addSelected', {
  bindings: {
    manga: '<',
  },
  controllerAs: 'selected',
  controller: function(mangaFactory) {
    const selected = this;
  },
  templateUrl: './components/add/selected/add-selected.template.html'
});