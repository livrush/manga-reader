mangaReader.component('addInfo', {
  bindings: {
    data: '<',
    select: '<',
    confirm: '<',
  },
  controllerAs: 'info',
  controller: function(addFactory) {
    const info = this;
    info.$onInit = function() {
      console.log(info.data);
      info.click = info.select;
      info.types = addFactory.possibleCategories
      // info.click = info.select.bind(null, info.data.type);
    };
  },
  templateUrl: './components/add/info/add-info.template.html'
});