mangaReader.factory('mangaFactory', function () {
  const libraryIndexPath = path.join(__dirname, '/.manga/index.json');

  const getIndex = function() {
    return new Promise(function(res, rej) {
      fs.readFile(libraryIndexPath, 'utf8', function(err, indexContents) {
        res(JSON.parse(indexContents));
      });
    });
  }

  return {
    getIndex,
  };
})