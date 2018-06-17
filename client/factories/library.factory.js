mangaReader.factory('libraryFactory', function () {
  const libraryPath = path.join(__dirname, '/.manga');
  const libraryIndexPath = path.join(libraryPath, 'index.json');

  function add(selectedInformation) {
    console.log(selectedInformation);

    return sanitizeDestinationPath(selectedInformation)
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
      const sanitizedSeriesName = changeCase.paramCase(series)
      const extension = path.extname(fileName);
      const newFileName = `${category}-${sanitizedNumber}${extension}`
      const destinationPath = path.join(libraryPath, sanitizedSeriesName, newFileName);
      res([ filePath, destinationPath ]);
    });
  }

  function checkDirectory([ filePath, destinationPath ]) {
    console.warn('checkDirectory');
    return new Promise(function(res, rej) {
      fs.exists(path.dirname(destinationPath), (exists) => {
        exists ? res([ filePath, destinationPath ]) : rej([ filePath, destinationPath ]);
      });
    });
  }

  function makeDirectory([ filePath, destinationPath ]) {
    console.warn('makeDirectory');
    return new Promise(function(res, rej) {
      fs.mkdir(path.dirname(destinationPath), (err, success) => {
        err ? rej(err) : res([ filePath, destinationPath ]);
      });
    });
  }

  function copyFile([ filePath, destinationPath ]) {
    console.warn('copyFile');
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