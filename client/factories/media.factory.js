mangaReader.factory('mediaFactory', function () {
  const libraryIndexPath = path.join(__dirname, '/.manga/index.json');

  let selectedFile = null;
  const getSelectedFile = () => selectedFile;
  const setSelectedFile = (newFile) => selectedFile = newFile;

  let selectedManga = null;
  const getSelectedManga = () => selectedManga;
  const setSelectedManga = (newSelectedManga) => selectedManga = newSelectedManga;

  const getIndex = function () {
    return new Promise(function (res, rej) {
      fs.readFile(libraryIndexPath, 'utf8', function (err, indexContents) {
        res(JSON.parse(indexContents));
      });
    });
  }

  const getCollection = function (filePath) {
    const fileType = path.extname(filePath);
    console.warn('FILE TYPE IS ', fileType);
    switch(fileType) {
      case '.zip':
      case '.cbz':
        return handleZipFile(filePath);
        break;
      case '.pdf':
        return handlePdfFile(filePath);
    }
  };

  const handleZipFile = function (filePath) {
    return new Promise(function (res, rej) {
      fs.readFile(filePath, function (err, data) {
        if (err) rej(err);
        const zip = new JSZip();
        zip.loadAsync(data).then(function ({
          files
        }) {
          let onlyFiles = lodash
            .chain(files)
            .filter(file => !file.dir)
            .filter(file => {
              switch (path.extname(file.name)) {
                case '.png':
                case '.jpg':
                case '.jpeg':
                case '.gif':
                  return true;
              }
            })
            .filter(file => !file.name.includes('__MACOSX'))
            .value();
            // .filter(file => !console.log(file.name));
          onlyFiles = onlyFiles
            .sort(cmpStringsWithNumbers)
            // .filter((file) => !console.log(file.name))
            .map(file => {
              return file.async('blob').then(function (blob) {
                var urlCreator = window.URL || window.webkitURL;
                return urlCreator.createObjectURL(blob);
              });
            })
          const pAll = Promise.all(onlyFiles);
          res(pAll);
        });
      });
    });
  }

  const handlePdfFile = function (filePath) {
    return new Promise(function (res, rej) {
      pdfjsLib.getDocument(filePath).then(function (pdf) {
        const pages = Array.from(Array(pdf.numPages)).map(function(e, i) {
          const pageNum = i + 1;
          return pdf.getPage(pageNum)
        });
        res(Promise.all(pages));
      });
    });
  }

  const getSomeFromPath = function (filePath, isDirectory) {
    return new Promise(function (res, rej) {
      fs.readdir(filePath, function (err, files) {
        if (err) rej(err);
        const filteredFiles = files
          .filter(file => file[0] !== '.')
          .filter(file => fs.lstatSync(path.join(filePath, file)).isDirectory() === isDirectory)
        res(filteredFiles);
      });
    });
  }

  const getFoldersFromPath = function (filePath) {
    return getSomeFromPath(filePath, true);
  }

  const getFilesFromPath = function (filePath) {
    return getSomeFromPath(filePath, false);
  }

  var reParts = /\d+|\D+/g;
  var reDigit = /\d/;
  const cmpStringsWithNumbers = function (a, b) {
    // Get rid of casing issues.
    a = a.name.toUpperCase();
    b = b.name.toUpperCase();

    // Separates the strings into substrings that have only digits and those
    // that have no digits.
    var aParts = a.match(reParts);
    var bParts = b.match(reParts);

    // Used to determine if aPart and bPart are digits.
    var isDigitPart;

    // If `a` and `b` are strings with substring parts that match...
    if (aParts && bParts &&
      (isDigitPart = reDigit.test(aParts[0])) == reDigit.test(bParts[0])) {
      // Loop through each substring part to compare the overall strings.
      var len = Math.min(aParts.length, bParts.length);
      for (var i = 0; i < len; i++) {
        var aPart = aParts[i];
        var bPart = bParts[i];

        // If comparing digits, convert them to numbers (assuming base 10).
        if (isDigitPart) {
          aPart = parseInt(aPart, 10);
          bPart = parseInt(bPart, 10);
        }

        // If the substrings aren't equal, return either -1 or 1.
        if (aPart != bPart) {
          return aPart < bPart ? -1 : 1;
        }

        // Toggle the value of isDigitPart since the parts will alternate.
        isDigitPart = !isDigitPart;
      }
    }

    // Use normal comparison.
    return (a >= b) - (a <= b);
  };

  return {
    getIndex,
    getCollection,
    getSelectedManga,
    setSelectedManga,
    getSelectedFile,
    setSelectedFile,
    getFilesFromPath,
    getFoldersFromPath,
  };
})