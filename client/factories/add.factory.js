mangaReader.factory('addFactory', function () {
  const rootPath = os.homedir();
  const libraryPath = path.join(__dirname, '/.manga');
  const libraryIndexPath = path.join(libraryPath, 'index.json');
  const acceptedFileTypes = {
    '.pdf': true,
    '.zip': true,
    '.cbz': true,
    '.rar': true,
  }

  function searchFolder(currentDirectory) {
    return new Promise(function(res, rej) {
      fs.readdir(currentDirectory, function(err, result) {
        if (err) return rej(err);
        const filteredResult = result
          .filter(file => file[0] !== '.');

        const folders = filteredResult
          .filter(file => fs.lstatSync(path.join(currentDirectory, file)).isDirectory())

        const files = filteredResult
          .filter(file => !fs.lstatSync(path.join(currentDirectory, file)).isDirectory())
          .filter(file => acceptedFileTypes[path.extname(file)]);

        res([ folders, files ]);
      });
    });
  }

  return {
    searchFolder
  };
})