mangaReader.component('viewerNav', {
  bindings: {
    currentPage: '<',
    totalPages: '<',
  },
  controllerAs: 'nav',
  controller: function ($scope, $location, mangaFactory, indexFactory) {
    const nav = this;
    console.log(nav);
  },
  templateUrl: './components/viewer/nav/viewer-nav.template.html'
});