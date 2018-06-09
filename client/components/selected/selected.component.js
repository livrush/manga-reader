mangaReader.component('selected', {
  bindings: {
    manga: '<',
  },
  controllerAs: 'selected',
  controller: function(mangaFactory) {
    const selected = this;
  },
  templateUrl: './components/selected/selected.template.html'
});