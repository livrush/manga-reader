mangaReader.component('info', {
  controllerAs: 'info',
  controller: function(mangaFactory, $scope) {
    const info = this;

    info.$onInit = function() {
      const selectedManga = info.selectedManga = mangaFactory.getSelectedManga();
      const fileContainer = {
        chap: [],
        vol: [],
        one: [],
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
    };
  },
  templateUrl: './components/info/info.template.html'
});