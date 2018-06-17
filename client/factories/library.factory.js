mangaReader.factory('libraryFactory', function () {
  const libraryPath = path.join(__dirname, '/.manga');
  const libraryIndexPath = path.join(libraryPath, 'index.json');

  function add(selectedInformation) {
    console.log(selectedInformation);

    sanitizeDestinationPath(selectedInformation)
      .then(checkDirectory)
      .catch(makeDirectory)
      .then(copyFile)
      // .then(deleteFile)
      .then(function() {
        console.log('File copied splendidly!');
      });

  }

  function sanitizeDestinationPath({
    filePath,
    fileName,
    series,
    category,
    number,
    author,
  }) {
    return new Promise(function(res, rej) {
      const sanitizedNumber = number.toString().padStart(3, '0');
      const extension = path.extname(fileName);
      const newFileName = `${category}-${sanitizedNumber}${extension}`
      const destinationPath = path.join(libraryPath, series.toLowerCase(), newFileName);
      res([ filePath, destinationPath ]);
    });
  }

  function checkDirectory([ filePath, destinationPath ]) {
    return new Promise(function(res, rej) {
      fs.exists(path.dirname(destinationPath), (exists) => {
        exists ? res([ filePath, destinationPath ]) : rej([ filePath, destinationPath ]);
      });
    });
  }

  function makeDirectory([ filePath, destinationPath ]) {
    return new Promise(function(res, rej) {
      fs.mkdir(path.dirname(destinationPath), (err, success) => {
        err ? rej(err) : rej([ filePath, destinationPath ]);
      });
    });
  }

  function copyFile([ filePath, destinationPath ]) {
    return new Promise(function(res, rej) {
      fs.copyFile(filePath, destinationPath, function(error, response) {
        if (error) rej(error);
        res(response);
      })
    });
  }

  return {
    add,
  };
})