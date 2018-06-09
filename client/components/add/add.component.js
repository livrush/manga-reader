mangaReader.component('add', {
  controllerAs: 'add',
  controller: function() {
    const add = this;
    add.path = os.homedir();
    add.directories = [];
    add.files = [];
    add.searchDirectory = function() {
      add.files = [];
      fs.readdir(add.directory, function(err, data) {
        if (err) return console.error(err);
        console.log(data);

      });
    }
  },
  templateUrl: './components/add/add.template.html'
});