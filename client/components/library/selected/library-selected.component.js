mangaReader.component('librarySelected', {
  bindings: {
    manga: '<',
  },
  controllerAs: 'selected',
  controller: function(mediaFactory) {
    const selected = this;
    selected.displayTitle = function(title) {
      return title.replace(/-/g, ' ');
    }
    selected.cover = (title) => {
      return `./.manga/${title}/.thumb.jpg`
    }
  },
  templateUrl: './components/library/selected/library-selected.template.html'
});