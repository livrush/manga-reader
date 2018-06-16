mangaReader.component('infoDisplay', {
  controllerAs: 'display',
  controller: function(mediaFactory) {
    const display = this;
  },
  bindings: {
    manga: '<',
  },
  templateUrl: './components/info/display/info-display.template.html'
});