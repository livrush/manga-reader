mangaReader.component('info', {
  controllerAs: 'info',
  controller: function(mangaFactory, $scope, indexFactory) {
    const info = this;

    info.$onInit = function() {
      const selectedManga = info.selectedManga = mangaFactory.getSelectedManga();
      const fileContainer = {
        volume: [],
        chapter: [],
        oneshot: [],
      };
      mangaFactory.getFilesFromPath(path.join(__dirname, './.manga', selectedManga))
      .then(function(files) {
        return files.reduce(function(container, file) {
          const [ prefix, numberWithSuffix ] = file.split('-');
          const [ number ] = numberWithSuffix.split('.');
          // TODO: make text better for list items //
          if (container[prefix]) container[prefix].push(file);
          return container;
        }, fileContainer);
      })
      .then(function(container) {
        info.lists = fileContainer;
      })
      indexFactory.getSelectedIndex(selectedManga)
      .then(function(index) {
        console.log(index);
        info.selectedIndex = index;
        $scope.$apply();
      })
      .catch(console.error);
    };
  },
  templateUrl: './components/info/info.template.html'
});