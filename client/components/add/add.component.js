mangaReader.component('add', {
  controllerAs: 'add',
  controller: function($scope, mangaFactory) {
    const add = this;
    add.path = os.homedir();
    add.selected = {};
    add.folders = [];
    add.files = [];

    // add.selectFile = function(file) {
    //   const filePath = path.join(add.path, file);
    //   fs.readFile(filePath, function(err, data) {
    //     if (err) throw err;
    //     JSZip.loadAsync(data).then(function ({ files }) {
    //       const onlyFiles = lodash.filter(files, file => !file.dir);
    //       const file = onlyFiles[10];
    //       file.async('blob').then(function(res) {
    //         var urlCreator = window.URL || window.webkitURL;
    //         var imageUrl = urlCreator.createObjectURL( res );
    //         var img = document.querySelector( "#photo" );
    //         img.src = imageUrl;
    //       });
    //     });
    //   });
    // };

    add.selectFile = function(file) {
      const filePath = path.join(add.path, file);
      mangaFactory.getCollection(filePath)
        .then(function(res) {
          console.log(res);
        })
    };

    add.popFolder = function() {
      add.path = path.dirname(add.path);
      add.searchFolder();
    };

    add.appendFolder = function(file) {
      console.warn(file);
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