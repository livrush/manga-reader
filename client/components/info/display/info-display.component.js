mangaReader.component('infoDisplay', {
  controllerAs: 'display',
  controller: function(mangaFactory) {
    const display = this;
  },
  bindings: {
    manga: '<',
  },
  templateUrl: './components/info/display/info-display.template.html'
});