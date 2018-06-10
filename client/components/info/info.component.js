mangaReader.component('info', {
  controllerAs: 'info',
  controller: function(mangaFactory, $scope) {
    const info = this;

    info.selected = {};

    info.select = (selected) => {
      info.selected = selected;
    }

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
            console.log(prefix, numberWithSuffix);
            const [ number ] = numberWithSuffix.split('.');
            if (container[prefix]) container[prefix].push(number);
            return container;
          }, fileContainer);
        })
        .then(console.log)
    };

    info.$onDestroy = function() {
      mangaFactory.setFilePath('/Users/liv/Itoshi-no-Nekokke-ch31.zip');
    }
  },
  templateUrl: './components/info/info.template.html'
});