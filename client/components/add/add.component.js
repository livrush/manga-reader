mangaReader.component('add', {
  controllerAs: 'add',
  controller: function($scope) {
    const add = this;
    add.path = os.homedir();
    add.directories = [];
    add.files = [];
    add.searchDirectory = function() {
      add.files = [];
      fs.readdir(add.path, function(err, files) {
        if (err) return console.error(err);
        const x = files
          .filter(file => fs.lstatSync(path.join(add.path, file)).isDirectory())
          .filter(file => file[0] !== '.')
          .forEach(file => add.files.push(file));
        $scope.$apply();
      });
    };
    add.appendDirectory = function(file) {
      add.path = path.join(add.path, file);
    };
  },
  templateUrl: './components/add/add.template.html'
});