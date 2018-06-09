mangaReader.component('librarySelected', {
  bindings: {
    manga: '<',
  },
  controllerAs: 'selected',
  controller: function(mangaFactory) {
    const selected = this;
  },
  templateUrl: './components/library/selected/library-selected.template.html'
});