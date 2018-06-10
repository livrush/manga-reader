mangaReader.component('infoList', {
  bindings: {
    manga: '<',
  },
  controllerAs: 'list',
  controller: function(mangaFactory) {
    const list = this;
    list.displayTitle = function(title) {
      return title.replace(/-/g, ' ');
    }
  },
  templateUrl: './components/info/list/info-list.template.html'
});