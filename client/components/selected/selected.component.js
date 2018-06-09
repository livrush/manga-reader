mangaReader.component('selected', {
  controllerAs: 'selected',
  controller: function(mangaFactory) {
    const selected = this;
    selected.state = mangaFactory.getSelected();
  },
  templateUrl: './components/selected/selected.template.html'
});