mangaReader.component('selected', {
  bindings: {
    manga: '<',
  },
  controllerAs: 'selected',
  controller: function(mangaFactory) {
    const selected = this;
    console.log(selected.manga);
  },
  templateUrl: './components/selected/selected.template.html'
});