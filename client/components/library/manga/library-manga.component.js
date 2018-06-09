mangaReader.component('libraryManga', {
  controllerAs: 'manga',
  controller: function(mangaFactory) {
    const manga = this;
  },
  bindings: {
    data: '<',
    select: '<',
  },
  templateUrl: './components/library/manga/library-manga.template.html'
});