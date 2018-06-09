mangaReader.component('addList', {
  bindings: {
    type: '@',
    list: '<',
    click: '<',
  },
  controllerAs: 'list',
  templateUrl: './components/add/list/add-list.template.html'
});