mangaReader.component('manga', {
  controllerAs: 'manga',
  controller: function(mangaFactory) {
    const manga = this;
    console.warn(this);
  },
  bindings: {
    data: '<',
  },
  templateUrl: './components/manga/manga.template.html'
});