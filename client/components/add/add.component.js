mangaReader.component('add', {
  controllerAs: 'add',
  controller: function($scope, mediaFactory, addFactory, indexFactory) {
    const add = this;
    add.path = os.homedir();
    add.confirmed = false;
    add.selected = null;
    add.folders = [];
    add.files = [];
    add.index = 0;

    add.possibleStates = [
      'series',
      'category',
      'number',
      'author',
      // 'genres', // TODO
    ];


    // add.info = Info();


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
      indexFactory.getIndex()
        .then(function(res) {
          add.info = {
            list: res.map(item => item.title).concat('New Series'),
            type: 'book',
            title: 'series',
          };
          $scope.$apply();
        });
      mediaFactory.getCollection(filePath)
        .then(function(res) {
          add.images = res;
          $scope.$apply();
        });
    };

    add.selectInfo = function(value, index, type) {
      console.log(type, value);
      add.selected[type] = value;
    };

    add.$onInit = function() {
      add.searchFolder();
    };

    function Info(list, type, title) {
      return {
        list,
        type,
        title,
      };
    }

  },
  templateUrl: './components/add/add.template.html'
});