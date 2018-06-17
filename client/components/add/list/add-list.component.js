mangaReader.component('addList', {
  bindings: {
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
    list.titleCase = changeCase.titleCase;
  },
  templateUrl: './components/add/list/add-list.template.html'
});