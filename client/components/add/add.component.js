mangaReader.component('add', {
  controllerAs: 'add',
  controller: function($scope) {
    const add = this;
    add.path = os.homedir();
    add.selected = {};
    add.folders = [];
    add.files = [];

    add.selectFile = function(file) {
      console.warn(file);
    };

    add.popFolder = function() {
      add.path = path.dirname(add.path);
      add.searchFolder();
    };

    add.appendFolder = function(file) {
      add.path = path.join(add.path, file);
      add.searchFolder();
    };

    add.searchFolder = function() {
      add.files = [];
      add.folders = [];
      fs.readdir(add.path, function(err, files) {
        if (err) return console.error(err);
        files
          .filter(file => fs.lstatSync(path.join(add.path, file)).isDirectory())
          .filter(file => file[0] !== '.')
          .forEach(file => add.folders.push(file));
        files
          .filter(file => !fs.lstatSync(path.join(add.path, file)).isDirectory())
          .filter(file => file[0] !== '.')
          .forEach(file => add.files.push(file));
        $scope.$apply();
      });
    };

    add.searchFolder();
  },
  templateUrl: './components/add/add.template.html'
});