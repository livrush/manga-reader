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
    console.log(this);
  },
  templateUrl: './components/add/list/add-list.template.html'
});