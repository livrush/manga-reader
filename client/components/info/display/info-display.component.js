mangaReader.component('infoDisplay', {
  controllerAs: 'display',
  controller: function(mediaFactory) {
    const display = this;

    display.$onInit = function() {
      display.imageUrl = mediaFactory.getThumbnail(display.manga);
    }
  },
  bindings: {
    manga: '<',
  },
  templateUrl: './components/info/display/info-display.template.html'
});