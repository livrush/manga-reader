mangaReader.component('librarySelected', {
  bindings: {
    manga: '<',
  },
  controllerAs: 'selected',
  controller: function(mangaFactory) {
    const selected = this;
    selected.displayTitle = function(title) {
      return title.replace(/-/g, ' ');
    }
  },
  templateUrl: './components/library/selected/library-selected.template.html'
});