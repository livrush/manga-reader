mangaReader.component('addInfo', {
  bindings: {
    media: '<',
    confirm: '<',
  },
  controllerAs: 'info',
  controller: function(mediaFactory) {
    const info = this;
  },
  templateUrl: './components/add/info/add-info.template.html'
});