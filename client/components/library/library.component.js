mangaReader.component('library', {
  controllerAs: 'library',
  controller: function(mangaFactory, $scope) {
    const library = this;

    const libraryIndexPath = path.join(__dirname, '/.manga/index.json');
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
      getIndex();
    };
  },
  templateUrl: './components/library/library.template.html'
});