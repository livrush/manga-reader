var kitsu = require("kitsu")

const api = new kitsu();


mangaReader.component('library', {
  controllerAs: 'library',
  controller: function(mangaFactory, $scope) {
    const library = this;

    const libraryIndexPath = path.join(__dirname, '/.manga/index.json');
    const getIndex = function() {
      fs.readFile(libraryIndexPath, 'utf8', function(err, indexContents) {
        const list = JSON.parse(indexContents);
        library.manga = list.concat(list).concat(list).concat(list);
        $scope.$apply();
      });
    }

    library.selected = {};
    library.select = (selected) => {
      console.log(selected);
      library.selected = selected;
    }

    getIndex();
  },
  templateUrl: './components/library/library.template.html'
});