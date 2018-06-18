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
      return mediaFactory.getThumbnail(title);
    }

    selected.$onInit = function() {
      selected.imageUrl = mediaFactory.getThumbnail(selected.manga.title);
    }
  },
  templateUrl: './components/library/selected/library-selected.template.html'
});