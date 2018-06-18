mangaReader.component('infoDisplay', {
  controllerAs: 'display',
  controller: function($scope, mediaFactory, indexFactory) {
    const display = this;
    display.data = {};

    display.$onInit = function() {
      display.imageUrl = mediaFactory.getThumbnail(display.manga);
      indexFactory.getIndexByTitle(display.manga)
        .then(function(data) {
          display.data = data;
          $scope.$apply();
        });
      console.log(display);
    };

    display.editing = false;

    display.editingStart = function() {
      display.editing = true;
      console.log('start', display.data);
    };

    display.editingStop = function() {
      display.editing = false;
      console.log('stop', display.data);
      indexFactory.updateIndexByTitle(display.manga, display.data);
    };
  },
  bindings: {
    manga: '<',
  },
  templateUrl: './components/info/display/info-display.template.html'
});