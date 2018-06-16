mangaReader.component('add', {
  controllerAs: 'add',
  controller: function($scope, mediaFactory, addFactory) {
    const add = this;
    add.path = os.homedir();
    add.confirmed = false;
    add.selected = null;
    add.folders = [];
    add.files = [];


    add.selectFile = function(file, index) {
      const filePath = path.join(add.path, file);
      add.index = index;
      const fileType = path.extname(file);
      add.selected = {
        path: file,
        type: fileType === '.pdf' ? 'pdf' : 'archive',
      };
    };

    add.confirmFile = function(file) {
      const filePath = path.join(add.path, file);
      add.confirmed = true;
      const fileType = path.extname(file);
      mediaFactory.getCollection(filePath)
        .then(function(res) {
          console.log(res);
        })
    };

    add.popFolder = function() {
      add.path = path.dirname(add.path);
      add.selected = null;
      add.index = null;
      add.searchFolder();
    };

    add.appendFolder = function(file) {
      add.selected = null;
      add.index = null;
      add.path = path.join(add.path, file);
      add.searchFolder();
    };

    add.searchFolder = function() {
      addFactory.searchFolder(add.path)
        .then(function([ folders, files ]) {
          add.folders = folders;
          add.files = files;
          $scope.$apply();
        });
    };

    add.$onInit = function() {
      add.searchFolder();
    };
  },
  templateUrl: './components/add/add.template.html'
});