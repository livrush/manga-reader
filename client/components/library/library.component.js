mangaReader.component('library', {
  controllerAs: 'library',
  controller: function(mangaFactory) {
    const library = this;
    library.manga = mangaFactory.list;
    library.selected = {};
    library.select = (selected) => {
      console.log(selected);
      library.selected = selected;
    }
  },
  templateUrl: './components/library/library.template.html'
});