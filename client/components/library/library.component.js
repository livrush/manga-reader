mangaReader.component('library', {
  controllerAs: 'library',
  controller: function(mangaFactory, $scope) {
    const library = this;

    library.selected = {};

    library.select = (selected) => {
      library.selected = selected;
    }

    library.$onInit = function() {
      mangaFactory.getIndex()
        .then(function(index) {
          library.manga = index.concat(index).concat(index).concat(index);
          library.selected = index[0];
          $scope.$apply();
        });
    };

    library.$onDestroy = function() {
      mangaFactory.setFilePath('/Users/liv/Itoshi-no-Nekokke-ch31.zip');
    }
  },
  templateUrl: './components/library/library.template.html'
});