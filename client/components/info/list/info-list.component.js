mangaReader.component('infoList', {
  bindings: {
    manga: '<',
    numbers: '<',
    type: '<',
  },
  controllerAs: 'list',
  controller: function(mediaFactory) {
    const list = this;
    list.click = function(file) {
      mediaFactory.setSelectedFile({
        currentPage: 0,
        currentFile: path.join(__dirname, './.manga', list.manga, file),
      });
    }
  },
  templateUrl: './components/info/list/info-list.template.html'
});