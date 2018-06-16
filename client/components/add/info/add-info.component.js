mangaReader.component('addInfo', {
  bindings: {
    data: '<',
    select: '<',
    confirm: '<',
  },
  controllerAs: 'info',
  controller: function(mediaFactory) {
    const info = this;
    info.$onInit = function() {
      console.log(info.data);
      info.click = info.select;
      // info.click = info.select.bind(null, info.data.type);
    };
  },
  templateUrl: './components/add/info/add-info.template.html'
});