mangaReader.component('libraryManga', {
  controllerAs: 'manga',
  controller: function(mediaFactory) {
    const manga = this;
    manga.$onInit = function() {
      manga.imageUrl = mediaFactory.getThumbnail(manga.data.title);
    }
  },
  bindings: {
    data: '<',
    select: '<',
  },
  templateUrl: './components/library/manga/library-manga.template.html'
});