mangaReader.factory('mangaFactory', function () {
  const getIndex = function () {
    return new Promise(function (res, rej) {
      fs.readFile(libraryIndexPath, 'utf8', function (err, indexContents) {
        res(JSON.parse(indexContents));
      });
    });
  };

  const updateIndex = function (mediaName, updatedInfo) {
    getIndex().then(index => {

    });
  }

  return {
    getIndex,
  };
})