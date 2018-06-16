mangaReader.component('addList', {
  bindings: {
    type: '<',
    list: '<',
    click: '<',
    index: '<',
    title: '<',
  },
  controllerAs: 'list',
  templateUrl: './components/add/list/add-list.template.html'
});