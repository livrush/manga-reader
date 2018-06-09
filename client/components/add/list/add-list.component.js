mangaReader.component('addList', {
  bindings: {
    type: '@',
    list: '<',
    click: '<',
  },
  controllerAs: 'list',
  templateUrl: './components/add/add-list/add-list.template.html'
});