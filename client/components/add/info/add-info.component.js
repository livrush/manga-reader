mangaReader.component('addInfo', {
  bindings: {
    data: '<',
    images: '<',
    select: '<',
    confirm: '<',
    selected: '<',
  },
  controllerAs: 'info',
  controller: function(addFactory, libraryFactory) {
    const info = this;
    info.$onInit = function() {
      console.log(info);
      info.click = info.select;
      info.types = addFactory.possibleCategories
      // info.click = info.select.bind(null, info.data.type);
      info.number = 1;
      info.confirmAndAdd = function(selectedDetails) {
        libraryFactory.add(selectedDetails);
      }
    };
  },
  templateUrl: './components/add/info/add-info.template.html'
});