mangaReader.component('manga', {
  controllerAs: 'manga',
  controller: function(mangaFactory) {
    const manga = this;
  },
  bindings: {
    data: '<',
    select: '<',
  },
  templateUrl: './components/manga/manga.template.html'
});