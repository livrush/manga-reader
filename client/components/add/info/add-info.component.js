mangaReader.component('addInfo', {
  bindings: {
    data: '<',
    images: '<',
    select: '<',
    confirm: '<',
    selected: '<',
  },
  controllerAs: 'info',
  controller: function(addFactory, indexFactory, libraryFactory) {
    const info = this;
    info.$onInit = function() {
      console.log(info);
      info.click = info.select;
      info.types = addFactory.possibleCategories

      info.name = '';
      info.number = 1;

      info.confirmAndAdd = function(selectedDetails) {
        libraryFactory.add(selectedDetails)
        .then(function() {
            const seriesName = changeCase.paramCase(selectedDetails.series);
            indexFactory.updateIndex(seriesName, selectedDetails);
          });
      }
    };
  },
  templateUrl: './components/add/info/add-info.template.html'
});