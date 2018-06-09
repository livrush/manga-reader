mangaReader.component('manga', {
  controllerAs: 'manga',
  controller: function(mangaFactory) {
    const manga = this;
    manga.test = () => console.log('Hello, testing!');
    manga.onClick = mangaFactory.selectManga;
  },
  bindings: {
    data: '<',
  },
  templateUrl: './components/manga/manga.template.html'
});