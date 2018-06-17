mangaReader.component('settings', {
  controllerAs: 'settings',
  controller: function($scope, mediaFactory, indexFactory) {
    const settings = this;
    settings.sanitize = indexFactory.sanitizeIndex
  },
  templateUrl: './components/settings/settings.template.html'
});