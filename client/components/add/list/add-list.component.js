mangaReader.component('addList', {
  bindings: {
    case: '@',
    type: '<',
    list: '<',
    click: '<',
    index: '<',
    title: '<',
    classes: '@',
  },
  controllerAs: 'list',
  controller: function() {
    const list = this;
    list.$onInit = function() {
      list.toCase = list.case ? changeCase[list.case + 'Case'] : lodash.identity;
    }
  },
  templateUrl: './components/add/list/add-list.template.html'
});