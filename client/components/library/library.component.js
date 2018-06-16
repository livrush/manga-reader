mangaReader.component('library', {
  controllerAs: 'library',
  controller: function(indexFactory, mediaFactory, $scope) {
    const library = this;

    library.selected = {};

    library.select = (selected) => {
      library.selected = selected;
    }

    library.$onInit = function() {
      indexFactory.getIndex()
        .then(function(index) {
          library.manga = index.concat(index).concat(index).concat(index);
          library.selected = index[0];
          $scope.$apply();
        });
    };

    library.$onDestroy = function() {
      mediaFactory.setSelectedManga(library.selected.title);
    }
  },
  templateUrl: './components/library/library.template.html'
});