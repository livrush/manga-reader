mangaReader.component('library', {
  controllerAs: 'library',
  controller: function(mangaFactory, $scope) {
    const library = this;

    const getIndex = function() {
      fs.readFile(libraryIndexPath, 'utf8', function(err, indexContents) {
        const list = JSON.parse(indexContents);
        library.manga = list.concat(list).concat(list).concat(list);
        library.selected = list[0];
        $scope.$apply();
      });
    }

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
  },
  templateUrl: './components/library/library.template.html'
});