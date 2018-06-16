mangaReader.component('libraryManga', {
  controllerAs: 'manga',
  controller: function(mediaFactory) {
    const manga = this;
  },
  bindings: {
    data: '<',
    select: '<',
  },
  templateUrl: './components/library/manga/library-manga.template.html'
});