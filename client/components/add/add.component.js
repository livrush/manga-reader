mangaReader.component('add', {
  controllerAs: 'add',
  controller: function($scope) {
    const add = this;
    add.path = os.homedir();
    add.directories = [];
    add.files = [];

    add.popDirectory = function() {
      add.path = path.dirname(add.path);
      this.searchDirectory();
    };

    add.appendDirectory = function(file) {
      add.path = path.join(add.path, file);
      this.searchDirectory();
    };

    add.searchDirectory = function() {
      add.files = [];
      add.directories = [];
      fs.readdir(add.path, function(err, files) {
        if (err) return console.error(err);
        files
          .filter(file => fs.lstatSync(path.join(add.path, file)).isDirectory())
          .filter(file => file[0] !== '.')
          .forEach(file => add.directories.push(file));
        files
          .filter(file => !fs.lstatSync(path.join(add.path, file)).isDirectory())
          .filter(file => file[0] !== '.')
          .forEach(file => add.files.push(file));
        $scope.$apply();
      });
    };

    add.searchDirectory();
  },
  templateUrl: './components/add/add.template.html'
});