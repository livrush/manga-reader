mangaReader.component('info', {
  controllerAs: 'info',
  controller: function(mangaFactory, $scope) {
    const info = this;

    info.selected = {};

    info.select = (selected) => {
      info.selected = selected;
    }

    info.$onInit = function() {
      mangaFactory.getIndex()
        .then(function(index) {
          info.manga = index.concat(index).concat(index).concat(index);
          info.selected = index[0];
          $scope.$apply();
        });
    };

    info.$onDestroy = function() {
      mangaFactory.setFilePath('/Users/liv/Itoshi-no-Nekokke-ch31.zip');
    }
  },
  templateUrl: './components/info/info.template.html'
});