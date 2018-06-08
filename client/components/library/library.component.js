mangaReader.component('library', {
  controllerAs: 'library',
  controller: function(mangaFactory) {
    const library = this;
    library.manga = mangaFactory.list;
    console.warn(library.manga);
  },
  templateUrl: './components/library/library.template.html'
});