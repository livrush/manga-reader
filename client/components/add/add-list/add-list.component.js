mangaReader.component('addList', {
  bindings: {
    type: '@',
    list: '<',
    click: '<',
  },
  controllerAs: 'addList',
  controller: function($scope) {},
  templateUrl: './components/add/add-list/add-list.template.html'
});